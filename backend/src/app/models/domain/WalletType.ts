import { Translatable } from '@micro-fleet/common'
import { Moment } from 'moment'

import { momentifyTz } from '../../utils/date-utils'

export class WalletType extends Translatable {

	public id: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it
	public displayName: string = undefined
	public image: string = undefined
	public isCreditCardConnectable: boolean = undefined
	public createdAt: string = undefined
	public updatedAt?: string = undefined

	public get createdMoment(): Moment {
		return momentifyTz(this.createdAt)
	}

	public get updatedMoment(): Moment {
		return momentifyTz(this.updatedAt)
	}

}
