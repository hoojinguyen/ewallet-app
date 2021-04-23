import { Maybe, decorators as d } from '@micro-fleet/common'
import * as p from '@micro-fleet/persistence'
import moment = require('moment-timezone')

import { ITransactionRepository, ITransactionRepositoryPageMinOptions } from '../repositories/TransactionRepository'
import { Transaction } from '../models/domain/Transaction'
import * as dto from '../models/dto/transaction'
import * as wdto from '../models/dto/wallet'
import { Types as T } from '../constants/Types'
import { ManagementServiceBase } from './ManagementServiceBase'
import { IWalletService } from './WalletService'


/**
 * Provides methods for common CRUD operations
 */
export interface ITransactionService {

	/**
	 * Counts number of all users by tenant ID
	 */
	count(params: dto.CountTransactionRequest): Promise<dto.CountTransactionResponse>

	/**
	 * Creates new user
	 */
	create(params: dto.CreateTransactionRequest): Promise<dto.CreateTransactionResponse>

	/**
	 * Modifies some properties of a user (except username and password)
	 */
	edit(params: dto.EditTransactionRequest): Promise<dto.EditTransactionResponse>

	/**
	 * Gets a user's details
	 */
	getById(params: dto.GetTransactionByIdRequest): Promise<dto.GetSingleTransactionResponse>

	/**
	 * Gets a paged list of users
	 */
	getList(params: dto.GetTransactionListByDateRequest): Promise<dto.GetTransactionListByDateResponse>

	/**
	 * Gets a paged debt list of users
	 */
	getDebtList(params: dto.GetTransactionDebtListRequest): Promise<dto.GetTransactionListByDateResponse>

	/**
	 * Gets a paged lend list of users
	 */
	getLendList(params: dto.GetTransactionLendListRequest): Promise<dto.GetTransactionListByDateResponse>

	/**
	 * Permanently deletes a user and optionally its associated users.
	 */
	hardDeleteSingle(params: dto.DeleteTransactionRequest): Promise<dto.DeleteTransactionResponse>

	/**
	 * Permanently deletes many tenants and optionally their associated users.
	 */
	hardDeleteMany(params: dto.DeleteTransactionRequest): Promise<dto.DeleteTransactionResponse>

	/**
	 * Report total money spent by month.
	 */
	reportTotalByMonth(params: dto.ReportTotalByMonthRequest): Promise<dto.ReportTotalByMonthResponse>

	/**
	 * Report total money spent base on transaction type by month.
	 */
	reportByTransactionTypes(params: dto.ReportByTransactionTypesRequest): Promise<dto.ReportByTransactionTypesResponse>

	/**
	 * Report total transactions created by months respectivly of a year
	 */
	reportByYear(params: dto.ReportByYearRequest): Promise<dto.ReportByYearResponse>
}


