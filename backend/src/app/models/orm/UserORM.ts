import { decorators as d } from '@micro-fleet/common'
import { ORMModelBase } from '@micro-fleet/persistence'
import { Model } from 'objection'

import { UserStatus, UserRole } from '../../constants/User'
import { momentifyUtc, toTimeStringTz } from '../../utils/date-utils'

@d.translatable()
export class UserORM extends ORMModelBase {

	public id: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it
	public displayName: string = undefined
	public image: string = undefined
	public username: string = undefined
	public password: string = undefined
	public role: UserRole = undefined
	public status: UserStatus = undefined
	public createdAt: string = undefined
	public updatedAt?: string = undefined

	public wallets?: import('./WalletORM').WalletORM[] = undefined

	public static get relationMappings() {
		const { WalletORM } = require('./WalletORM')

		return {
			wallets: {
				relation: Model.HasManyRelation,
				modelClass: WalletORM,
				join: {
					from: `${UserORM.tableName}.id`,
					to: `${WalletORM.tableName}.userId`,
				},
			},
		}
	}


	/**
	 * @override
	 */
	public static get tableName(): string {
		return 'public.vdt_users'
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
