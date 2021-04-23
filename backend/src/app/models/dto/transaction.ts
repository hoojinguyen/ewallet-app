import * as joi from '@hapi/joi'

import { Translatable, decorators as d } from '@micro-fleet/common'

import { ResultResponse, MaybeResponse, GetListRequestBase, DTOListBase } from './dto-base'
import { WalletStatus } from '../../constants/Wallet'


const TRANSACTION_FIELDS = [
	'id', 'transactionTypeId', 'money', 'description', 'walletId',
	'parentTransactionId', 'relatedUserId', 'relatedUserName',
	'attributes', 'createdAt', 'updatedAt',
]
const FIELDS_RULE = { items: joi.string().valid(...TRANSACTION_FIELDS) }

const TRANSACTION_RELATIONS_PATTERN = /(transactionType|wallet|parentTransaction|childrenTransaction|relatedUser).*/
const RELATIONS_RULE = { items: joi.string().regex(TRANSACTION_RELATIONS_PATTERN).min(1) }


//#region Create

export class CreateTransactionRequest extends Translatable {

	@d.required()
	@d.bigint()
	public readonly transactionTypeId: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it

	@d.required()
	@d.number()
	public readonly money: number = undefined

	@d.optional()
	@d.number()
	@d.defaultAs(0)
	public readonly moneyPaid?: number = undefined

	@d.optional()
	@d.number()
	@d.defaultAs(0)
	public readonly moneyRemain?: number = undefined

	@d.optional()
	@d.string()
	public readonly description?: string = undefined

	@d.required()
	@d.bigint()
	public readonly walletId: string = undefined

	@d.optional()
	@d.bigint()
	public readonly parentTransactionId?: string = undefined

	@d.optional()
	@d.bigint()
	public readonly relatedUserId?: string = undefined

	@d.optional()
	@d.string()
	public readonly relatedUserName?: string = undefined

	@d.optional()
	@d.validateProp(joi.object())
	public readonly attributes: object = undefined

}

export class CreateTransactionResponse extends ResultResponse {
	public id: string = undefined
	public createdAt: string = undefined
}

//#endregion Create


//#region Delete

export class DeleteTransactionRequest extends Translatable {

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

export class DeleteTransactionResponse extends ResultResponse {
	public deletedAt: string = undefined
}

//#endregion Delete


//#region Edit

export class EditTransactionRequest extends Translatable {

	@d.required()
	@d.bigint()
	public readonly id: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it

	@d.optional()
	@d.number()
	public readonly money: number = undefined

	@d.optional()
	@d.string()
	public readonly description?: string = undefined

	@d.optional()
	@d.number()
	public readonly moneyPaid?: number = undefined

	@d.optional()
	@d.number()
	public readonly moneyRemain?: number = undefined

	@d.optional()
	@d.bigint()
	public readonly walletId: string = undefined

	@d.optional()
	@d.bigint()
	public readonly relatedUserId?: string = undefined

	@d.optional()
	@d.string()
	public readonly relatedUserName?: string = undefined

	@d.optional()
	@d.validateProp(joi.object())
	public readonly attributes: object = undefined
}

export class EditTransactionResponse extends ResultResponse {
	public updatedAt: string = undefined
}

//#endregion Edit


//#region Get by ID

export class GetTransactionByIdRequest extends Translatable {
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

export class GetSingleTransactionResponse extends MaybeResponse {

	public id: string = undefined
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
	public createdAt?: string = undefined
	public updatedAt?: string = undefined

	public transactionType?: TransactionTypeObject = undefined
	public wallet?: WalletObject = undefined
	public parentTransaction?: TransactionObject = undefined
	public childrenTransaction?: TransactionObject[] = undefined
	public relatedUser?: UserObject = undefined
}

export class WalletObject extends Translatable {
	public id?: string = undefined
	public displayName?: string = undefined
	public accountBalance?: number = undefined
	public userId?: string = undefined
	public walletTypeId?: string = undefined
	public creditCardSeries?: string = undefined
	public status?: WalletStatus = undefined
}

export class TransactionObject extends Translatable {
	public id: string = undefined
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

