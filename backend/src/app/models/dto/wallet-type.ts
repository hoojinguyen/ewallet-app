import * as joi from '@hapi/joi'

import { Translatable, decorators as d } from '@micro-fleet/common'

import { ResultResponse, MaybeResponse, GetListRequestBase, DTOListBase } from './dto-base'
import { WalletStatus } from '../../constants/Wallet'


const WALLET_TYPE_FIELDS = [
	'id', 'displayName', 'image', 'isCreditCardConnectable', 'createdAt', 'updatedAt',
]
const FIELDS_RULE = { items: joi.string().valid(...WALLET_TYPE_FIELDS) }

const WALLET_TYPE_RELATIONS_PATTERN = /(wallets).*/
const RELATIONS_RULE = { items: joi.string().regex(WALLET_TYPE_RELATIONS_PATTERN).min(1) }


//#region Create

export class CreateWalletTypeRequest extends Translatable {

	@d.required()
	@d.string()
	public readonly displayName: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it

	@d.optional()
	@d.string()
	public readonly image?: string = undefined

	@d.required()
	@d.boolean()
	@d.defaultAs(false)
	public readonly isCreditCardConnectable: boolean = undefined

}

export class CreateWalletTypeResponse extends ResultResponse {
	public id: string = undefined
	public createdAt: string = undefined
}

//#endregion Create


//#region Delete

export class DeleteWalletTypeRequest extends Translatable {

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

export class DeleteWalletTypeResponse extends ResultResponse {
	public deletedAt: string = undefined
}

//#endregion Delete


//#region Edit

export class EditWalletTypeRequest extends Translatable {

	@d.required()
	@d.bigint()
	public readonly id: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it

	@d.optional()
	@d.string()
	public readonly displayName?: string = undefined

	@d.optional()
	@d.string()
	public readonly image?: string = undefined
}

export class EditWalletTypeResponse extends ResultResponse {
	public updatedAt: string = undefined
}

//#endregion Edit


//#region Get by ID

export class GetWalletTypeByIdRequest extends Translatable {
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

export class GetSingleWalletTypeResponse extends MaybeResponse {

	public id: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it
	public displayName: string = undefined
	public image: string = undefined
	public isCreditCardConnectable: boolean = undefined
	public createdAt: string = undefined
	public updatedAt?: string = undefined

	public wallets?: WalletObject[] = undefined
}

export class WalletObject extends Translatable {
	public id?: string = undefined
	public displayName?: string = undefined
	public image?: string = undefined
	public accountBalance?: number = undefined
	public userId?: string = undefined
	public walletTypeId?: string = undefined
	public creditCardSeries?: string = undefined
	public status?: WalletStatus = undefined
}
//#endregion Get by ID


//#region Count

export class CountWalletTypeRequest extends Translatable {
}

export class CountWalletTypeResponse {
	constructor(
		public total: number,
	) {
	}
}

//#endregion Count


//#region Get List

export class GetWalletTypeListRequest extends GetListRequestBase {

	@d.optional()
	@d.array(FIELDS_RULE)
	public readonly fields?: string[] = undefined

	@d.optional()
	@d.array(RELATIONS_RULE)
	public readonly relations?: string[] = undefined
}

export class WalletTypeListItem extends Translatable {

	public id: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it
	public displayName: string = undefined
	public image: string = undefined
	public isCreditCardConnectable: boolean = undefined

	public wallets?: WalletObject[] = undefined
}

export class GetWalletTypeListResponse extends DTOListBase<WalletTypeListItem> {
	public constructor(WalletTypes: object[], total: number) {
		super(WalletTypeListItem, WalletTypes, total)
	}
}

//#endregion Get List
