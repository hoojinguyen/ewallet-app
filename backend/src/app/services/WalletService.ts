import { Maybe, decorators as d } from '@micro-fleet/common'
import * as p from '@micro-fleet/persistence'
// import { AtomicSessionFactory, Types as pT } from '@micro-fleet/persistence'

import { IWalletRepository } from '../repositories/WalletRepository'
import { Wallet } from '../models/domain/Wallet'
import * as dto from '../models/dto/wallet'
import { Types as T } from '../constants/Types'
import { ManagementServiceBase } from './ManagementServiceBase'


/**
 * Provides methods for common CRUD operations
 */
export interface IWalletService {

	/**
	 * Counts number of all users by tenant ID
	 */
	count(params: dto.CountWalletRequest): Promise<dto.CountWalletResponse>

	/**
	 * Creates new user
	 */
	create(params: dto.CreateWalletRequest): Promise<dto.CreateWalletResponse>

	/**
	 * Modifies some properties of a user (except username and password)
	 */
	edit(params: dto.EditWalletRequest): Promise<dto.EditWalletResponse>

	/**
	 * Gets a user's details
	 */
	getById(params: dto.GetWalletByIdRequest): Promise<dto.GetSingleWalletResponse>

	/**
	 * Gets a paged list of users
	 */
	getList(params: dto.GetWalletListRequest): Promise<dto.GetWalletListResponse>

	/**
	 * Permanently deletes a user and optionally its associated users.
	 */
	hardDeleteSingle(params: dto.DeleteWalletRequest): Promise<dto.DeleteWalletResponse>

	/**
	 * Permanently deletes many tenants and optionally their associated users.
	 */
	hardDeleteMany(params: dto.DeleteWalletRequest): Promise<dto.DeleteWalletResponse>
}


@d.injectable()
export class WalletService
	extends ManagementServiceBase<Wallet>
	implements IWalletService {

	constructor(
		@d.inject(p.Types.ATOMIC_SESSION_FACTORY) sessionFactory: p.AtomicSessionFactory,
		@d.inject(T.WALLET_REPO) repo: IWalletRepository,
	) {
		super(Wallet, repo, sessionFactory)
	}


	/**
	 * @see IWalletService.count
	 */
	public async count(params: dto.CountWalletRequest): Promise<dto.CountWalletResponse> {
		return new dto.CountWalletResponse(
			await this.$repo.countAll()
		)
	}

	//#region Create

	/**
	 * @see IWalletService.create
	 */
	public create(params: dto.CreateWalletRequest): Promise<dto.CreateWalletResponse> {
		return this.$create(params, dto.CreateWalletResponse)
	}

	/**
	 * @override
	 */
	protected async $checkCreateViolation(params: dto.CreateWalletRequest): Promise<Maybe<string>> {
		// if (await this.$repo.exists({ username: params.username })) {
		// 	return Maybe.Just('USER_EXISTING')
		// }
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Create


	//#region Edit

	/**
	 * @see IWalletService.edit
	 */
	public async edit(params: dto.EditWalletRequest): Promise<dto.EditWalletResponse> {
		return this.$edit(params, dto.EditWalletResponse)
	}

	/**
	 * @override
	 */
	protected async $checkEditViolation(params: dto.EditWalletRequest): Promise<Maybe> {
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Edit


	//#region Delete

	/**
	 * @see IWalletService.hardDeleteSingle
	 */
	public async hardDeleteSingle(params: dto.DeleteWalletRequest): Promise<dto.DeleteWalletResponse> {
		return this.$hardDeleteSingle(
			params,
			dto.DeleteWalletResponse,
		)
	}

	/**
	 * @see IWalletService.hardDeleteMany
	 */
	public async hardDeleteMany(params: dto.DeleteWalletRequest): Promise<dto.DeleteWalletResponse> {
		return this.$hardDeleteMany(
			params,
			dto.DeleteWalletResponse,
		)
	}

	/**
	 * @override
	 */
	protected $checkDeleteManyViolation(params: dto.DeleteWalletRequest): Promise<Maybe> {
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Delete


	//#region Get

	/**
	 * @see IWalletService.getById
	 */
	public async getById(params: dto.GetWalletByIdRequest): Promise<dto.GetSingleWalletResponse> {
		return this.$getById(params, dto.GetSingleWalletResponse)
	}

	/**
	 * @see IWalletService.getList
	 */
	public async getList(params: dto.GetWalletListRequest): Promise<dto.GetWalletListResponse> {
		return this.$getList(params, dto.GetWalletListResponse)
	}

	//#endregion Get

}
