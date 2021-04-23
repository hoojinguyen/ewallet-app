const { TBL_TRANSACTIONS } = require('./20190907161028_init')

exports.up = async function(knex) {
	const schema = knex.schema

	console.log('** Transactions **')
	await transactions()

	async function transactions() {
		await schema.alterTable(TBL_TRANSACTIONS, tbl => {
			tbl.integer('money_paid')
			tbl.integer('money_remain')
		})
	}
}

exports.down = async function(knex) {
	const schema = knex.schema

	await schema.alterTable(TBL_TRANSACTIONS, tbl => {
		tbl.dropColumn('money_paid')
		tbl.dropColumn('money_remain')
	})
}
