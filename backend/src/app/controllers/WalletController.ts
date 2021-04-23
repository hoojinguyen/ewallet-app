/// <reference types="debug" />
// const debug: debug.IDebugger = require('debug')('vdt:ctrl:user')

import { decorators as cd } from '@micro-fleet/common'
import { decorators as wd, RestControllerBase, Response } from '@micro-fleet/web'
import { authorized } from '@micro-fleet/oauth'

import { Types as T } from '../constants/Types'
import * as dto from '../models/dto/wallet'
import { IWalletService } from '../services/WalletService'
import { AuthorizedUser } from '../utils/authorized-user'
import { UserRole } from '../constants/User'

@authorized()
@wd.controller('wallets')
export default class WalletController extends RestControllerBase {

	constructor(
		@cd.inject(T.WALLET_SVC) private _walletSvc: IWalletService,
	) {
		super()
		// debug('TransactionController instantiated')
	}

	/**
	 * GET {prefix}/transactions/:id
	 * @example /api/v1/transactions/123654
	 */
	@wd.GET(':id')
	public async getOne(
		@wd.param('id') id: string,
		@wd.query() query: any,
		@wd.extras('user') user: AuthorizedUser,
		@wd.response() res: Response
	) {
		const isAuthorized = await this._assertValidWalletId(user, id)
		if (!isAuthorized) {
			return this.unauthorized(res)
		}

		const params = dto.GetWalletByIdRequest.from({ id, ...query })
		return this.ok(res, await this._walletSvc.getById(params))
	}

	/**
	 * GET {prefix}/transactions/
	 * @example /api/v1/transactions?date=2019-12-11T07:00:00Z&walletId=123456789&pageIndex=2&pageSize=10
	 */
	@wd.GET('/')
	public async getList(
		@wd.model({
			extractFn: (r) => r.query,
		})
		params: dto.GetWalletListRequest,
		@wd.extras('user') user: AuthorizedUser,
		@wd.response() res: Response
	) {
		const isAuthorized = await this._assertValidWalletId(user, null, params.userId)
		if (!isAuthorized) {
			return this.unauthorized(res)
		}
		return this.ok(res, await this._walletSvc.getList(params))
	}

	/**
	 * POST {prefix}/transactions
	 * @example /api/v1/transactions
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
	@wd.POST('/')
	public async create(
		@wd.model() params: dto.CreateWalletRequest,
		@wd.extras('user') user: AuthorizedUser,
		@wd.response() res: Response
	) {
		const isAuthorized = await this._assertValidWalletId(user, null, params.userId)
		if (!isAuthorized) {
			return this.unauthorized(res)
		}
		return this.ok(res, await this._walletSvc.create(params))
	}

	/**
	 * POST {prefix}/transactions/many
	 * @example /api/v1/transactions/many
	 *
	 * Request body for creating multiple transactions:
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
	// public async createMany(@wd.model(User) transactions: User[], @wd.response() res: Response) {
	// 	// Starts a transaction
	// 	// Making sure all transactions are either created or not created.
	// 	const results = await this._sessionFactory.startSession()
	// 		.pipe((atomicSession: AtomicSession) => {
	// 			return this._userRepo.createMany(transactions, { atomicSession })
	// 		})
	// 		.closePipe()
	// 	return this.created(res, results)
	// }

	/**
	 * PATCH {prefix}/transactions
	 * @example /api/v1/transactions
	 *
	 * {
	 *	id: '123498765',
	 *	name: 'Nemo Doe',
	 * }
	 */
	@wd.PATCH('/')
	public async edit(
		@wd.model({
			isPartial: true,
		}) params: dto.EditWalletRequest,
		@wd.extras('user') user: AuthorizedUser,
		@wd.response() res: Response
	) {
		const isAuthorized = await this._assertValidWalletId(user, params.id)
		if (!isAuthorized) {
			return this.unauthorized(res)
		}
		return this.ok(res, await this._walletSvc.edit(params))
	}

	/**
	 * DELETE {prefix}/transactions/:id
	 * @example /api/v1/transactions/123654
	 */
	@wd.DELETE(':id')
	public async delete(
		@wd.param('id') ids: string,
		@wd.extras('user') user: AuthorizedUser,
		@wd.response() res: Response
	) {
		const isAuthorized = await this._assertValidWalletId(user, ids)
		if (!isAuthorized) {
			return this.unauthorized(res)
		}
		const params = dto.DeleteWalletRequest.from({ ids })
		return this.ok(res, await this._walletSvc.hardDeleteSingle(params))
	}

	private async _assertValidWalletId(user: AuthorizedUser, walletId: string, paramUserId?: string): Promise<boolean> {
		if (user.role === UserRole.ADMIN || user.role === UserRole.SUPERVISOR) {
			return true
		}

		const userId = paramUserId ? paramUserId : await this._walletSvc
			.getById(dto.GetWalletByIdRequest.from({ id: walletId }))
			.then(walletRes => walletRes.userId)
		return userId && user.sub === userId
	}
}
