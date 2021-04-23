import { Maybe, decorators as d } from '@micro-fleet/common'
import * as p from '@micro-fleet/persistence'
// import { AtomicSessionFactory, Types as pT } from '@micro-fleet/persistence'

import { IWalletTypeRepository } from '../repositories/WalletTypeRepository'
import { WalletType } from '../models/domain/WalletType'
import * as dto from '../models/dto/wallet-type'
import { Types as T } from '../constants/Types'
import { ManagementServiceBase } from './ManagementServiceBase'


/**
 * Provides methods for common CRUD operations
 */
export interface IWalletTypeService {

	/**
	 * Counts number of all users by tenant ID
	 */
	count(params: dto.CountWalletTypeRequest): Promise<dto.CountWalletTypeResponse>

	/**
	 * Creates new user
	 */
	create(params: dto.CreateWalletTypeRequest): Promise<dto.CreateWalletTypeResponse>

	/**
	 * Modifies some properties of a user (except username and password)
	 */
	edit(params: dto.EditWalletTypeRequest): Promise<dto.EditWalletTypeResponse>

	/**
	 * Gets a user's details
	 */
	getById(params: dto.GetWalletTypeByIdRequest): Promise<dto.GetSingleWalletTypeResponse>

	/**
	 * Gets a paged list of users
	 */
	getList(params: dto.GetWalletTypeListRequest): Promise<dto.GetWalletTypeListResponse>

	/**
	 * Permanently deletes a user and optionally its associated users.
	 */
	hardDeleteSingle(params: dto.DeleteWalletTypeRequest): Promise<dto.DeleteWalletTypeResponse>

	/**
	 * Permanently deletes many tenants and optionally their associated users.
	 */
	hardDeleteMany(params: dto.DeleteWalletTypeRequest): Promise<dto.DeleteWalletTypeResponse>
}


@d.injectable()
export class WalletTypeService
	extends ManagementServiceBase<WalletType>
	implements IWalletTypeService {

	constructor(
		@d.inject(p.Types.ATOMIC_SESSION_FACTORY) sessionFactory: p.AtomicSessionFactory,
		@d.inject(T.WALLET_TYPE_REPO) repo: IWalletTypeRepository,
	) {
		super(WalletType, repo, sessionFactory)
	}


	/**
	 * @see IWalletTypeService.count
	 */
	public async count(params: dto.CountWalletTypeRequest): Promise<dto.CountWalletTypeResponse> {
		return new dto.CountWalletTypeResponse(
			await this.$repo.countAll()
		)
	}

	//#region Create

	/**
	 * @see IWalletTypeService.create
	 */
	public create(params: dto.CreateWalletTypeRequest): Promise<dto.CreateWalletTypeResponse> {
		return this.$create(params, dto.CreateWalletTypeResponse)
	}

	/**
	 * @override
	 */
	protected async $checkCreateViolation(params: dto.CreateWalletTypeRequest): Promise<Maybe<string>> {
		// if (await this.$repo.exists({ username: params.username })) {
		// 	return Maybe.Just('USER_EXISTING')
		// }
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Create


	//#region Edit

	/**
	 * @see IWalletTypeService.edit
	 */
	public async edit(params: dto.EditWalletTypeRequest): Promise<dto.EditWalletTypeResponse> {
		return this.$edit(params, dto.EditWalletTypeResponse)
	}

	/**
	 * @override
	 */
	protected async $checkEditViolation(params: dto.EditWalletTypeRequest): Promise<Maybe> {
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Edit


	//#region Delete

	/**
	 * @see IWalletTypeService.hardDeleteSingle
	 */
	public async hardDeleteSingle(params: dto.DeleteWalletTypeRequest): Promise<dto.DeleteWalletTypeResponse> {
		return this.$hardDeleteSingle(
			params,
			dto.DeleteWalletTypeResponse,
		)
	}

	/**
	 * @see IWalletTypeService.hardDeleteMany
	 */
	public async hardDeleteMany(params: dto.DeleteWalletTypeRequest): Promise<dto.DeleteWalletTypeResponse> {
		return this.$hardDeleteMany(
			params,
			dto.DeleteWalletTypeResponse,
		)
	}

	/**
	 * @override
	 */
	protected $checkDeleteManyViolation(params: dto.DeleteWalletTypeRequest): Promise<Maybe> {
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Delete


	//#region Get

	/**
	 * @see IWalletTypeService.getById
	 */
	public async getById(params: dto.GetWalletTypeByIdRequest): Promise<dto.GetSingleWalletTypeResponse> {
		return this.$getById(params, dto.GetSingleWalletTypeResponse)
	}

	/**
	 * @see IWalletTypeService.getList
	 */
	public async getList(params: dto.GetWalletTypeListRequest): Promise<dto.GetWalletTypeListResponse> {
		return this.$getList(params, dto.GetWalletTypeListResponse)
	}

	//#endregion Get

}
