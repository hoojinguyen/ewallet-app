import { decorators as d } from '@micro-fleet/common'
import { ORMModelBase } from '@micro-fleet/persistence'
import { Model } from 'objection'

import { WalletStatus } from '../../constants/Wallet'
import { momentifyUtc, toTimeStringTz } from '../../utils/date-utils'
import { WalletTypeORM } from './WalletTypeORM'
import { UserORM } from './UserORM'

@d.translatable()
export class WalletORM extends ORMModelBase {

	public id: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it
	public displayName: string = undefined
	public image: string = undefined
	public accountBalance: number = undefined
	public userId: string = undefined
	public walletTypeId?: string = undefined
	public creditCardSeries?: string = undefined
	public status: WalletStatus = undefined
	public createdAt: string = undefined
	public updatedAt?: string = undefined

	public user?: UserORM = undefined
	public walletType?: WalletTypeORM = undefined
	public transactions?: import('./TransactionORM').TransactionORM[] = undefined


	/**
	 * @override
	 */
	public static get tableName(): string {
		return 'public.vdt_wallets'
	}

	public static get relationMappings() {
		const { TransactionORM } = require('./TransactionORM')
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: UserORM,
				join: {
					from: `${WalletORM.tableName}.userId`,
					to: `${UserORM.tableName}.id`,
				},
			},

			walletType: {
				relation: Model.BelongsToOneRelation,
				modelClass: WalletTypeORM,
				join: {
					from: `${WalletORM.tableName}.walletTypeId`,
					to: `${WalletTypeORM.tableName}.id`,
				},
			},

			transactions: {
				relation: Model.HasManyRelation,
				modelClass: TransactionORM,
				join: {
					from: `${WalletORM.tableName}.id`,
					to: `${TransactionORM.tableName}.walletId`,
				},
			},
		}
	}

	/**
	 * [ObjectionJS]
	 */
	public $beforeInsert(queryContext: any) {
		super.$beforeInsert(queryContext)
		this.createdAt = momentifyUtc().format()
	}

	/**
	 * [ObjectionJS]
	 */
	public $beforeUpdate(opt: any, queryContext: any) {
		super.$beforeUpdate(opt, queryContext)
		this.updatedAt = momentifyUtc().format()
	}

	/**
	 * [ObjectionJS]
	 * This method converts the JSON object from the database format
	 * to the entity class.
	 */
	public $parseDatabaseJson(json: any) {
		json = super.$parseDatabaseJson(json)
		return {
			...json,
			createdAt: toTimeStringTz(json.createdAt),
			updatedAt: toTimeStringTz(json.updatedAt),
		}
	}

}
