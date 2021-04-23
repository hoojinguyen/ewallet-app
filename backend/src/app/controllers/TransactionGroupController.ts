/// <reference types="debug" />
// const debug: debug.IDebugger = require('debug')('vdt:ctrl:user')

import { decorators as cd } from '@micro-fleet/common'
import { decorators as wd, RestControllerBase } from '@micro-fleet/web'
import { authorized } from '@micro-fleet/oauth'

import { Types as T } from '../constants/Types'
import * as dto from '../models/dto/transaction-group'
import { ITransactionGroupService } from '../services/TransactionGroupService'


@authorized()
@wd.controller('transaction-groups')
export default class TransactionGroupController extends RestControllerBase {

	constructor(
		@cd.inject(T.TRANSCTN_GROUP_SVC) private _transactionGroupSvc: ITransactionGroupService,
	) {
		super()
		// debug('TransactionController instantiated')
	}

	/**
	 * GET {prefix}/transactions/:id
	 * @example /api/v1/transactions/123654
	 */
	@wd.GET(':id')
	public getOne(@wd.param('id') id: string, @wd.query() query: any) {
		const params = dto.GetTransactionGroupByIdRequest.from({ id, ...query })
		return this._transactionGroupSvc.getById(params)
	}

	/**
	 * GET {prefix}/transactions/
	 * @example /api/v1/transactions?date=2019-12-11T07:00:00Z&walletId=123456789&pageIndex=2&pageSize=10
	 */
	@wd.GET('/')
	public getList(
		@wd.model({
			extractFn: (r) => r.query,
		})
		params: dto.GetTransactionGroupListRequest,
	) {
		return this._transactionGroupSvc.getList(params)
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
	public async create(@wd.model() params: dto.CreateTransactionGroupRequest) {
		return this._transactionGroupSvc.create(params)
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
	public edit(
		@wd.model({
			isPartial: true,
		}) params: dto.EditTransactionGroupRequest,
	) {
		return this._transactionGroupSvc.edit(params)
	}

	/**
	 * DELETE {prefix}/transactions/:id
	 * @example /api/v1/transactions/123654
	 */
	@wd.DELETE(':id')
	public delete(@wd.param('id') ids: string) {
		const params = dto.DeleteTransactionGroupRequest.from({ ids })
		return this._transactionGroupSvc.hardDeleteSingle(params)
	}
}
