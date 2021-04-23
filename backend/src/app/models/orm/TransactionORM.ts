import { decorators as d } from '@micro-fleet/common'
import { ORMModelBase } from '@micro-fleet/persistence'
import { Model } from 'objection'

import { momentifyUtc, toTimeStringTz } from '../../utils/date-utils'
import { TransactionTypeORM } from './TransactionTypeORM'
import { WalletORM } from './WalletORM'
import { UserORM } from './UserORM'

@d.translatable()
export class TransactionORM extends ORMModelBase {

	public id: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it
	public transactionTypeId?: string = undefined
	public money: number = undefined
	public moneyPaid?: number = undefined
	public moneyRemain?: number = undefined
	public description?: string = undefined
	public walletId?: string = undefined
	public parentTransactionId?: string = undefined
	public relatedUserId?: string = undefined
	public relatedUserName?: string = undefined
	public attributes?: object = undefined
	public createdAt: string = undefined
	public updatedAt?: string = undefined

	public transactionType?: TransactionTypeORM = undefined
	public wallet?: WalletORM = undefined
	public parentTransaction?: TransactionORM = undefined
	public childrenTransaction?: TransactionORM[] = undefined
	public relatedUser?: UserORM = undefined


	/**
	 * @override
	 */
	public static get tableName(): string {
		return 'public.vdt_transactions'
	}

	public static relationMappings = {
		transactionType: {
			relation: Model.BelongsToOneRelation,
			modelClass: TransactionTypeORM,
			join: {
				from: `${TransactionORM.tableName}.transactionTypeId`,
				to: `${TransactionTypeORM.tableName}.id`,
			},
		},

		wallet: {
			relation: Model.BelongsToOneRelation,
			modelClass: WalletORM,
			join: {
				from: `${TransactionORM.tableName}.walletId`,
				to: `${WalletORM.tableName}.id`,
			},
		},

		parentTransaction: {
			relation: Model.BelongsToOneRelation,
			modelClass: TransactionORM,
			join: {
				from: `${TransactionORM.tableName}.parentTransactionId`,
				to: `${TransactionORM.tableName}.id`,
			},
		},

		childrenTransaction: {
			relation: Model.HasManyRelation,
			modelClass: TransactionORM,
			join: {
				from: `${TransactionORM.tableName}.id`,
				to: `${TransactionORM.tableName}.parentTransactionId`,
			},
		},

		relatedUser: {
			relation: Model.BelongsToOneRelation,
			modelClass: UserORM,
			join: {
				from: `${TransactionORM.tableName}.relatedUserId`,
				to: `${UserORM.tableName}.id`,
			},
		},
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
