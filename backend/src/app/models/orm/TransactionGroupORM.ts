import { decorators as d } from '@micro-fleet/common'
import { ORMModelBase } from '@micro-fleet/persistence'
import { Model } from 'objection'

import { momentifyUtc, toTimeStringTz } from '../../utils/date-utils'

@d.translatable()
export class TransactionGroupORM extends ORMModelBase {

	public id: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it
	public displayName: string = undefined
	public image: string = undefined
	public isMoneyAdd: boolean = undefined
	public isUserRelated: boolean = undefined
	public isTransactionRelated: boolean = undefined
	public createdAt: string = undefined
	public updatedAt?: string = undefined

	public transactionTypes?: import('./TransactionTypeORM').TransactionTypeORM[] = undefined
	public rootTransactionTypes?: import('./TransactionTypeORM').TransactionTypeORM[] = undefined


	/**
	 * @override
	 */
	public static get tableName(): string {
		return 'public.vdt_transaction_groups'
	}

	public static get relationMappings() {
		const { TransactionTypeORM } = require('./TransactionTypeORM')

		return {
			transactionTypes: {
				relation: Model.HasManyRelation,
				modelClass: TransactionTypeORM,
				join: {
					from: `${TransactionGroupORM.tableName}.id`,
					to: `${TransactionTypeORM.tableName}.transactionGroupId`,
				},
			},

			rootTransactionTypes: {
				relation: Model.HasManyRelation,
				modelClass: TransactionTypeORM,
				join: {
					from: `${TransactionGroupORM.tableName}.id`,
					to: `${TransactionTypeORM.tableName}.transactionGroupId`,
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
