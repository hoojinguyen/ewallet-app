import { Maybe, decorators as d } from '@micro-fleet/common'
import * as p from '@micro-fleet/persistence'
// import { AtomicSessionFactory, Types as pT } from '@micro-fleet/persistence'

import { ITransactionTypeRepository } from '../repositories/TransactionTypeRepository'
import { TransactionType } from '../models/domain/TransactionType'
import * as dto from '../models/dto/transaction-type'
import { Types as T } from '../constants/Types'
import { ManagementServiceBase } from './ManagementServiceBase'


/**
 * Provides methods for common CRUD operations
 */
export interface ITransactionTypeService {

	/**
	 * Counts number of all users by tenant ID
	 */
	count(params: dto.CountTransactionTypeRequest): Promise<dto.CountTransactionTypeResponse>

	/**
	 * Creates new user
	 */
	create(params: dto.CreateTransactionTypeRequest): Promise<dto.CreateTransactionTypeResponse>

	/**
	 * Modifies some properties of a user (except username and password)
	 */
	edit(params: dto.EditTransactionTypeRequest): Promise<dto.EditTransactionTypeResponse>

	/**
	 * Gets a user's details
	 */
	getById(params: dto.GetTransactionTypeByIdRequest): Promise<dto.GetSingleTransactionTypeResponse>

	/**
	 * Gets a paged list of users
	 */
	getList(params: dto.GetTransactionTypeListRequest): Promise<dto.GetTransactionTypeListResponse>

	/**
	 * Permanently deletes a user and optionally its associated users.
	 */
	hardDeleteSingle(params: dto.DeleteTransactionTypeRequest): Promise<dto.DeleteTransactionTypeResponse>

	/**
	 * Permanently deletes many tenants and optionally their associated users.
	 */
	hardDeleteMany(params: dto.DeleteTransactionTypeRequest): Promise<dto.DeleteTransactionTypeResponse>
}


@d.injectable()
export class TransactionTypeService
	extends ManagementServiceBase<TransactionType>
	implements ITransactionTypeService {

	constructor(
		@d.inject(p.Types.ATOMIC_SESSION_FACTORY) sessionFactory: p.AtomicSessionFactory,
		@d.inject(T.TRANSCTN_TYPE_REPO) repo: ITransactionTypeRepository,
	) {
		super(TransactionType, repo, sessionFactory)
	}


	/**
	 * @see ITransactionTypeService.count
	 */
	public async count(params: dto.CountTransactionTypeRequest): Promise<dto.CountTransactionTypeResponse> {
		return new dto.CountTransactionTypeResponse(
			await this.$repo.countAll()
		)
	}

	//#region Create

	/**
	 * @see ITransactionTypeService.create
	 */
	public create(params: dto.CreateTransactionTypeRequest): Promise<dto.CreateTransactionTypeResponse> {
		return this.$create(params, dto.CreateTransactionTypeResponse)
	}

	/**
	 * @override
	 */
	protected async $checkCreateViolation(params: dto.CreateTransactionTypeRequest): Promise<Maybe<string>> {
		// if (await this.$repo.exists({ username: params.username })) {
		// 	return Maybe.Just('USER_EXISTING')
		// }
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Create


	//#region Edit

	/**
	 * @see ITransactionTypeService.edit
	 */
	public async edit(params: dto.EditTransactionTypeRequest): Promise<dto.EditTransactionTypeResponse> {
		return this.$edit(params, dto.EditTransactionTypeResponse)
	}

	/**
	 * @override
	 */
	protected async $checkEditViolation(params: dto.EditTransactionTypeRequest): Promise<Maybe> {
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Edit


	//#region Delete

	/**
	 * @see ITransactionTypeService.hardDeleteSingle
	 */
	public async hardDeleteSingle(params: dto.DeleteTransactionTypeRequest): Promise<dto.DeleteTransactionTypeResponse> {
		return this.$hardDeleteSingle(
			params,
			dto.DeleteTransactionTypeResponse,
		)
	}

	/**
	 * @see ITransactionTypeService.hardDeleteMany
	 */
	public async hardDeleteMany(params: dto.DeleteTransactionTypeRequest): Promise<dto.DeleteTransactionTypeResponse> {
		return this.$hardDeleteMany(
			params,
			dto.DeleteTransactionTypeResponse,
		)
	}

	/**
	 * @override
	 */
	protected $checkDeleteManyViolation(params: dto.DeleteTransactionTypeRequest): Promise<Maybe> {
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Delete


	//#region Get

	/**
	 * @see ITransactionTypeService.getById
	 */
	public async getById(params: dto.GetTransactionTypeByIdRequest): Promise<dto.GetSingleTransactionTypeResponse> {
		return this.$getById(params, dto.GetSingleTransactionTypeResponse)
	}

	/**
	 * @see ITransactionTypeService.getList
	 */
	public async getList(params: dto.GetTransactionTypeListRequest): Promise<dto.GetTransactionTypeListResponse> {
		return this.$getList(params, dto.GetTransactionTypeListResponse)
	}

	//#endregion Get

}
