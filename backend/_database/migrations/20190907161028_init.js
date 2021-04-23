const fs = require('fs')
const path = require('path')
const util = require('util')
const readFileAsync = util.promisify(fs.readFile)

const { createSequenceFactory, dropTableCascadeIfExistsFactory } = require('../utils')

const TBL_USERS = 'vdt_users'
const TBL_WALLET_TYPES = 'vdt_wallet_types'
const TBL_WALLETS = 'vdt_wallets'
const TBL_TRANSACTION_GROUPS = 'vdt_transaction_groups'
const TBL_TRANSACTION_TYPES = 'vdt_transaction_types'
const TBL_TRANSACTIONS = 'vdt_transactions'

exports.TBL_USERS = TBL_USERS
exports.TBL_WALLET_TYPES = TBL_WALLET_TYPES
exports.TBL_WALLETS = TBL_WALLETS
exports.TBL_TRANSACTION_GROUPS = TBL_TRANSACTION_GROUPS
exports.TBL_TRANSACTION_TYPES = TBL_TRANSACTION_TYPES
exports.TBL_TRANSACTIONS = TBL_TRANSACTIONS

exports.up = async function (knex) {
	const WITHOUT_TIMEZONE = true
	const schema = knex.schema
	const createSequence = createSequenceFactory(schema)
	const dropTableCascadeIfExists = dropTableCascadeIfExistsFactory(schema)

	console.log('** init::Dropping tables **')
	await Promise.all([
		dropTableCascadeIfExists(TBL_TRANSACTIONS),
	])
	await Promise.all([
		dropTableCascadeIfExists(TBL_WALLETS),
		dropTableCascadeIfExists(TBL_TRANSACTION_TYPES),
	])
	await Promise.all([
		dropTableCascadeIfExists(TBL_USERS),
		dropTableCascadeIfExists(TBL_WALLET_TYPES),
		dropTableCascadeIfExists(TBL_TRANSACTION_GROUPS),
	])

	console.log('** init::Creating SQL function **')
	const sql = await readFileAsync(path.resolve(__dirname, '../sql/functions.pgsql'), 'utf8')
	await schema.raw(sql)

	console.log('** init::Creating tables **')
	await users()
	await walletTypes()
	await transactionGroups()
	await wallets()
	await transactionTypes()
	await transactions()


	async function users() {
		await schema.createTable(TBL_USERS, tbl => {
			tbl.bigInteger('id')
				.primary()
				.defaultTo(knex.raw(`public.next_id('${TBL_USERS}')`))

			tbl.string('display_name', 100).notNullable()
			tbl.string('image')
			tbl.string('username', 50).notNullable()
			tbl.string('password').notNullable()
			tbl.string('role', 20)
				.notNullable()
				.defaultTo('guest')
			tbl.string('status', 20)
				.notNullable()
				.defaultTo('active')

			tbl.timestamp('created_at', WITHOUT_TIMEZONE)
			tbl.timestamp('updated_at', WITHOUT_TIMEZONE)
		})

		await schema.raw(`ALTER TABLE ${TBL_USERS}` +
			" ADD CONSTRAINT users_role_constraint CHECK (role::text = ANY " +
			"(ARRAY['admin'::text, 'supervisor'::text, 'guest'::text]))")
		await schema.raw(`ALTER TABLE ${TBL_USERS}` +
			" ADD CONSTRAINT users_status_constraint CHECK (status::text = ANY " +
			"(ARRAY['active'::text, 'locked'::text, 'deleted'::text]))")
		await createSequence(TBL_USERS)
	}

	async function walletTypes() {
		await schema.createTable(TBL_WALLET_TYPES, tbl => {
			tbl.bigInteger('id')
				.primary()
				.defaultTo(knex.raw(`public.next_id('${TBL_WALLET_TYPES}')`))

			tbl.string('display_name', 100).notNullable()
			tbl.string('image')
			tbl.boolean('is_credit_card_connectable')
				.notNullable()
				.defaultTo(false)

			tbl.timestamp('created_at', WITHOUT_TIMEZONE)
			tbl.timestamp('updated_at', WITHOUT_TIMEZONE)
		})

		await createSequence(TBL_WALLET_TYPES)
	}

	async function wallets() {
		await schema.createTable(TBL_WALLETS, tbl => {
			tbl.bigInteger('id')
				.primary()
				.defaultTo(knex.raw(`public.next_id('${TBL_WALLETS}')`))

			tbl.string('display_name', 100).notNullable()
			tbl.string('image')
			tbl.integer('account_balance')
				.notNullable()
				.defaultTo(0)
			tbl.bigInteger('user_id').notNullable()
			tbl.bigInteger('wallet_type_id')
			tbl.string('credit_card_series', 50)
			tbl.string('status', 20)
				.notNullable()
				.defaultTo('active')

			tbl.timestamp('created_at', WITHOUT_TIMEZONE)
			tbl.timestamp('updated_at', WITHOUT_TIMEZONE)

			tbl.foreign('user_id')
				.references('id').inTable(TBL_USERS)
				.onDelete('CASCADE')
			tbl.foreign('wallet_type_id')
				.references('id').inTable(TBL_WALLET_TYPES)
				.onDelete('CASCADE')
		})

		await schema.raw(`ALTER TABLE ${TBL_WALLETS}` +
			" ADD CONSTRAINT wallets_status_constraint CHECK (status::text = ANY " +
			"(ARRAY['active'::text, 'locked'::text, 'deleted'::text]))")
		await createSequence(TBL_WALLETS)
	}

	async function transactionGroups() {
		await schema.createTable(TBL_TRANSACTION_GROUPS, tbl => {
			tbl.bigInteger('id')
				.primary()
				.defaultTo(knex.raw(`public.next_id('${TBL_TRANSACTION_GROUPS}')`))

			tbl.string('display_name', 100).notNullable()
			tbl.string('image')
			tbl.boolean('is_money_add')
				.notNullable()
				.defaultTo(true)
			tbl.boolean('is_user_related')
				.notNullable()
				.defaultTo(false)
			tbl.boolean('is_transaction_related')
				.notNullable()
				.defaultTo(false)

			tbl.timestamp('created_at', WITHOUT_TIMEZONE)
			tbl.timestamp('updated_at', WITHOUT_TIMEZONE)
		})

		await createSequence(TBL_TRANSACTION_GROUPS)
	}

	async function transactionTypes() {
		await schema.createTable(TBL_TRANSACTION_TYPES, tbl => {
			tbl.bigInteger('id')
				.primary()
				.defaultTo(knex.raw(`public.next_id('${TBL_TRANSACTION_TYPES}')`))

			tbl.string('display_name', 100).notNullable()
			tbl.string('image')
			tbl.boolean('is_money_add')
			tbl.boolean('is_user_related')
			tbl.boolean('is_transaction_related')

			tbl.bigInteger('transaction_group_id')
			tbl.bigInteger('parent_transaction_type_id')
			tbl.bigInteger('user_id')

			tbl.timestamp('created_at', WITHOUT_TIMEZONE)
			tbl.timestamp('updated_at', WITHOUT_TIMEZONE)

			tbl.foreign('transaction_group_id')
				.references('id').inTable(TBL_TRANSACTION_GROUPS)
				.onDelete('CASCADE')
			tbl.foreign('parent_transaction_type_id')
				.references('id').inTable(TBL_TRANSACTION_TYPES)
				.onDelete('CASCADE')
			tbl.foreign('user_id')
				.references('id').inTable(TBL_USERS)
				.onDelete('CASCADE')
		})

		await createSequence(TBL_TRANSACTION_TYPES)
	}

	async function transactions() {
		await schema.createTable(TBL_TRANSACTIONS, tbl => {
			tbl.bigInteger('id')
				.primary()
				.defaultTo(knex.raw(`public.next_id('${TBL_TRANSACTIONS}')`))

			tbl.integer('money')
				.notNullable()
				.defaultTo(0)
			tbl.string('description', 100)
			tbl.string('related_user_name', 100)
			tbl.jsonb('attributes')

			tbl.bigInteger('transaction_type_id')
			tbl.bigInteger('wallet_id')
			tbl.bigInteger('parent_transaction_id')
			tbl.bigInteger('related_user_id')

			tbl.timestamp('created_at', WITHOUT_TIMEZONE)
			tbl.timestamp('updated_at', WITHOUT_TIMEZONE)

			tbl.foreign('transaction_type_id')
				.references('id').inTable(TBL_TRANSACTION_TYPES)
				.onDelete('SET NULL')
			tbl.foreign('wallet_id')
				.references('id').inTable(TBL_WALLETS)
				.onDelete('CASCADE')
			tbl.foreign('parent_transaction_id')
				.references('id').inTable(TBL_TRANSACTIONS)
				.onDelete('CASCADE')
			tbl.foreign('related_user_id')
				.references('id').inTable(TBL_USERS)
				.onDelete('CASCADE')
		})

		await createSequence(TBL_TRANSACTIONS)
	}
}

exports.down = async function (knex) {
	const schema = knex.schema
	const dropTableCascadeIfExists = dropTableCascadeIfExistsFactory(schema)

	console.log('** init::Dropping tables **')
	await Promise.all([
		dropTableCascadeIfExists(TBL_TRANSACTIONS),
	])
	await Promise.all([
		dropTableCascadeIfExists(TBL_WALLETS),
		dropTableCascadeIfExists(TBL_TRANSACTION_TYPES),
	])
	await Promise.all([
		dropTableCascadeIfExists(TBL_USERS),
		dropTableCascadeIfExists(TBL_WALLET_TYPES),
		dropTableCascadeIfExists(TBL_TRANSACTION_GROUPS),
	])
}
