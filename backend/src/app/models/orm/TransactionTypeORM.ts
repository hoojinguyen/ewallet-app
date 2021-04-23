import { decorators as d } from '@micro-fleet/common'
import { ORMModelBase } from '@micro-fleet/persistence'
import { Model, QueryBuilder } from 'objection'

import { momentifyUtc, toTimeStringTz } from '../../utils/date-utils'
import { TransactionGroupORM } from './TransactionGroupORM'
import { UserORM } from './UserORM'

@d.translatable()
export class TransactionTypeORM extends ORMModelBase {

	public id: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it
	public displayName: string = undefined
	public image: string = undefined
	public isMoneyAdd?: boolean = undefined
	public isUserRelated?: boolean = undefined
	public isTransactionRelated?: boolean = undefined
	public transactionGroupId?: string = undefined
	public parentTransactionTypeId?: string = undefined
	public userId?: string = undefined
	public createdAt: string = undefined
	public updatedAt?: string = undefined

	public transactionGroup?: TransactionGroupORM = undefined
	public parentTransactionType?: TransactionTypeORM = undefined
	public childrenTransactionTypes?: TransactionTypeORM[] = undefined
	public user?: UserORM = undefined


	/**
	 * @override
	 */
	public static get tableName(): string {
		return 'public.vdt_transaction_types'
	}

	/**
	 * [ObjectionJS]
	 */
	public static get modifiers() {
		return {
			selectRootTransactionTypes(builder: QueryBuilder<TransactionTypeORM>) {
				builder.whereNull('parentTransactionTypeId')
			},
		}
	}

	public static relationMappings = {
		transactionGroup: {
			relation: Model.BelongsToOneRelation,
			modelClass: TransactionGroupORM,
			join: {
				from: `${TransactionTypeORM.tableName}.transactionGroupId`,
				to: `${TransactionGroupORM.tableName}.id`,
			},
		},

		parentTransactionType: {
			relation: Model.BelongsToOneRelation,
			modelClass: TransactionTypeORM,
			join: {
				from: `${TransactionTypeORM.tableName}.parentTransactionTypeId`,
				to: `${TransactionTypeORM.tableName}.id`,
			},
		},

		childrenTransactionTypes: {
			relation: Model.HasManyRelation,
			modelClass: TransactionTypeORM,
			join: {
				from: `${TransactionTypeORM.tableName}.id`,
				to: `${TransactionTypeORM.tableName}.parentTransactionTypeId`,
			},
		},

		user: {
			relation: Model.BelongsToOneRelation,
			modelClass: UserORM,
			join: {
				from: `${TransactionTypeORM.tableName}.userId`,
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
