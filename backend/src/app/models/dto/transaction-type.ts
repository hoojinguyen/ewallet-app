import * as joi from '@hapi/joi'

import { Translatable, decorators as d } from '@micro-fleet/common'

import { ResultResponse, MaybeResponse, GetListRequestBase, DTOListBase } from './dto-base'


const TRANSACTION_TYPE_FIELDS = [
	'id', 'displayName', 'image', 'isMoneyAdd', 'isUserRelated', 'isTransactionRelated',
	'transactionGroupId', 'parentTransactionTypeId', 'userId', 'createdAt', 'updatedAt',
]
const FIELDS_RULE = { items: joi.string().valid(...TRANSACTION_TYPE_FIELDS) }

const TRANSACTION_TYPE_RELATIONS_PATTERN = /(transactionGroup|parentTransactionType|childrenTransactionTypes|user).*/
const RELATIONS_RULE = { items: joi.string().regex(TRANSACTION_TYPE_RELATIONS_PATTERN).min(1) }


//#region Create

export class CreateTransactionTypeRequest extends Translatable {

	@d.required()
	@d.string()
	public readonly displayName: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it

	@d.optional()
	@d.string()
	public readonly image?: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it

	@d.required()
	@d.bigint()
	public readonly transactionGroupId: string = undefined

	@d.optional()
	@d.bigint()
	public readonly parentTransactionTypeId?: string = undefined

	@d.optional()
	@d.bigint()
	public readonly userId?: string = undefined

}

export class CreateTransactionTypeResponse extends ResultResponse {
	public id: string = undefined
	public createdAt: string = undefined
}

//#endregion Create


//#region Delete

export class DeleteTransactionTypeRequest extends Translatable {

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

export class DeleteTransactionTypeResponse extends ResultResponse {
	public deletedAt: string = undefined
}

//#endregion Delete


//#region Edit

export class EditTransactionTypeRequest extends Translatable {

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

export class EditTransactionTypeResponse extends ResultResponse {
	public updatedAt: string = undefined
}

//#endregion Edit


//#region Get by ID

export class GetTransactionTypeByIdRequest extends Translatable {
	@d.required()
	@d.bigint()
	public readonly id: string = undefined

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

export class GetSingleTransactionTypeResponse extends MaybeResponse {
	public id: string = undefined
	public displayName?: string = undefined
	public image?: string = undefined
	public isMoneyAdd: number = undefined
	public isUserRelated?: string = undefined
	public isTransactionRelated?: string = undefined
	public transactionGroupId?: string = undefined
	public parentTransactionTypeId?: string = undefined
	public userId?: string = undefined
	public createdAt?: string = undefined
	public updatedAt?: string = undefined

	public transactionGroup?: TransactionGroupObject = undefined
	public parentTransactionType?: TransactionTypeObject = undefined
	public childrenTransactionTypes?: TransactionTypeObject[] = undefined
	public user?: UserObject = undefined
}

export class TransactionGroupObject extends Translatable {
	public id: string = undefined
	public displayName?: string = undefined
	public image?: string = undefined
	public isMoneyAdd: number = undefined
	public isUserRelated?: string = undefined
	public isTransactionRelated?: string = undefined
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
	public childrenTransactionTypes?: TransactionTypeObject[] = undefined
}

export class UserObject extends Translatable {
	public id?: string = undefined
	public displayName?: string = undefined
	public image?: string = undefined
	public username?: string = undefined
	public role?: string = undefined
	public status?: string = undefined
}

//#endregion Get by ID


//#region Count

export class CountTransactionTypeRequest extends Translatable {
}

export class CountTransactionTypeResponse {
	constructor(
		public total: number,
	) {
	}
}

//#endregion Count


//#region Get List

export class GetTransactionTypeListRequest extends GetListRequestBase {

	@d.optional()
	@d.bigint()
	public readonly userId: string = undefined

	@d.optional()
	@d.array(FIELDS_RULE)
	public readonly fields?: string[] = undefined

	@d.optional()
	@d.array(RELATIONS_RULE)
	public readonly relations?: string[] = undefined
}

export class TransactionTypeListItem extends Translatable {
	public id: string = undefined
	public displayName?: string = undefined
	public image?: string = undefined
	public isMoneyAdd?: number = undefined
	public isUserRelated?: string = undefined
	public isTransactionRelated?: string = undefined
	public transactionGroupId?: string = undefined
	public parentTransactionTypeId?: string = undefined
	public userId?: string = undefined
	public createdAt?: string = undefined
	public updatedAt?: string = undefined

	public transactionGroup?: object = undefined
	public parentTransactionType?: TransactionTypeObject = undefined
	public childrenTransactionTypes?: TransactionTypeObject[] = undefined
	public user?: UserObject = undefined
}

export class GetTransactionTypeListResponse extends DTOListBase<TransactionTypeListItem> {
	public constructor(transactions: object[], total: number) {
		super(TransactionTypeListItem, transactions, total)
	}
}

//#endregion Get List
