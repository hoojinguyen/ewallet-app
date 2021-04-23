/// <reference types="debug" />
// const debug: debug.IDebugger = require('debug')('scaffold:repo:user')

import { decorators as cd, PagedData } from '@micro-fleet/common'
import { IRepository, PgCrudRepositoryBase, IDatabaseConnector, Types as T, RepositoryPageOptions, QueryCallbackReturn } from '@micro-fleet/persistence'
import { QueryBuilder } from 'objection'

import { TransactionType } from '../models/domain/TransactionType'
import { TransactionTypeORM } from '../models/orm/TransactionTypeORM'

export interface ITransactionTypeRepositoryPageOptions extends RepositoryPageOptions {
	userId?: string
}


export interface ITransactionTypeRepository extends IRepository<TransactionType> {
	// Extra methods to manipulate user
	page(opts: ITransactionTypeRepositoryPageOptions): Promise<PagedData<TransactionType>>
}

@cd.injectable()
export class TransactionTypeRepository
	extends PgCrudRepositoryBase<TransactionTypeORM, TransactionType>
	implements ITransactionTypeRepository {

	constructor(
		@cd.inject(T.DB_CONNECTOR) connector: IDatabaseConnector,
	) {
		super(TransactionTypeORM, TransactionType, connector)
		// debug('UserRepository instantiated')
	}

	protected $buildPageQuery(query: QueryBuilder<TransactionTypeORM>, opts: ITransactionTypeRepositoryPageOptions): QueryCallbackReturn {
		const q = (super.$buildPageQuery(query, opts) as QueryBuilder<TransactionTypeORM>)
		opts.userId && q.andWhere({ userId: opts.userId }).orWhereNull('user_id')
		return q
	}

	// Implemenent extra methods here
}
