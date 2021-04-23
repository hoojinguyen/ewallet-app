import { Maybe, decorators as d } from '@micro-fleet/common'
import * as p from '@micro-fleet/persistence'
// import { AtomicSessionFactory, Types as pT } from '@micro-fleet/persistence'

import { ITransactionGroupRepository } from '../repositories/TransactionGroupRepository'
import { TransactionGroup } from '../models/domain/TransactionGroup'
import * as dto from '../models/dto/transaction-group'
import { Types as T } from '../constants/Types'
import { ManagementServiceBase } from './ManagementServiceBase'


/**
 * Provides methods for common CRUD operations
 */
export interface ITransactionGroupService {

	/**
	 * Counts number of all users by tenant ID
	 */
	count(params: dto.CountTransactionGroupRequest): Promise<dto.CountTransactionGroupResponse>

	/**
	 * Creates new user
	 */
	create(params: dto.CreateTransactionGroupRequest): Promise<dto.CreateTransactionGroupResponse>

	/**
	 * Modifies some properties of a user (except username and password)
	 */
	edit(params: dto.EditTransactionGroupRequest): Promise<dto.EditTransactionGroupResponse>

	/**
	 * Gets a user's details
	 */
	getById(params: dto.GetTransactionGroupByIdRequest): Promise<dto.GetSingleTransactionGroupResponse>

	/**
	 * Gets a paged list of users
	 */
	getList(params: dto.GetTransactionGroupListRequest): Promise<dto.GetTransactionGroupListResponse>

	/**
	 * Permanently deletes a user and optionally its associated users.
	 */
	hardDeleteSingle(params: dto.DeleteTransactionGroupRequest): Promise<dto.DeleteTransactionGroupResponse>

	/**
	 * Permanently deletes many tenants and optionally their associated users.
	 */
	hardDeleteMany(params: dto.DeleteTransactionGroupRequest): Promise<dto.DeleteTransactionGroupResponse>
}


@d.injectable()
export class TransactionGroupService
	extends ManagementServiceBase<TransactionGroup>
	implements ITransactionGroupService {

	constructor(
		@d.inject(p.Types.ATOMIC_SESSION_FACTORY) sessionFactory: p.AtomicSessionFactory,
		@d.inject(T.TRANSCTN_GROUP_REPO) repo: ITransactionGroupRepository,
	) {
		super(TransactionGroup, repo, sessionFactory)
	}


	/**
	 * @see ITransactionGroupService.count
	 */
	public async count(params: dto.CountTransactionGroupRequest): Promise<dto.CountTransactionGroupResponse> {
		return new dto.CountTransactionGroupResponse(
			await this.$repo.countAll()
		)
	}

	//#region Create

	/**
	 * @see ITransactionGroupService.create
	 */
	public create(params: dto.CreateTransactionGroupRequest): Promise<dto.CreateTransactionGroupResponse> {
		return this.$create(params, dto.CreateTransactionGroupResponse)
	}

	/**
	 * @override
	 */
	protected async $checkCreateViolation(params: dto.CreateTransactionGroupRequest): Promise<Maybe<string>> {
		// if (await this.$repo.exists({ username: params.username })) {
		// 	return Maybe.Just('USER_EXISTING')
		// }
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Create


	//#region Edit

	/**
	 * @see ITransactionGroupService.edit
	 */
	public async edit(params: dto.EditTransactionGroupRequest): Promise<dto.EditTransactionGroupResponse> {
		return this.$edit(params, dto.EditTransactionGroupResponse)
	}

	/**
	 * @override
	 */
	protected async $checkEditViolation(params: dto.EditTransactionGroupRequest): Promise<Maybe> {
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Edit


	//#region Delete

	/**
	 * @see ITransactionGroupService.hardDeleteSingle
	 */
	public async hardDeleteSingle(params: dto.DeleteTransactionGroupRequest): Promise<dto.DeleteTransactionGroupResponse> {
		return this.$hardDeleteSingle(
			params,
			dto.DeleteTransactionGroupResponse,
		)
	}

	/**
	 * @see ITransactionGroupService.hardDeleteMany
	 */
	public async hardDeleteMany(params: dto.DeleteTransactionGroupRequest): Promise<dto.DeleteTransactionGroupResponse> {
		return this.$hardDeleteMany(
			params,
			dto.DeleteTransactionGroupResponse,
		)
	}

	/**
	 * @override
	 */
	protected $checkDeleteManyViolation(params: dto.DeleteTransactionGroupRequest): Promise<Maybe> {
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Delete


	//#region Get

	/**
	 * @see ITransactionGroupService.getById
	 */
	public async getById(params: dto.GetTransactionGroupByIdRequest): Promise<dto.GetSingleTransactionGroupResponse> {
		return this.$getById(params, dto.GetSingleTransactionGroupResponse)
	}

	/**
	 * @see ITransactionGroupService.getList
	 */
	public async getList(params: dto.GetTransactionGroupListRequest): Promise<dto.GetTransactionGroupListResponse> {
		return this.$getList(params, dto.GetTransactionGroupListResponse)
	}

	//#endregion Get

}