	public parentTransaction?: TransactionObject = undefined
	public childrenTransaction?: TransactionObject[] = undefined
}

export class TransactionTypeObject extends Translatable {
	public id: string = undefined
	public displayName?: string = undefined
	public isMoneyAdd: boolean = undefined
	public isUserRelated?: boolean = undefined
	public isTransactionRelated?: boolean = undefined
	public transactionGroupId?: string = undefined
	public parentTransactionTypeId?: string = undefined
	public userId?: string = undefined
}

export class UserObject extends Translatable {
	public id?: string = undefined
	public displayName?: string = undefined
	public imageUrl?: string = undefined
	public username?: string = undefined
	public role?: string = undefined
	public status?: string = undefined
}
//#endregion Get by ID


//#region Count

export class CountTransactionRequest extends Translatable {
}

export class CountTransactionResponse {
	constructor(
		public total: number,
	) {
	}
}

//#endregion Count


//#region Get List

export class GetTransactionListByDateRequest extends GetListRequestBase {

	@d.optional()
	@d.dateString({ isUTC: true })
	public readonly date?: string = undefined

	@d.optional()
	@d.bigint()
	public readonly walletId: string = undefined

	@d.optional()
	@d.boolean()
	@d.defaultAs(false)
	public readonly byMonth?: boolean = undefined

	@d.optional()
	@d.bigint()
	public readonly transactionTypeId?: string = undefined

	@d.optional()
	@d.array(FIELDS_RULE)
	public readonly fields?: string[] = undefined

	@d.optional()
	@d.array(RELATIONS_RULE)
	public readonly relations?: string[] = undefined
}

export class GetTransactionDebtListRequest extends GetListRequestBase {

	@d.optional()
	@d.bigint()
	public readonly walletId: string = undefined

	@d.optional()
	@d.array(FIELDS_RULE)
	public readonly fields?: string[] = undefined

	@d.optional()
	@d.array(RELATIONS_RULE)
	public readonly relations?: string[] = undefined
}

export class GetTransactionLendListRequest extends GetTransactionDebtListRequest {}

export class TransactionListItem extends Translatable {

	public id: string = undefined
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
	public createdAt?: string = undefined
	public updatedAt?: string = undefined

	public transactionType?: TransactionTypeObject = undefined
	public wallet?: WalletObject = undefined
	public parentTransaction?: TransactionObject = undefined
	public childrenTransaction?: TransactionObject[] = undefined
	public relatedUser?: UserObject = undefined
}

export class GetTransactionListByDateResponse extends DTOListBase<TransactionListItem> {
	public constructor(transactions: object[], total: number) {
		super(TransactionListItem, transactions, total)
	}
}

//#endregion Get List


//#region Report

export class ReportTotalByMonthRequest extends GetListRequestBase {

	@d.optional()
	@d.dateString({ isUTC: true })
	public readonly date?: string = undefined

	@d.optional()
	@d.bigint()
	public readonly walletId: string = undefined

	@d.optional()
	@d.boolean()
	@d.defaultAs(false)
	public readonly isMoneyAdd: boolean = undefined
}

export class ReportTotalByMonthResponse extends Translatable {
	public totalMoney: number = undefined
}

export class ReportByTransactionTypesRequest extends GetListRequestBase {

	@d.optional()
	@d.dateString({ isUTC: true })
	public readonly date?: string = undefined

	@d.optional()
	@d.bigint()
	public readonly walletId: string = undefined

	@d.optional()
	@d.boolean()
	@d.defaultAs(false)
	public readonly isMoneyAdd: boolean = undefined

	@d.optional()
	@d.bigint()
	public readonly transactionTypeId?: string = undefined
}

export class ReportByTransactionTypesItem extends Translatable {
	public transactionType: TransactionTypeObject = undefined
	public totalMoney: number = undefined
}

export class ReportByTransactionTypesResponse extends DTOListBase<ReportByTransactionTypesItem> {
	public constructor(reportItems: object[], total: number) {
		super(ReportByTransactionTypesItem, reportItems, total)
	}
}

export class ReportByYearRequest extends GetListRequestBase {

	@d.optional()
	@d.number()
	public readonly year?: number = undefined
}

export class ReportByYearItem extends Translatable {
	public month?: number = undefined
	public totalCreated?: number = undefined
}

export class ReportByYearResponse extends DTOListBase<ReportByYearItem> {
	public constructor(reportItems: object[], total: number) {
		super(ReportByYearItem, reportItems, total)
	}
}

//#endregion Report
