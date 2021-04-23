/// <reference types="debug" />
// const debug: debug.IDebugger = require('debug')('vdt:ctrl:user')

import { decorators as cd } from '@micro-fleet/common'
import { authorized } from '@micro-fleet/oauth'
import { decorators as wd, RestControllerBase, Response } from '@micro-fleet/web'

import { Types as T } from '../constants/Types'
import * as dto from '../models/dto/transaction'
import * as wdto from '../models/dto/wallet'
import { ITransactionService } from '../services/TransactionService'
import { IWalletService } from '../services/WalletService'
import { AuthorizedUser } from '../utils/authorized-user'
import { UserRole } from '../constants/User'


@authorized()
@wd.controller('transactions')
export default class TransactionController extends RestControllerBase {

	constructor(
		@cd.inject(T.TRANSCTN_SVC) private _transactionSvc: ITransactionService,
		@cd.inject(T.WALLET_SVC) private _walletSvc: IWalletService,
	) {
		super()
		// debug('TransactionController instantiated')
	}

	/**
	 * GET {prefix}/transactions/reportTotalByMonth
	 * @example /api/v1/transactions/reportTotalByMonth
	 */
	@wd.GET('reportTotalByMonth')
	public async reportTotalByMonth(
		@wd.query('date') date: string,
		@wd.query('walletId') walletId: string,
		@wd.query('isMoneyAdd') isMoneyAdd: boolean,
		@wd.extras('user') user: AuthorizedUser,
		@wd.response() res: Response
	) {
		const isAuthorized = await this._assertValidWalletId(user, walletId)
		if (!isAuthorized) {
			return this.unauthorized(res)
		}

		const params = dto.ReportTotalByMonthRequest.from({ date, walletId, isMoneyAdd })
		return this.ok(res, await this._transactionSvc.reportTotalByMonth(params))
	}

	/**
	 * GET {prefix}/transactions/reportByTransactionTypes
	 * @example /api/v1/transactions/reportByTransactionTypes
	 */
	@wd.GET('reportByTransactionTypes')
	public async reportByTransactionTypes(
		@wd.query('date') date: string,
		@wd.query('walletId') walletId: string,
		@wd.query('isMoneyAdd') isMoneyAdd: boolean,
		@wd.extras('user') user: AuthorizedUser,
		@wd.response() res: Response
	) {
		const isAuthorized = await this._assertValidWalletId(user, walletId)
		if (!isAuthorized) {
			return this.unauthorized(res)
		}

		const params = dto.ReportByTransactionTypesRequest.from({ date, walletId, isMoneyAdd })
		return this.ok(res, await this._transactionSvc.reportByTransactionTypes(params))
	}

	/**
	 * GET {prefix}/transactions/:id
	 * @example /api/v1/transactions/123654
	 */
	@wd.GET('reportByYear')
	public async reportByYear(
		@wd.query() query: any,
		@wd.query('walletId') walletId: string,
		@wd.extras('user') user: AuthorizedUser,
		@wd.response() res: Response
	) {
		const isAuthorized = await this._assertValidWalletId(user, walletId)
		if (!isAuthorized) {
			return this.unauthorized(res)
		}

		const params = dto.ReportByYearRequest.from({ ...query })
		return this.ok(res, await this._transactionSvc.reportByYear(params))
	}

	/**
	 * GET {prefix}/transactions/debt-list
	 * @example /api/v1/transactions/debt-list?walletId=123456789&pageIndex=2&pageSize=10
	 */
	@wd.GET('debt-list')
	public async getDebtList(
		@wd.model({
			extractFn: (r) => r.query,
		})
		params: dto.GetTransactionDebtListRequest,
		@wd.extras('user') user: AuthorizedUser,
		@wd.response() res: Response
	) {
		const isAuthorized = await this._assertValidWalletId(user, params.walletId)
		if (!isAuthorized) {
			return this.unauthorized(res)
		}
		return this.ok(res, await this._transactionSvc.getDebtList(params))
	}

	/**
	 * GET {prefix}/transactions/lend-list
	 * @example /api/v1/transactions/lend-list?walletId=123456789&pageIndex=2&pageSize=10
	 */
	@wd.GET('lend-list')
	public async getLendList(
		@wd.model({
			extractFn: (r) => r.query,
		})
		params: dto.GetTransactionLendListRequest,
		@wd.extras('user') user: AuthorizedUser,
		@wd.response() res: Response
	) {
		const isAuthorized = await this._assertValidWalletId(user, params.walletId)
		if (!isAuthorized) {
			return this.unauthorized(res)
		}
		return this.ok(res, await this._transactionSvc.getLendList(params))
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
		const params = dto.GetTransactionByIdRequest.from({ id, ...query })
		const result = await this._transactionSvc.getById(params)
		const isAuthorized = await this._assertValidWalletId(user, result.walletId)
		if (!isAuthorized) {
			return this.unauthorized(res)
		}
		return this.ok(res, result)
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
		params: dto.GetTransactionListByDateRequest,
		@wd.extras('user') user: AuthorizedUser,
		@wd.response() res: Response
	) {
		const isAuthorized = await this._assertValidWalletId(user, params.walletId)
		if (!isAuthorized) {
			return this.unauthorized(res)
		}
		return this.ok(res, await this._transactionSvc.getList(params))
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
		@wd.model() params: dto.CreateTransactionRequest,
		@wd.extras('user') user: AuthorizedUser,
		@wd.response() res: Response
	) {
		const isAuthorized = await this._assertValidWalletId(user, params.walletId)
		if (!isAuthorized) {
			return this.unauthorized(res)
		}
		return this.ok(res, await this._transactionSvc.create(params))
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
		}) params: dto.EditTransactionRequest,
		@wd.extras('user') user: AuthorizedUser,
		@wd.response() res: Response
	) {
		const result = await this._transactionSvc.getById(dto.GetTransactionByIdRequest.from({ id: params.id }))
		const isAuthorized = await this._assertValidWalletId(user, result.walletId)
		if (!isAuthorized) {
			return this.unauthorized(res)
		}
		return this.ok(res, await this._transactionSvc.edit(params))
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
		const params = dto.DeleteTransactionRequest.from({ ids })
		const result = await this._transactionSvc.getById(dto.GetTransactionByIdRequest.from({ id: ids }))
		const isAuthorized = await this._assertValidWalletId(user, result.walletId)
		if (!isAuthorized) {
			return this.unauthorized(res)
		}
		return this.ok(res, await this._transactionSvc.hardDeleteSingle(params))
	}

	private async _assertValidWalletId(user: AuthorizedUser, walletId: string): Promise<boolean> {
		if (user.role === UserRole.ADMIN || user.role === UserRole.SUPERVISOR) {
			return true
		}

		const userId = await this._walletSvc.getById(wdto.GetWalletByIdRequest.from({ id: walletId || 0 }))
			.then(walletRes => walletRes.userId)
		return userId && user.sub === userId
	}
}
