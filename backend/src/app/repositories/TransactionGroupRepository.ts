/// <reference types="debug" />
// const debug: debug.IDebugger = require('debug')('scaffold:repo:user')

import { decorators as cd } from '@micro-fleet/common'
import { IRepository, PgCrudRepositoryBase, IDatabaseConnector, Types as T } from '@micro-fleet/persistence'

import { TransactionGroup } from '../models/domain/TransactionGroup'
import { TransactionGroupORM } from '../models/orm/TransactionGroupORM'


export interface ITransactionGroupRepository extends IRepository<TransactionGroup> {
}

@cd.injectable()
export class TransactionGroupRepository
	extends PgCrudRepositoryBase<TransactionGroupORM, TransactionGroup>
	implements ITransactionGroupRepository {

	constructor(
		@cd.inject(T.DB_CONNECTOR) connector: IDatabaseConnector,
	) {
		super(TransactionGroupORM, TransactionGroup, connector)
		// debug('UserRepository instantiated')
	}

	// Implemenent extra methods here
}
