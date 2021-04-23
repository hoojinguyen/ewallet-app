/// <reference types="debug" />
// const debug: debug.IDebugger = require('debug')('vdt:ctrl:user')

import { decorators as cd } from '@micro-fleet/common'
import { decorators as wd, RestControllerBase } from '@micro-fleet/web'
import { authorized } from '@micro-fleet/oauth'

import { Types as T } from '../constants/Types'
import * as dto from '../models/dto/transaction-type'
import { ITransactionTypeService } from '../services/TransactionTypeService'


@authorized()
@wd.controller('transaction-types')
export default class TransactionTypeController extends RestControllerBase {

	constructor(
		@cd.inject(T.TRANSCTN_TYPE_SVC) private _transactionTypeSvc: ITransactionTypeService,
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
		const params = dto.GetTransactionTypeByIdRequest.from({ id, ...query })
		return this._transactionTypeSvc.getById(params)
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
		params: dto.GetTransactionTypeListRequest,
	) {
		return this._transactionTypeSvc.getList(params)
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
	public async create(@wd.model() params: dto.CreateTransactionTypeRequest) {
		return this._transactionTypeSvc.create(params)
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
		}) params: dto.EditTransactionTypeRequest,
	) {
		return this._transactionTypeSvc.edit(params)
	}

	/**
	 * DELETE {prefix}/transactions/:id
	 * @example /api/v1/transactions/123654
	 */
	@wd.DELETE(':id')
	public delete(@wd.param('id') ids: string) {
		const params = dto.DeleteTransactionTypeRequest.from({ ids })
		return this._transactionTypeSvc.hardDeleteSingle(params)
	}
}
