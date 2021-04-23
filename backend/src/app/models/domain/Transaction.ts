import { Translatable, ModelAutoMapper } from '@micro-fleet/common'
import { Moment } from 'moment'

import { momentifyTz } from '../../utils/date-utils'
import { TransactionType } from './TransactionType'
import { Wallet } from './Wallet'
import { User } from './User'

export class Transaction extends Translatable {

	public static $createTranslator(): any {
		return new TransactionTranslator()
	}

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

	public transactionType?: TransactionType = undefined
	public wallet?: Wallet = undefined
	public parentTransaction?: Transaction = undefined
	public childrenTransaction?: Transaction[] = undefined
	public relatedUser?: User = undefined

	public get createdMoment(): Moment {
		return momentifyTz(this.createdAt)
	}

	public get updatedMoment(): Moment {
		return momentifyTz(this.updatedAt)
	}

}

class TransactionTranslator extends ModelAutoMapper<Transaction> {
	constructor() {
		super(Transaction)
	}

	/**
	 * @override
	 */
	protected $createMap() {
		return super.$createMap()
			.forMember('transactionType', function ({ sourceObject, sourcePropertyName }: any) {
				return TransactionType.from(sourceObject[sourcePropertyName])
			})
			.forMember('wallet', function ({ sourceObject, sourcePropertyName }: any) {
				return Wallet.from(sourceObject[sourcePropertyName])
			})
			.forMember('parentTransaction', function ({ sourceObject, sourcePropertyName }: any) {
				return Transaction.from(sourceObject[sourcePropertyName])
			})
			.forMember('childrenTransaction', function ({ sourceObject, sourcePropertyName }: any) {
				return Transaction.fromMany(sourceObject[sourcePropertyName])
			})
			.forMember('relatedUser', function ({ sourceObject, sourcePropertyName }: any) {
				return User.from(sourceObject[sourcePropertyName])
			})
	}
}
