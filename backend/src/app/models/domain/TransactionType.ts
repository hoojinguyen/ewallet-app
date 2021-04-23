import { Translatable, ModelAutoMapper } from '@micro-fleet/common'
import { Moment } from 'moment'

import { momentifyTz } from '../../utils/date-utils'
import { TransactionGroup } from './TransactionGroup'
import { User } from './User'

export class TransactionType extends Translatable {

	public static $createTranslator(): any {
		return new TransactionTypeTranslator()
	}

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

	public transactionGroup?: TransactionGroup = undefined
	public parentTransactionType?: TransactionType = undefined
	public childrenTransactionTypes?: TransactionType[] = undefined
	public user?: User = undefined

	public get createdMoment(): Moment {
		return momentifyTz(this.createdAt)
	}

	public get updatedMoment(): Moment {
		return momentifyTz(this.updatedAt)
	}

}

class TransactionTypeTranslator extends ModelAutoMapper<TransactionType> {
	constructor() {
		super(TransactionType)
	}

	/**
	 * @override
	 */
	protected $createMap() {
		return super.$createMap()
			.forMember('transactionGroup', function ({ sourceObject, sourcePropertyName }: any) {
				return TransactionGroup.from(sourceObject[sourcePropertyName])
			})
			.forMember('parentTransactionType', function ({ sourceObject, sourcePropertyName }: any) {
				return TransactionType.from(sourceObject[sourcePropertyName])
			})
			.forMember('childrenTransactionTypes', function ({ sourceObject, sourcePropertyName }: any) {
				return TransactionType.fromMany(sourceObject[sourcePropertyName])
			})
			.forMember('user', function ({ sourceObject, sourcePropertyName }: any) {
				return User.from(sourceObject[sourcePropertyName])
			})
	}
}
