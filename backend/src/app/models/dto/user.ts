import * as joi from '@hapi/joi'

import { Translatable, decorators as d } from '@micro-fleet/common'

import { UserStatus, UserRole } from '../../constants/User'
import { ResultResponse, MaybeResponse, GetListRequestBase, DTOListBase } from './dto-base'
import { WalletStatus } from '../../constants/Wallet'


const USER_FIELDS = [ 'id', 'displayName', 'image', 'username', 'password', 'role', 'status', 'createdAt', 'updatedAt' ]
const FIELDS_RULE = { items: joi.string().valid(...USER_FIELDS) }

const USER_ROLES = [ UserRole.ADMIN, UserRole.SUPERVISOR, UserRole.GUEST ]
const ROLES_RULE = { items: joi.string().valid(...USER_ROLES) }

const USER_RELATIONS_PATTERN = /(wallets).*/
const RELATIONS_RULE = { items: joi.string().regex(USER_RELATIONS_PATTERN).min(1) }

//#region Create

export class CreateUserRequest extends Translatable {

	@d.required()
	@d.string({ minLength: 3, maxLength: 100 })
	public readonly displayName: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it

	@d.optional()
	@d.string({ uri: true })
	public readonly image?: string = undefined

	@d.required()
	@d.string({ minLength: 5, maxLength: 100 })
	public readonly username: string = undefined

	@d.required()
	@d.string({ minLength: 5, maxLength: 100 })
	public readonly password: string = undefined

	@d.required()
	@d.valid(UserRole.ADMIN, UserRole.SUPERVISOR, UserRole.GUEST)
	public readonly role: string = undefined

	@d.optional()
	@d.valid(UserStatus.ACTIVE, UserStatus.LOCKED, UserStatus.DELETED)
	@d.defaultAs(UserStatus.ACTIVE)
	public readonly status: string = undefined

}

export class CreateUserResponse extends ResultResponse {
	public id: string = undefined
	public createdAt: string = undefined
}

//#endregion Create


//#region Delete

export class DeleteUserRequest extends Translatable {

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

export class DeleteUserResponse extends ResultResponse {
	public deletedAt: string = undefined
}

//#endregion Delete


//#region Edit

export class EditUserRequest extends Translatable {

	@d.required()
	@d.bigint()
	public readonly id: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it

	@d.optional()
	@d.string({ minLength: 3, maxLength: 100 })
	public readonly displayName?: string = undefined

	@d.optional()
	@d.string({ uri: true })
	public readonly image?: string = undefined

	@d.optional()
	@d.valid(UserRole.ADMIN, UserRole.SUPERVISOR, UserRole.GUEST)
	public readonly role?: string = undefined

	@d.optional()
	@d.valid(UserStatus.ACTIVE, UserStatus.LOCKED, UserStatus.DELETED)
	public readonly status?: string = undefined
}

export class EditUserResponse extends ResultResponse {
	public updatedAt: string = undefined
}

//#endregion Edit


//#region Get by ID

export class GetUserByIdRequest extends Translatable {
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

export class GetSingleUserResponse extends MaybeResponse {

	public id: string = undefined
	public displayName?: string = undefined
	public image?: string = undefined
	public username?: string = undefined
	public role?: string = undefined
	public status?: string = undefined
	public createdAt?: string = undefined
	public updatedAt?: string = undefined

	public wallets?: WalletObject = undefined
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
	public createdAt?: string = undefined
	public updatedAt?: string = undefined

	public walletType?: WalletTypeObject = undefined
}

export class WalletTypeObject extends Translatable {
	public id?: string = undefined
	public displayName?: string = undefined
	public isCreditCardConnectable?: boolean = undefined
}
//#endregion Get by ID


//#region Count

export class CountUserRequest extends Translatable {
}

export class CountUserResponse {
	constructor(
		public total: number,
	) {
	}
}

//#endregion Count


//#region Get List

export class GetUserListRequest extends GetListRequestBase {

	@d.optional()
	@d.array(ROLES_RULE)
	public readonly roles?: string[] = undefined

	@d.optional()
	@d.dateString({ isUTC: true })
	public readonly date?: string = undefined

	@d.optional()
	@d.array(FIELDS_RULE)
	public readonly fields?: string[] = undefined

	@d.optional()
	@d.array(RELATIONS_RULE)
	public readonly relations?: string[] = undefined
}

export class UserListItem extends Translatable {

	public id: string = undefined
	public displayName?: string = undefined
	public image?: string = undefined
	public username?: string = undefined
	public role?: string = undefined
	public status?: string = undefined
	public createdAt?: string = undefined
	public updatedAt?: string = undefined

	public wallets?: WalletObject = undefined
}

export class GetUserListResponse extends DTOListBase<UserListItem> {
	public constructor(users: object[], total: number) {
		super(UserListItem, users, total)
	}
}

//#endregion Get List


//#region Report

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


//#region Password

export class ResetPasswordRequest extends Translatable {
	@d.required()
	@d.bigint()
	public readonly id: string = undefined

	@d.required()
	@d.string({ email: true })
	public readonly email: string = undefined
}

export class ResetPasswordResponse extends EditUserResponse { }

export class ChangePasswordRequest extends Translatable {
	@d.required()
	@d.bigint()
	public readonly id: string = undefined

	@d.required()
	@d.string()
	public readonly currentPassword: string = undefined

	@d.required()
	@d.string()
	public readonly newPassword: string = undefined
}

export class ChangePasswordResponse extends EditUserResponse { }

//#endregion Password

//#region Login

export class LoginRequest extends Translatable {
	@d.required()
	@d.string()
	public readonly username: string = undefined

	@d.required()
	@d.string()
	public readonly password: string = undefined
}

export class LoginResponse extends Translatable {
	public token?: string = undefined
	public id?: string = undefined
	public displayName?: string = undefined
	public image?: string = undefined
	public username?: string = undefined
	public role?: string = undefined
	public status?: string = undefined
}

export class SignInRequest extends CreateUserRequest {
}

export class SignInResponse extends LoginResponse {
}

//#endregion Login
