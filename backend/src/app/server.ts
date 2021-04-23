import { ITransactionTypeRepository, TransactionTypeRepository } from './repositories/TransactionTypeRepository'
import { MicroServiceBase } from '@micro-fleet/microservice'
import { registerDbAddOn } from '@micro-fleet/persistence'
import { registerWebAddOn } from '@micro-fleet/web'
import { registerIdAddOn } from '@micro-fleet/id-generator'
import { AuthAddOn, Types as oT } from '@micro-fleet/oauth'
import { IServiceAddOn } from '@micro-fleet/common'

import { Types as T } from './constants/Types'
import { IUserRepository, UserRepository } from './repositories/UserRepository'
import { IUserService, UserService } from './services/UserService'
import { ITransactionRepository, TransactionRepository } from './repositories/TransactionRepository'
import { ITransactionService, TransactionService } from './services/TransactionService'
import { ITransactionTypeService, TransactionTypeService } from './services/TransactionTypeService'
import { ITransactionGroupRepository, TransactionGroupRepository } from './repositories/TransactionGroupRepository'
import { ITransactionGroupService, TransactionGroupService } from './services/TransactionGroupService'
import { IWalletRepository, WalletRepository } from './repositories/WalletRepository'
import { IWalletService, WalletService } from './services/WalletService'
import { IWalletTypeRepository, WalletTypeRepository } from './repositories/WalletTypeRepository'
import { IWalletTypeService, WalletTypeService } from './services/WalletTypeService'


class App extends MicroServiceBase {

	/**
	 * @override
	 */
	public $registerDependencies(): void {
		super.$registerDependencies()

		const dc = this._depContainer
		dc.bindConstructor<IUserRepository>(T.USER_REPO, UserRepository).asSingleton()
		dc.bindConstructor<IUserService>(T.USER_SVC, UserService).asSingleton()

		dc.bindConstructor<ITransactionRepository>(T.TRANSCTN_REPO, TransactionRepository).asSingleton()
		dc.bindConstructor<ITransactionService>(T.TRANSCTN_SVC, TransactionService).asSingleton()

		dc.bindConstructor<ITransactionTypeRepository>(T.TRANSCTN_TYPE_REPO, TransactionTypeRepository).asSingleton()
		dc.bindConstructor<ITransactionTypeService>(T.TRANSCTN_TYPE_SVC, TransactionTypeService).asSingleton()

		dc.bindConstructor<ITransactionGroupRepository>(T.TRANSCTN_GROUP_REPO, TransactionGroupRepository).asSingleton()
		dc.bindConstructor<ITransactionGroupService>(T.TRANSCTN_GROUP_SVC, TransactionGroupService).asSingleton()

		dc.bindConstructor<IWalletRepository>(T.WALLET_REPO, WalletRepository).asSingleton()
		dc.bindConstructor<IWalletService>(T.WALLET_SVC, WalletService).asSingleton()

		dc.bindConstructor<IWalletTypeRepository>(T.WALLET_TYPE_REPO, WalletTypeRepository).asSingleton()
		dc.bindConstructor<IWalletTypeService>(T.WALLET_TYPE_SVC, WalletTypeService).asSingleton()

		// Add-on
		dc.bindConstructor<AuthAddOn>(oT.AUTH_ADDON, AuthAddOn).asSingleton()
	}

	/**
	 * @override
	 */
	public $onStarting(): void {
		super.$onStarting()

		this.attachAddOn(registerDbAddOn())
		this.attachAddOn(registerWebAddOn())
		this.attachAddOn(registerIdAddOn())

		const authAddOn = this._depContainer.resolve<IServiceAddOn>(oT.AUTH_ADDON)
		this.attachAddOn(authAddOn)
	}
}

new App().start().catch(console.error)
