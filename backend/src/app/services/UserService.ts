import { Maybe, decorators as d, Types as cT, IConfigurationProvider, BusinessInvariantError, SingleId } from '@micro-fleet/common'
import * as p from '@micro-fleet/persistence'
import * as i from '@micro-fleet/id-generator'
import * as nodemailer from 'nodemailer'
import Mail = require('nodemailer/lib/mailer')
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import moment = require('moment-timezone')

import { CustomConfig } from '../constants/Config'
import { Types as T } from '../constants/Types'
import { User } from '../models/domain/User'
import * as dto from '../models/dto/user'
import { IUserRepository } from '../repositories/UserRepository'
import { ManagementServiceBase } from './ManagementServiceBase'
import { AuthorizedUser } from '../utils/authorized-user'
import { Auth } from '@micro-fleet/common/dist/app/setting-keys/auth'
import { UserStatus } from '../constants/User'


/**
 * Provides methods for common CRUD operations
 */
export interface IUserService {

	/**
	 * Counts number of all users by tenant ID
	 */
	count(params: dto.CountUserRequest): Promise<dto.CountUserResponse>

	/**
	 * Creates new user
	 */
	create(params: dto.CreateUserRequest): Promise<dto.CreateUserResponse>

	/**
	 * Modifies some properties of a user (except username and password)
	 */
	edit(params: dto.EditUserRequest): Promise<dto.EditUserResponse>

	/**
	 * Gets a user's details
	 */
	getById(params: dto.GetUserByIdRequest): Promise<dto.GetSingleUserResponse>

	/**
	 * Gets a paged list of users
	 */
	getList(params: dto.GetUserListRequest): Promise<dto.GetUserListResponse>

	/**
	 * Permanently deletes a user and optionally its associated users.
	 */
	hardDeleteSingle(params: dto.DeleteUserRequest): Promise<dto.DeleteUserResponse>

	/**
	 * Permanently deletes many tenants and optionally their associated users.
	 */
	hardDeleteMany(params: dto.DeleteUserRequest): Promise<dto.DeleteUserResponse>

	/**
	 * Report created users in 12 months respectively of the year
	 */
	reportByYear(params: dto.ReportByYearRequest): Promise<dto.ReportByYearResponse>

	/**
	 * Reset password with random string and send it to user email
	 */
	resetPassword(params: dto.ResetPasswordRequest): Promise<dto.ResetPasswordResponse>

	/**
	 * Change current password with new one
	 */
	changePassword(params: dto.ChangePasswordRequest): Promise<dto.ChangePasswordResponse>

	/**
	 * Login
	 */
	login(params: dto.LoginRequest): Promise<dto.LoginResponse>
}


