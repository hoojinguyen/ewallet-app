/// <reference types="debug" />
// const debug: debug.IDebugger = require('debug')('scaffold:repo:user')

import { decorators as cd, PagedData } from '@micro-fleet/common'
import { IRepository, PgCrudRepositoryBase, IDatabaseConnector, Types as T, RepositoryPageOptions, QueryCallbackReturn } from '@micro-fleet/persistence'
import { QueryBuilder } from 'objection'

import { Wallet } from '../models/domain/Wallet'
import { WalletORM } from '../models/orm/WalletORM'

export interface IWalletRepositoryPageOptions extends RepositoryPageOptions {
	userId?: string
}


export interface IWalletRepository extends IRepository<Wallet> {
	// Extra methods to manipulate user
	page(opts: IWalletRepositoryPageOptions): Promise<PagedData<Wallet>>
}

@cd.injectable()
export class WalletRepository
	extends PgCrudRepositoryBase<WalletORM, Wallet>
	implements IWalletRepository {

	constructor(
		@cd.inject(T.DB_CONNECTOR) connector: IDatabaseConnector,
	) {
		super(WalletORM, Wallet, connector)
		// debug('UserRepository instantiated')
	}

	protected $buildPageQuery(query: QueryBuilder<WalletORM>, opts: IWalletRepositoryPageOptions): QueryCallbackReturn {
		const q = (super.$buildPageQuery(query, opts) as QueryBuilder<WalletORM>)
		opts.userId && q.andWhere({ userId: opts.userId })
		return q
	}

	// Implemenent extra methods here
}
