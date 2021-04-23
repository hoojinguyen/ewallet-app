/// <reference types="debug" />
// const debug: debug.IDebugger = require('debug')('scaffold:repo:user')

import { decorators as cd } from '@micro-fleet/common'
import { IRepository, PgCrudRepositoryBase, IDatabaseConnector, Types as T } from '@micro-fleet/persistence'

import { WalletType } from '../models/domain/WalletType'
import { WalletTypeORM } from '../models/orm/WalletTypeORM'


export interface IWalletTypeRepository extends IRepository<WalletType> {
}

@cd.injectable()
export class WalletTypeRepository
	extends PgCrudRepositoryBase<WalletTypeORM, WalletType>
	implements IWalletTypeRepository {

	constructor(
		@cd.inject(T.DB_CONNECTOR) connector: IDatabaseConnector,
	) {
		super(WalletTypeORM, WalletType, connector)
		// debug('UserRepository instantiated')
	}

	// Implemenent extra methods here
}
