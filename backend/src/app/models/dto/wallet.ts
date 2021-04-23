import * as joi from '@hapi/joi'

import { Translatable, decorators as d } from '@micro-fleet/common'

import { ResultResponse, MaybeResponse, GetListRequestBase, DTOListBase } from './dto-base'
import { WalletStatus } from '../../constants/Wallet'


const WALLET_FIELDS = [
	'id', 'displayName', 'image', 'accountBalance', 'userId', 'walletTypeId',
	'creditCardSeries', 'status', 'createdAt', 'updatedAt',
]
const FIELDS_RULE = { items: joi.string().valid(...WALLET_FIELDS) }

const WALLET_RELATIONS_PATTERN = /(user|walletType|transactions).*/
const RELATIONS_RULE = { items: joi.string().regex(WALLET_RELATIONS_PATTERN).min(1) }


//#region Create

export class CreateWalletRequest extends Translatable {

	@d.required()
	@d.string()
	public readonly displayName: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it

	@d.optional()
	@d.string()
	public readonly image?: string = undefined

	@d.required()
	@d.number()
	public readonly accountBalance: number = undefined

	@d.required()
	@d.bigint()
	public readonly userId: string = undefined

	@d.required()
	@d.bigint()
	public readonly walletTypeId: string = undefined

	@d.optional()
	@d.string({ pattern: /\d+/ })
	public readonly creditCardSeries?: string = undefined

	@d.required()
	@d.valid(WalletStatus.ACTIVE, WalletStatus.LOCKED, WalletStatus.DELETED)
	@d.defaultAs(WalletStatus.ACTIVE)
	public readonly status: string = undefined

}

export class CreateWalletResponse extends ResultResponse {
	public id: string = undefined
	public createdAt: string = undefined
}

//#endregion Create


//#region Delete

export class DeleteWalletRequest extends Translatable {

	@d.required()
	@d.array({
		items: joi.string().regex(/\d+/).required(),
		allowSingle: true,
		maxLength: 10,
	})
	public readonly ids: string[] = undefined

	/**
	 * If `true`, when failed to delete one ID, the whole operation is
	 * considered failure, all changes are rolled back.
	 *
	 * Default is `true`
	 */
	@d.optional()
	@d.boolean()
	public readonly isAtomic?: boolean = undefined
}

export class DeleteWalletResponse extends ResultResponse {
	public deletedAt: string = undefined
}

//#endregion Delete


//#region Edit

export class EditWalletRequest extends Translatable {

	@d.required()
	@d.bigint()
	public readonly id: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it

	@d.optional()
	@d.string()
	public readonly displayName?: string = undefined

	@d.optional()
	@d.string()
	public readonly image?: string = undefined

	@d.optional()
	@d.number()
	public readonly accountBalance?: number = undefined

	@d.optional()
	@d.string({ pattern: /\d+/ })
	public readonly creditCardSeries?: string = undefined

	@d.optional()
	@d.valid(WalletStatus.ACTIVE, WalletStatus.LOCKED, WalletStatus.DELETED)
	public readonly status?: string = undefined
}

export class EditWalletResponse extends ResultResponse {
	public updatedAt: string = undefined
}

//#endregion Edit


//#region Get by ID

export class GetWalletByIdRequest extends Translatable {
	@d.required()
	@d.bigint()
	public readonly id: string = undefined

	@d.optional()
	@d.array(FIELDS_RULE)
	public readonly fields?: string[] = undefined

	@d.optional()
	@d.array(RELATIONS_RULE)
	public readonly relations?: string[] = undefined
}

export class GetSingleWalletResponse extends MaybeResponse {

	public id: string = undefined
	public displayName: string = undefined
	public image: string = undefined
	public accountBalance: number = undefined
	public userId: string = undefined
	public walletTypeId?: string = undefined
	public creditCardSeries?: string = undefined
	public status: WalletStatus = undefined
	public createdAt: string = undefined
	public updatedAt?: string = undefined

	public user?: UserObject = undefined
	public walletType?: WalletTypeObject = undefined
	public transactions?: TransactionObject[] = undefined
}

export class UserObject extends Translatable {
	public id?: string = undefined
	public displayName?: string = undefined
	public imageUrl?: string = undefined
	public username?: string = undefined
	public role?: string = undefined
	public status?: string = undefined
}

export class WalletTypeObject extends Translatable {
	public id?: string = undefined
	public displayName?: string = undefined
	public isCreditCardConnectable?: boolean = undefined
}

export class TransactionObject extends Translatable {
	public id: string = undefined
	public transactionTypeId?: string = undefined
	public money: number = undefined
	public description?: string = undefined
	public walletId?: string = undefined
	public parentTransactionId?: string = undefined
	public relatedUserId?: string = undefined
	public relatedUserName?: string = undefined
	public attributes?: object = undefined

	public parentTransaction?: TransactionObject = undefined
	public childrenTransaction?: TransactionObject[] = undefined
}
//#endregion Get by ID


//#region Count

export class CountWalletRequest extends Translatable {
}

export class CountWalletResponse {
	constructor(
		public total: number,
	) {
	}
}

//#endregion Count


//#region Get List

export class GetWalletListRequest extends GetListRequestBase {

	@d.required()
	@d.bigint()
	public readonly userId: string = undefined

	@d.optional()
	@d.array(FIELDS_RULE)
	public readonly fields?: string[] = undefined

	@d.optional()
	@d.array(RELATIONS_RULE)
	public readonly relations?: string[] = undefined
}

export class WalletListItem extends Translatable {

	public id: string = undefined
	public displayName: string = undefined
	public image: string = undefined
	public accountBalance: number = undefined
	public userId: string = undefined
	public walletTypeId?: string = undefined
	public creditCardSeries?: string = undefined
	public status: WalletStatus = undefined

	public user?: UserObject = undefined
	public walletType?: WalletTypeObject = undefined
	public transactions?: TransactionObject[] = undefined
}

export class GetWalletListResponse extends DTOListBase<WalletListItem> {
	public constructor(Wallets: object[], total: number) {
		super(WalletListItem, Wallets, total)
	}
}

//#endregion Get List
