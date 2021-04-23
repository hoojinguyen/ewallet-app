import { Translatable, ModelAutoMapper } from '@micro-fleet/common'
import { Moment } from 'moment'

import { momentifyTz } from '../../utils/date-utils'
import { TransactionType } from './TransactionType'

export class TransactionGroup extends Translatable {

	public static $createTranslator(): any {
		return new TransactionGroupTranslator()
	}

	public id: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it
	public displayName: string = undefined
	public image: string = undefined
	public isMoneyAdd: boolean = undefined
	public isUserRelated: boolean = undefined
	public isTransactionRelated: boolean = undefined
	public createdAt: string = undefined
	public updatedAt?: string = undefined

	public transactionTypes?: TransactionType[] = undefined
	public rootTransactionTypes?: TransactionType[] = undefined

	public get createdMoment(): Moment {
		return momentifyTz(this.createdAt)
	}

	public get updatedMoment(): Moment {
		return momentifyTz(this.updatedAt)
	}

}

class TransactionGroupTranslator extends ModelAutoMapper<TransactionGroup> {
	constructor() {
		super(TransactionGroup)
	}

	/**
	 * @override
	 */
	protected $createMap() {
		return super.$createMap()
			.forMember('transactionTypes', function ({ sourceObject, sourcePropertyName }: any) {
				return TransactionType.fromMany(sourceObject[sourcePropertyName])
			})
			.forMember('rootTransactionTypes', function ({ sourceObject, sourcePropertyName }: any) {
				return TransactionType.fromMany(sourceObject[sourcePropertyName])
			})
	}
}