@d.injectable()
export class TransactionService
	extends ManagementServiceBase<Transaction>
	implements ITransactionService {

	constructor(
		@d.inject(p.Types.ATOMIC_SESSION_FACTORY) sessionFactory: p.AtomicSessionFactory,
		@d.inject(T.TRANSCTN_REPO) repo: ITransactionRepository,
		@d.inject(T.WALLET_SVC) private readonly _walletSvc: IWalletService,
	) {
		super(Transaction, repo, sessionFactory)
	}

	protected get _repo() {
		return this.$repo as ITransactionRepository
	}


	/**
	 * @see ITransactionService.count
	 */
	public async count(params: dto.CountTransactionRequest): Promise<dto.CountTransactionResponse> {
		return new dto.CountTransactionResponse(
			await this.$repo.countAll()
		)
	}

	//#region Create

	/**
	 * @see ITransactionService.create
	 */
	public create(params: dto.CreateTransactionRequest): Promise<dto.CreateTransactionResponse> {
		return this.$create(params, dto.CreateTransactionResponse)
			.then(async res => {
				const { transactionType } = await this.getById(dto.GetTransactionByIdRequest.from({
					id: res.id, relations: ['transactionType.transactionGroup'],
				}))
				const isMoneyAdd = transactionType.isMoneyAdd !== null && transactionType.isMoneyAdd !== undefined
					? transactionType.isMoneyAdd
					: transactionType['transactionGroup'].isMoneyAdd

				const wallet = await this._walletSvc.getById(wdto.GetWalletByIdRequest.from({ id: params.walletId }))
				const { id, accountBalance } = wallet


				const updateWalletParams = wdto.EditWalletRequest.from({
					id,
					accountBalance: isMoneyAdd ? accountBalance + params.money : accountBalance - params.money,
				})
				await this._walletSvc.edit(updateWalletParams)
				return res
			})
	}

	/**
	 * @override
	 */
	protected async $checkCreateViolation(params: dto.CreateTransactionRequest): Promise<Maybe<string>> {
		// if (await this.$repo.exists({ username: params.username })) {
		// 	return Maybe.Just('USER_EXISTING')
		// }
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Create


	//#region Edit

	/**
	 * @see ITransactionService.edit
	 */
	public async edit(params: dto.EditTransactionRequest): Promise<dto.EditTransactionResponse> {
		const { transactionType, money: oldMoneyState, walletId } = await this.getById(dto.GetTransactionByIdRequest.from({
			id: params.id, relations: ['transactionType.transactionGroup'],
		}))
		return this.$edit(params, dto.EditTransactionResponse)
			.then(async res => {
				if (params.money && params.money !== oldMoneyState) {
					const moneyDelta = params.money - oldMoneyState
					const isMoneyAdd = transactionType.isMoneyAdd !== null && transactionType.isMoneyAdd !== undefined
						? transactionType.isMoneyAdd
						: transactionType['transactionGroup'].isMoneyAdd

					const wallet = await this._walletSvc.getById(wdto.GetWalletByIdRequest.from({ id: walletId }))
					const { id, accountBalance } = wallet
					const updateWalletParams = wdto.EditWalletRequest.from({
						id,
						accountBalance: isMoneyAdd ? accountBalance + moneyDelta : accountBalance - moneyDelta,
					})
					await this._walletSvc.edit(updateWalletParams)
				}
				return res
			})
	}

	/**
	 * @override
	 */
	protected async $checkEditViolation(params: dto.EditTransactionRequest): Promise<Maybe> {
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Edit


	//#region Delete

	/**
	 * @see ITransactionService.hardDeleteSingle
	 */
	public async hardDeleteSingle(params: dto.DeleteTransactionRequest): Promise<dto.DeleteTransactionResponse> {
		const { transactionType, money, walletId } = await this.getById(dto.GetTransactionByIdRequest.from({
			id: params.ids[0], relations: ['transactionType.transactionGroup'],
		}))
		return this.$hardDeleteSingle(
			params,
			dto.DeleteTransactionResponse,
		)
			.then(async res => {
				const isMoneyAdd = transactionType.isMoneyAdd !== null && transactionType.isMoneyAdd !== undefined
					? transactionType.isMoneyAdd
					: transactionType['transactionGroup'].isMoneyAdd

				const wallet = await this._walletSvc.getById(wdto.GetWalletByIdRequest.from({ id: walletId }))
				const { id, accountBalance } = wallet
				const updateWalletParams = wdto.EditWalletRequest.from({
					id,
					accountBalance: isMoneyAdd ? accountBalance - money : accountBalance + money,
				})
				await this._walletSvc.edit(updateWalletParams)
				return res
			})
	}

	/**
	 * @see ITransactionService.hardDeleteMany
	 */
	public async hardDeleteMany(params: dto.DeleteTransactionRequest): Promise<dto.DeleteTransactionResponse> {
		return this.$hardDeleteMany(
			params,
			dto.DeleteTransactionResponse,
		)
	}

	/**
	 * @override
	 */
	protected $checkDeleteManyViolation(params: dto.DeleteTransactionRequest): Promise<Maybe> {
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Delete


	//#region Get

	/**
	 * @see ITransactionService.getById
	 */
	public async getById(params: dto.GetTransactionByIdRequest): Promise<dto.GetSingleTransactionResponse> {
		return this.$getById(params, dto.GetSingleTransactionResponse)
	}

	/**
	 * @see ITransactionService.getList
	 */
	public async getList(params: dto.GetTransactionListByDateRequest): Promise<dto.GetTransactionListByDateResponse> {
		return this.$getList(params, dto.GetTransactionListByDateResponse)
	}

	/**
	 * @see ITransactionService.getDebtList
	 */
	public async getDebtList(params: dto.GetTransactionDebtListRequest): Promise<dto.GetTransactionListByDateResponse> {
		const debtListOpts = {
			...params,
			pageSize: Number.MAX_SAFE_INTEGER,
			relations: this.$objectifyRelations(params.relations),
		} as ITransactionRepositoryPageMinOptions

		const fetchedDomainModels = await this._repo.pageActiveDebtList(debtListOpts)
		if (fetchedDomainModels.length) {
			return dto.GetTransactionListByDateResponse.from(fetchedDomainModels)
		}

		return new dto.GetTransactionListByDateResponse([], 0)
	}

	/**
	 * @see ITransactionService.getLendList
	 */
	public async getLendList(params: dto.GetTransactionLendListRequest): Promise<dto.GetTransactionListByDateResponse> {
		const lendListOpts = {
			...params,
			pageSize: Number.MAX_SAFE_INTEGER,
			relations: this.$objectifyRelations(params.relations),
		} as ITransactionRepositoryPageMinOptions

		const fetchedDomainModels = await this._repo.pageActiveLendList(lendListOpts)
		if (fetchedDomainModels.length) {
			return dto.GetTransactionListByDateResponse.from(fetchedDomainModels)
		}

		return new dto.GetTransactionListByDateResponse([], 0)
	}

	//#endregion Get


	//#region Report

	/**
	 * @see ITransactionService.reportTotalByMonth
	 */
	public async reportTotalByMonth(params: dto.ReportTotalByMonthRequest): Promise<dto.ReportTotalByMonthResponse> {
		const getListParams = dto.GetTransactionListByDateRequest.from({
			pageSize: Number.MAX_SAFE_INTEGER,
			walletId: params.walletId,
			byMonth: true,
			date: params.date,
			fields: ['money'],
			relations: ['transactionType.transactionGroup'],
		} as dto.GetTransactionListByDateRequest)
		const transactionList: dto.GetTransactionListByDateResponse = await this.$getList(getListParams, dto.GetTransactionListByDateResponse)
		return transactionList.items
			.filter(tsc =>
				(tsc.transactionType['transactionGroup']['isMoneyAdd'] || !!tsc.transactionType.isMoneyAdd) === params.isMoneyAdd
			)
			.reduce((prev, cur) => ({ totalMoney: prev.totalMoney + cur.money }), { totalMoney: 0 })
	}

	/**
	 * @see ITransactionService.reportByTransactionType
	 */
	public async reportByTransactionTypes(params: dto.ReportByTransactionTypesRequest): Promise<dto.ReportByTransactionTypesResponse> {
		const getListParams = dto.GetTransactionListByDateRequest.from({
			pageSize: Number.MAX_SAFE_INTEGER,
			walletId: params.walletId,
			byMonth: true,
			date: params.date,
			fields: ['money'],
			relations: ['transactionType.transactionGroup'],
		} as dto.GetTransactionListByDateRequest)
		const transactionList: dto.GetTransactionListByDateResponse = await this.$getList(getListParams, dto.GetTransactionListByDateResponse)
		const listByTransactionType = Object.values<dto.ReportByTransactionTypesItem>(
			transactionList.items
				.filter(tsc => (
					tsc.transactionType['transactionGroup']['isMoneyAdd'] || !!tsc.transactionType.isMoneyAdd) === params.isMoneyAdd
				)
				.reduce((prev, cur) => {
					if (!prev[cur.transactionType.id]) {
						prev[cur.transactionType.id] = {
							transactionType: cur.transactionType,
							totalMoney: cur.money,
						} as dto.ReportByTransactionTypesItem
					}
					else {
						prev[cur.transactionType.id]['totalMoney'] += cur.money
					}

					return prev
				}, {})
		)
		return new dto.ReportByTransactionTypesResponse(listByTransactionType, listByTransactionType.length)
	}

	/**
	 * @see ITransactionService.reportByYear
	 */
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
				const getByMonthParams = dto.GetTransactionListByDateRequest.from({
					...params,
					pageSize: Number.MAX_SAFE_INTEGER,
					date: month.clone().utc().format(),
					byMonth: true,
				} as dto.GetTransactionListByDateRequest)

				return {
					month: month.get('month') + 1,
					data: await this.$getList(getByMonthParams, dto.GetTransactionListByDateResponse),
				}
			})
		)).map(transListRes => ({
			month: transListRes.month,
			totalCreated: transListRes.data['total'],
		} as dto.ReportByYearItem))
		return new dto.ReportByYearResponse(reportItems, reportItems.length)
	}

	//#endregion Report

}
