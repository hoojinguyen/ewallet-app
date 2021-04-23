/// <reference types="debug" />
// const debug: debug.IDebugger = require('debug')('vdt:ctrl:user')

import { decorators as cd } from '@micro-fleet/common'
import { decorators as wd, RestControllerBase, Response } from '@micro-fleet/web'
import { authorized } from '@micro-fleet/oauth'

import { Types as T } from '../constants/Types'
import * as dto from '../models/dto/user'
import { IUserService } from '../services/UserService'
import { AuthorizedUser } from '../utils/authorized-user'
import { UserRole } from '../constants/User'


@wd.controller('users')
export default class UserController extends RestControllerBase {

	constructor(
		@cd.inject(T.USER_SVC) private _userSvc: IUserService,
	) {
		super()
		// debug('UserController instantiated')
	}

	@wd.GET('test')
	public test() {
		return { message: 'TEST OK' }
	}

	/**
	 * GET {prefix}/users/:id
	 * @example /api/v1/users/123654
	 */
	@authorized()
	@wd.GET('reportByYear')
	public async reportByYear(
		@wd.query() query: any,
		@wd.extras('user') user: AuthorizedUser,
		@wd.response() res: Response
	) {
		const isAuthorized = await this._assertValidPermission(user, null, true)
		if (!isAuthorized) {
			return this.unauthorized(res)
		}
		const params = dto.ReportByYearRequest.from({ ...query })
		return this.ok(res, await this._userSvc.reportByYear(params))
	}

	/**
	 * GET {prefix}/users/:id
	 * @example /api/v1/users/123654
	 */
	@authorized()
	@wd.GET(':id')
	public async getOne(
		@wd.param('id') id: string,
		@wd.query() query: any,
		@wd.extras('user') user: AuthorizedUser,
		@wd.response() res: Response
	) {
		const isAuthorized = await this._assertValidPermission(user, id)
		if (!isAuthorized) {
			return this.unauthorized(res)
		}
		const params = dto.GetUserByIdRequest.from({ id, ...query })
		return this.ok(res, await this._userSvc.getById(params))
	}

	/**
	 * GET {prefix}/users/
	 * @example /api/v1/users?pageIndex=2&pageSize=10
	 */
	@authorized()
	@wd.GET('/')
	public async getList(
		@wd.model({
			extractFn: (r) => r.query,
		})
		params: dto.GetUserListRequest,
		@wd.extras('user') user: AuthorizedUser,
		@wd.response() res: Response
	) {
		const isAuthorized = await this._assertValidPermission(user, null, true)
		if (!isAuthorized) {
			return this.unauthorized(res)
		}
		return this.ok(res, await this._userSvc.getList(params))
	}

	/**
	 * POST {prefix}/users
	 * @example /api/v1/users
	 *
	 * Request body for creating a single user:
	 * {
	 *	name: 'John Nemo',
	 * }
	 *
	 * or
	 *
	 * {
	 *	name: 'John Nemo',
	 *	status: 'active',
	 * }
	 */
	@authorized()
	@wd.POST('/')
	public async create(
		@wd.model() params: dto.CreateUserRequest,
		@wd.extras('user') user: AuthorizedUser,
		@wd.response() res: Response
	) {
		const isAuthorized = await this._assertValidPermission(user, null, true)
		if (!isAuthorized) {
			return this.unauthorized(res)
		}
		return this.ok(res, await this._userSvc.create(params))
	}

	/**
	 * POST {prefix}/users/many
	 * @example /api/v1/users/many
	 *
	 * Request body for creating multiple users:
	 * [
	 *   {
	 *	  name: 'John Nemo',
	 *   },
	 *   {
	 *	  name: 'Capt. Doe',
	 *	  status: 'active',
	 *   }
	 * ]
	 */
	// @wd.POST('/many')
	// public async createMany(@wd.model(User) users: User[], @wd.response() res: Response) {
	// 	// Starts a transaction
	// 	// Making sure all users are either created or not created.
	// 	const results = await this._sessionFactory.startSession()
	// 		.pipe((atomicSession: AtomicSession) => {
	// 			return this._userRepo.createMany(users, { atomicSession })
	// 		})
	// 		.closePipe()
	// 	return this.created(res, results)
	// }

	/**
	 * PATCH {prefix}/users
	 * @example /api/v1/users
	 *
	 * {
	 *	id: '123498765',
	 *	name: 'Nemo Doe',
	 * }
	 */
	@authorized()
	@wd.PATCH('/')
	public async edit(
		@wd.model({
			isPartial: true,
		})
		params: dto.EditUserRequest,
		@wd.extras('user') user: AuthorizedUser,
		@wd.response() res: Response
	) {
		const isAuthorized = await this._assertValidPermission(user, params.id)
		if (!isAuthorized) {
			return this.unauthorized(res)
		}
		return this.ok(res, await this._userSvc.edit(params))
	}

	/**
	 * DELETE {prefix}/users/:id
	 * @example /api/v1/users/123654
	 */
	@authorized()
	@wd.DELETE(':id')
	public async delete(
		@wd.param('id') ids: string,
		@wd.extras('user') user: AuthorizedUser,
		@wd.response() res: Response
	) {
		const isAuthorized = await this._assertValidPermission(user, ids)
		if (!isAuthorized) {
			return this.unauthorized(res)
		}
		const params = dto.DeleteUserRequest.from({ ids })
		return this.ok(res, await this._userSvc.hardDeleteSingle(params))
	}

	/**
	 * POST {prefix}/users/:id/resetPassword
	 * @example /api/v1/users/123654/resetPassword
	 */
	@wd.POST(':id/resetPassword')
	public resetPassword(
		@wd.model({
			extractFn: (request) => {
				const { params: { id }, body: { email } } = request
				return dto.ResetPasswordRequest.from({ id, email })
			},
			ItemClass: dto.ResetPasswordRequest,
		}) params: dto.ResetPasswordRequest,
	) {
		return this._userSvc.resetPassword(params)
	}

	/**
	 * POST {prefix}/users/:id/changePassword
	 * @example /api/v1/users/123654/changePassword
	 */
	@authorized()
	@wd.POST(':id/changePassword')
	public async changePassword(
		@wd.model({
			extractFn: (request) => {
				const { params: { id }, body: { currentPassword, newPassword } } = request
				return dto.ChangePasswordRequest.from({ id, currentPassword, newPassword })
			},
			ItemClass: dto.ChangePasswordRequest,
		}) params: dto.ChangePasswordRequest,
		@wd.extras('user') user: AuthorizedUser,
		@wd.response() res: Response
	) {
		const isAuthorized = await this._assertValidPermission(user, params.id)
		if (!isAuthorized) {
			return this.unauthorized(res)
		}
		return this.ok(res, await this._userSvc.changePassword(params))
	}

	@wd.POST('login')
	public login(
		@wd.model() params: dto.LoginRequest
	) {
		return this._userSvc.login(params)
	}

	@wd.POST('signIn')
	public signIn(
		@wd.model() params: dto.SignInRequest
	) {
		const modifiedParams = {
			...params,
			role: UserRole.GUEST,
		} as dto.SignInRequest
		return this._userSvc.create(modifiedParams)
			.then(() => {
				return this._userSvc.login(dto.LoginRequest.from({ username: params.username, password: params.password }))
			})
	}

	private async _assertValidPermission(user: AuthorizedUser, userId: string, isStaffRequired: boolean = false): Promise<boolean> {
		return ((user.role === UserRole.ADMIN || user.role === UserRole.SUPERVISOR) || (!isStaffRequired && (userId && user.sub === userId)))
	}
}