@d.injectable()
export class UserService
	extends ManagementServiceBase<User>
	implements IUserService {

	constructor(
		@d.inject(p.Types.ATOMIC_SESSION_FACTORY) sessionFactory: p.AtomicSessionFactory,
		@d.inject(T.USER_REPO) repo: IUserRepository,
		@d.inject(i.Types.ID_PROVIDER) private _idProvider: i.IIdProvider,
		@d.inject(cT.CONFIG_PROVIDER) private _config: IConfigurationProvider,
	) {
		super(User, repo, sessionFactory)
	}

	private get _repo(): IUserRepository {
		return this.$repo as IUserRepository
	}


	/**
	 * @see IUserService.count
	 */
	public async count(params: dto.CountUserRequest): Promise<dto.CountUserResponse> {
		return new dto.CountUserResponse(
			await this.$repo.countAll()
		)
	}

	//#region Create

	/**
	 * @see IUserService.create
	 */
	public create(params: dto.CreateUserRequest): Promise<dto.CreateUserResponse> {
		return this.$create(params, dto.CreateUserResponse)
			.then(async res => {
				await this._repo.changePasswordHard(res.id, params.password)
				return res
			})
	}

	/**
	 * @override
	 */
	protected async $checkCreateViolation(params: dto.CreateUserRequest): Promise<Maybe<string>> {
		if (await this.$repo.exists({ username: params.username })) {
			return Maybe.Just('USER_EXISTING')
		}
		return Maybe.Nothing()
	}

	//#endregion Create


	//#region Edit

	/**
	 * @see IUserService.edit
	 */
	public async edit(params: dto.EditUserRequest): Promise<dto.EditUserResponse> {
		return this.$edit(params, dto.EditUserResponse)
	}

	/**
	 * @override
	 */
	protected async $checkEditViolation(params: dto.EditUserRequest): Promise<Maybe> {
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Edit


	//#region Delete

	/**
	 * @see IUserService.hardDeleteSingle
	 */
	public async hardDeleteSingle(params: dto.DeleteUserRequest): Promise<dto.DeleteUserResponse> {
		return this.$hardDeleteSingle(
			params,
			dto.DeleteUserResponse,
		)
	}

	/**
	 * @see IUserService.hardDeleteMany
	 */
	public async hardDeleteMany(params: dto.DeleteUserRequest): Promise<dto.DeleteUserResponse> {
		return this.$hardDeleteMany(
			params,
			dto.DeleteUserResponse,
		)
	}

	/**
	 * @override
	 */
	protected $checkDeleteManyViolation(params: dto.DeleteUserRequest): Promise<Maybe> {
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Delete


	//#region Get

	/**
	 * @see IUserService.getById
	 */
	public async getById(params: dto.GetUserByIdRequest): Promise<dto.GetSingleUserResponse> {
		return this.$getById(params, dto.GetSingleUserResponse)
	}

	/**
	 * @see IUserService.getList
	 */
	public async getList(params: dto.GetUserListRequest): Promise<dto.GetUserListResponse> {
		return this.$getList(params, dto.GetUserListResponse)
	}

	//#endregion Get

	//#region Report

	public async reportByYear(params: dto.ReportByYearRequest): Promise<dto.ReportByYearResponse> {
		const { year } = params
		const baseMoment = moment().subtract(moment().get('year') - year, 'year').startOf('year')
		const monthMoments: moment.Moment[] = []
		for (let month = 0; month < 12; month++) {
			// console.log(baseMoment.clone().month(month))
			monthMoments.push(baseMoment.clone().month(month))
		}

		const reportItems = (await Promise.all(
			monthMoments.map(async month => {
				const getByMonthParams = dto.GetUserListRequest.from({
					...params,
					pageSize: Number.MAX_SAFE_INTEGER,
					date: month.clone().utc().format(),
				} as dto.GetUserListRequest)

				return {
					month: month.get('month') + 1,
					data: await this.$getList(getByMonthParams, dto.GetUserListResponse),
				}
			})
		)).map(userListRes => ({ month: userListRes.month, totalCreated: userListRes.data['total'] } as dto.ReportByYearItem))
		return new dto.ReportByYearResponse(reportItems, reportItems.length)
	}

	//#endregion Report


	//#region Password

	public async resetPassword(params: dto.ResetPasswordRequest): Promise<dto.ResetPasswordResponse> {
		const { id, email } = params
		const newPassword = this._idProvider.nextShortId()
		const resetPasswordHardResponse = await this._repo.changePasswordHard(id, newPassword)

		if (!resetPasswordHardResponse) {
			return new dto.ResetPasswordResponse()
		}

		const mailTransporter = this._mailTransporter
		const mailOptions = this._mailOptions(email, '[VÍ ĐIỆN TỬ][RESET MẬT KHẨU]', `<p>Mật khẩu của bạn là ${newPassword}</p>`)
		mailTransporter.sendMail(mailOptions)
		return dto.ResetPasswordResponse.from(resetPasswordHardResponse)
	}

	public async changePassword(params: dto.ChangePasswordRequest): Promise<dto.ChangePasswordResponse> {
		const { id, currentPassword, newPassword } = params
		const userMb = await this._repo.findById(new SingleId(id))
		if (userMb.isNothing) {
			throw new BusinessInvariantError('USER_NOT_EXISTED')
		}

		const user = userMb.value
		const isMatch = await bcrypt.compare(currentPassword, user.password)
		if (!isMatch) {
			throw new BusinessInvariantError('CURRENT_PASSWORD_NOT_MATCH')
		}

		const changePasswordResponse = await this._repo.changePasswordHard(id, newPassword)
		return dto.ChangePasswordResponse.from(changePasswordResponse)
	}

	public async login(params: dto.LoginRequest): Promise<dto.LoginResponse> {
		const { username, password } = params
		const userMb = await this._repo.findByUsername(username)
		if (userMb.isNothing) {
			throw new BusinessInvariantError('USERNAME_NOT_EXISTED')
		}

		const user = userMb.value
		const { id, displayName, image, role, status } = user
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			throw new BusinessInvariantError('USERNAME_OR_PASSWORD_NOT_CORRECT')
		}

		if (user.status === UserStatus.LOCKED || user.status === UserStatus.DELETED) {
			throw new BusinessInvariantError('ACCOUNT_IS_LOCKED_OR_DELETED')
		}

		const authorizedUser: AuthorizedUser = {
			iat: Date.now(),
			iss: this._config.get(Auth.AUTH_ISSUER).value,
			sub: id,
			name: displayName,
			role: role,
		}
		const token = jwt.sign(authorizedUser, this._config.get(Auth.AUTH_KEY_SIGN).value)
		return dto.LoginResponse.from({ token, id, displayName, image, username, role, status })
	}

	protected get _mailTransporter() {
		const service = this._config.get(CustomConfig.EMAIL_SERVICE).value
		const username = this._config.get(CustomConfig.EMAIL_USERNAME).value
		const password = this._config.get(CustomConfig.EMAIL_PASSWORD).value
		return nodemailer.createTransport({
			service,
			auth: { user: username, pass: password },
		})
	}

	protected _mailOptions(toEmail: string, subject: string, htmlContent: string): Mail.Options {
		const username = this._config.get(CustomConfig.EMAIL_USERNAME).value
		const fromEmail = this._config.get(CustomConfig.EMAIL_FROM).tryGetValue(username)
		return {
			from: fromEmail,
			to: toEmail,
			subject,
			html: htmlContent,
		}
	}

	//#endregion Password

}
