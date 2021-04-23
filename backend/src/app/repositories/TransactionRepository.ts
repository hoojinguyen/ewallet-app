/// <reference types="debug" />
// const debug: debug.IDebugger = require('debug')('scaffold:repo:user')

import { decorators as cd, PagedData } from '@micro-fleet/common'
import { IRepository, PgCrudRepositoryBase, IDatabaseConnector, Types as T, RepositoryPageOptions, QueryCallbackReturn, QueryCallback } from '@micro-fleet/persistence'
import { QueryBuilder } from 'objection'

import { Transaction } from '../models/domain/Transaction'
import { TransactionORM } from '../models/orm/TransactionORM'
import { momentifyTz } from '../utils/date-utils'


export interface ITransactionRepositoryPageMinOptions extends RepositoryPageOptions {
	walletId?: string
}

export interface ITransactionRepositoryPageOptions extends ITransactionRepositoryPageMinOptions {
	date?: string
	byMonth?: boolean
	transactionTypeId?: string
}


export interface ITransactionRepository extends IRepository<Transaction> {
	// Extra methods to manipulate user
	page(opts: ITransactionRepositoryPageOptions): Promise<PagedData<Transaction>>

	pageActiveDebtList(opts: ITransactionRepositoryPageMinOptions): Promise<PagedData<Transaction>>

	pageActiveLendList(opts: ITransactionRepositoryPageMinOptions): Promise<PagedData<Transaction>>
}

@cd.injectable()
export class TransactionRepository
	extends PgCrudRepositoryBase<TransactionORM, Transaction>
	implements ITransactionRepository {

	constructor(
		@cd.inject(T.DB_CONNECTOR) connector: IDatabaseConnector,
	) {
		super(TransactionORM, Transaction, connector)
		// debug('UserRepository instantiated')
	}

	public async pageActiveDebtList(opts: ITransactionRepositoryPageMinOptions): Promise<PagedData<Transaction>> {
		return this.$dbConnector.prepare(
			TransactionORM,
			(async q => {
				const query = await this.$buildPageActiveDebtQuery(q, opts)
				return query
			}) as QueryCallback<TransactionORM>
		)
		.then(fetchedTransactions => new PagedData(fetchedTransactions.results, fetchedTransactions.total))
	}

	protected $buildPageActiveDebtQuery(query: QueryBuilder<TransactionORM>, opts: ITransactionRepositoryPageOptions): QueryCallbackReturn {
		const q = (super.$buildPageQuery(query, opts) as QueryBuilder<TransactionORM>)
		opts.walletId && q.andWhere({ walletId: opts.walletId })
		q.andWhere({ transactionTypeId: '8365846352260765084' }).whereNot({ moneyRemain: '0' })

		return q
	}

	public async pageActiveLendList(opts: ITransactionRepositoryPageMinOptions): Promise<PagedData<Transaction>> {
		return this.$dbConnector.prepare(
			TransactionORM,
			(async q => {
				const query = await this.$buildPageActiveLendQuery(q, opts)
				return query
			}) as QueryCallback<TransactionORM>
		)
		.then(fetchedTransactions => new PagedData(fetchedTransactions.results, fetchedTransactions.total))
	}

	protected $buildPageActiveLendQuery(query: QueryBuilder<TransactionORM>, opts: ITransactionRepositoryPageOptions): QueryCallbackReturn {
		const q = (super.$buildPageQuery(query, opts) as QueryBuilder<TransactionORM>)
		opts.walletId && q.andWhere({ walletId: opts.walletId })
		q.andWhere({ transactionTypeId: '8365846352252371959' }).whereNot({ moneyRemain: '0' })

		return q
	}

	protected $buildPageQuery(query: QueryBuilder<TransactionORM>, opts: ITransactionRepositoryPageOptions): QueryCallbackReturn {
		const q = (super.$buildPageQuery(query, opts) as QueryBuilder<TransactionORM>)
		opts.walletId && q.andWhere({ walletId: opts.walletId })
		opts.transactionTypeId && q.andWhere({ transactionTypeId: opts.transactionTypeId })

		if (opts.date) {
			if (opts.byMonth) {
				const startOfMonth = momentifyTz(opts.date).startOf('month').utc().format()
				const endOfMonth = momentifyTz(opts.date).endOf('month').utc().format()
				q.andWhere('createdAt', '>=', startOfMonth).andWhere('createdAt', '<=', endOfMonth)
				return q
			}

			const startOfDate = momentifyTz(opts.date).startOf('day').utc().format()
			const endOfDate = momentifyTz(opts.date).endOf('day').utc().format()
			q.andWhere('createdAt', '>=', startOfDate).andWhere('createdAt', '<=', endOfDate)
		}

		return q
	}

	// Implemenent extra methods here
}
