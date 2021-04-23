import { Translatable, ModelAutoMapper } from '@micro-fleet/common'
import { Moment } from 'moment'

import { UserStatus, UserRole } from '../../constants/User'
import { momentifyTz } from '../../utils/date-utils'
import { Wallet } from './Wallet'

export class User extends Translatable {

	public static $createTranslator(): any {
		return new UserTranslator()
	}

	public id: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it
	public displayName: string = undefined
	public image: string = undefined
	public username: string = undefined
	public password: string = undefined
	public role: UserRole = undefined
	public status: UserStatus = undefined
	public createdAt: string = undefined
	public updatedAt?: string = undefined

	public wallets?: Wallet[] = undefined

	public get createdMoment(): Moment {
		return momentifyTz(this.createdAt)
	}

	public get updatedMoment(): Moment {
		return momentifyTz(this.updatedAt)
	}

}

class UserTranslator extends ModelAutoMapper<User> {
	constructor() {
		super(User)
	}

	/**
	 * @override
	 */
	protected $createMap() {
		return super.$createMap()
			.forMember('wallets', function ({ sourceObject, sourcePropertyName }: any) {
				return Wallet.fromMany(sourceObject[sourcePropertyName])
			})
	}
}
