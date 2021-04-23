import * as joi from '@hapi/joi'

import { Translatable, decorators as d } from '@micro-fleet/common'

import { ResultResponse, MaybeResponse, GetListRequestBase, DTOListBase } from './dto-base'


const TRANSACTION_GROUP_FIELDS = [
	'id', 'displayName', 'image', 'isMoneyAdd', 'isUserRelated',
	'isTransactionRelated', 'createdAt', 'updatedAt',
]
const FIELDS_RULE = { items: joi.string().valid(...TRANSACTION_GROUP_FIELDS) }

const TRANSACTION_GROUP_RELATIONS_PATTERN = /(transactionTypes|rootTransactionTypes).*/
const RELATIONS_RULE = { items: joi.string().regex(TRANSACTION_GROUP_RELATIONS_PATTERN).min(1) }


//#region Create

export class CreateTransactionGroupRequest extends Translatable {

	@d.required()
	@d.string()
	public readonly displayName: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it

	@d.optional()
	@d.bigint()
	public readonly image: string = undefined

	@d.required()
	@d.boolean()
	public readonly isMoneyAdd: boolean = undefined

	@d.required()
	@d.boolean()
	public readonly isUserRelated: boolean = undefined

	@d.required()
	@d.boolean()
	public readonly isTransactionRelated: boolean = undefined

}

export class CreateTransactionGroupResponse extends ResultResponse {
	public id: string = undefined
	public createdAt: string = undefined
}

//#endregion Create


//#region Delete

export class DeleteTransactionGroupRequest extends Translatable {

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

export class DeleteTransactionGroupResponse extends ResultResponse {
	public deletedAt: string = undefined
}

//#endregion Delete


//#region Edit

export class EditTransactionGroupRequest extends Translatable {

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

export class EditTransactionGroupResponse extends ResultResponse {
	public updatedAt: string = undefined
}

//#endregion Edit


//#region Get by ID

export class GetTransactionGroupByIdRequest extends Translatable {
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

export class GetSingleTransactionGroupResponse extends MaybeResponse {
	public id: string = undefined
	public displayName?: string = undefined
	public image?: string = undefined
	public isMoneyAdd: number = undefined
	public isUserRelated?: string = undefined
	public isTransactionRelated?: string = undefined
	public createdAt?: string = undefined
	public updatedAt?: string = undefined

	public transactionTypes?: TransactionTypeObject[] = undefined
	public rootTransactionTypes?: TransactionTypeObject[] = undefined
}

export class TransactionTypeObject extends Translatable {
	public id: string = undefined
	public displayName?: string = undefined
	public image?: string = undefined
	public isMoneyAdd: number = undefined
	public isUserRelated?: string = undefined
	public isTransactionRelated?: string = undefined
	public transactionGroupId?: string = undefined
	public parentTransactionTypeId?: string = undefined
	public userId?: string = undefined

	public parentTransactionType?: TransactionTypeObject = undefined
	public childrenTransactionType?: TransactionTypeObject[] = undefined
}

//#endregion Get by ID


//#region Count

export class CountTransactionGroupRequest extends Translatable {
}

export class CountTransactionGroupResponse {
	constructor(
		public total: number,
	) {
	}
}

//#endregion Count


//#region Get List

export class GetTransactionGroupListRequest extends GetListRequestBase {

	@d.optional()
	@d.array(FIELDS_RULE)
	public readonly fields?: string[] = undefined

	@d.optional()
	@d.array(RELATIONS_RULE)
	public readonly relations?: string[] = undefined
}

export class TransactionGroupListItem extends Translatable {
	public id: string = undefined
	public displayName?: string = undefined
	public image?: string = undefined
	public isMoneyAdd?: number = undefined
	public isUserRelated?: string = undefined
	public isTransactionRelated?: string = undefined
	public createdAt?: string = undefined
	public updatedAt?: string = undefined

	public transactionTypes?: TransactionTypeObject[] = undefined
	public rootTransactionTypes?: TransactionTypeObject[] = undefined
}

export class GetTransactionGroupListResponse extends DTOListBase<TransactionGroupListItem> {
	public constructor(transactions: object[], total: number) {
		super(TransactionGroupListItem, transactions, total)
	}
}

//#endregion Get List
