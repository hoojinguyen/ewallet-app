import { Translatable, ModelAutoMapper } from '@micro-fleet/common'
import { Moment } from 'moment'

import { WalletStatus } from '../../constants/Wallet'
import { momentifyTz } from '../../utils/date-utils'
import { Transaction } from './Transaction'
import { WalletType } from './WalletType'
import { User } from './User'

export class Wallet extends Translatable {

	public static $createTranslator(): any {
		return new WalletTranslator()
	}

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

	public user?: User = undefined
	public walletType?: WalletType = undefined
	public transactions?: Transaction[] = undefined

	public get createdMoment(): Moment {
		return momentifyTz(this.createdAt)
	}

	public get updatedMoment(): Moment {
		return momentifyTz(this.updatedAt)
	}

}

class WalletTranslator extends ModelAutoMapper<Wallet> {
	constructor() {
		super(Wallet)
	}

	/**
	 * @override
	 */
	protected $createMap() {
		return super.$createMap()
			.forMember('user', function ({ sourceObject, sourcePropertyName }: any) {
				return User.from(sourceObject[sourcePropertyName])
			})
			.forMember('walletType', function ({ sourceObject, sourcePropertyName }: any) {
				return WalletType.from(sourceObject[sourcePropertyName])
			})
			.forMember('transactions', function ({ sourceObject, sourcePropertyName }: any) {
				return Transaction.fromMany(sourceObject[sourcePropertyName])
			})
	}
}
