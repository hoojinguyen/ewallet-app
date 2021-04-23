const tbl = require('../migrations/20190907161028_init')
const { USERS } = require('./data/users')
const { WALLET_TYPES } = require('./data/wallet-types')
const { WALLETS } = require('./data/wallets')
const { TRANSACTION_GROUPS } = require('./data/transaction-groups')
const { TRANSACTION_TYPES } = require('./data/transaction-types')
const { TRANSACTIONS } = require('./data/transactions')

exports.seed = async function(knex, Promise) {

	await knex(tbl.TBL_TRANSACTIONS).del()
	await knex(tbl.TBL_TRANSACTION_TYPES).del()
	await knex(tbl.TBL_TRANSACTION_GROUPS).del()
	await knex(tbl.TBL_WALLETS).del()
	await knex(tbl.TBL_WALLET_TYPES).del()
	await knex(tbl.TBL_USERS).del()

	await knex(tbl.TBL_USERS).insert(USERS)
	await knex(tbl.TBL_WALLET_TYPES).insert(WALLET_TYPES)
	await knex(tbl.TBL_WALLETS).insert(WALLETS)
	await knex(tbl.TBL_TRANSACTION_GROUPS).insert(TRANSACTION_GROUPS)
	await knex(tbl.TBL_TRANSACTION_TYPES).insert(TRANSACTION_TYPES)
	await knex(tbl.TBL_TRANSACTIONS).insert(TRANSACTIONS)
}
