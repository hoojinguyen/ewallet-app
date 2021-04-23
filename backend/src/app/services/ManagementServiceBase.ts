import { PagedData, Maybe, ITranslatable, IdBase, SingleId,
	decorators as d } from '@micro-fleet/common'
import { IRepository, AtomicSessionFactory, AtomicSession } from '@micro-fleet/persistence'

import { ResultResponseConstructor, MaybeResponseConstructor, ListResponseConstructor,
	IAtomicRequest, IMultiIds, ISingleId } from '../models/dto/dto-base'
import { momentifyUtc } from '../utils/date-utils'


function buidSingleId(params: ISingleId | IMultiIds): any {
	return ((params as ISingleId).id
		? new SingleId((params as ISingleId).id)
		: new SingleId((params as IMultiIds).ids[0]))
}

function buidMultipleId(params: IMultiIds): any {
	return params.ids.map(id => new SingleId(id))
}

/**
 * Provides methods for common CRUD operations
 */
@d.injectable()
export class ManagementServiceBase<TDomain extends object, TId extends IdBase = SingleId> {

	constructor(
		@d.unmanaged() protected readonly $DomainClass: ITranslatable,
		@d.unmanaged() protected readonly $repo: IRepository<TDomain, TId>,
		@d.unmanaged() protected readonly $sessionFactory: AtomicSessionFactory,
	) {}


	//#region Create

	protected async $create<T extends InstanceType<ResultResponseConstructor>>(params: any,
			ResponseClass: ResultResponseConstructor): Promise<T> {
		const violation = await this.$checkCreateViolation(params)
		if (violation.isJust) {
			return new ResponseClass(false, violation.value) as T
		}
		const newDomainModel = this.$DomainClass.from(params)
		// id is auto-generated by database
		// delete newDomainModel['id']
		const createdDomainModel = await this.$repo.create(newDomainModel)
		const result = ResponseClass.from(createdDomainModel)
		return result
	}

	/**
	 * Can be overriden by derived class to check business rule for creating.
	 */
	protected $checkCreateViolation(params: any): Promise<Maybe> {
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Create


	//#region Delete

	protected async $hardDeleteSingle<T extends InstanceType<ResultResponseConstructor>>(
		params: IMultiIds,
		ResponseClass: ResultResponseConstructor,
		buildIdFn?: (param: IMultiIds) => TId,
	): Promise<T> {
		const violation = await this.$checkDeleteSingleViolation(params)
		if (violation.isJust) {
			return new ResponseClass(false, violation.value) as T
		}

		buildIdFn = buildIdFn || buidSingleId
		const id = buildIdFn(params)
		const affectedCount: number = await this.$repo.deleteSingle(id)
		if (affectedCount) {
			const result = ResponseClass.from({
				deletedAt: momentifyUtc().format(),
			})
			return result
		}
		return new ResponseClass(false) as T
	}

	/**
	 * Can be overriden by derived class to check business rule for deleting.
	 */
	protected $checkDeleteSingleViolation(params: any): Promise<Maybe> {
		return Promise.resolve(Maybe.Nothing())
	}


	protected async $hardDeleteMany<T extends InstanceType<ResultResponseConstructor>>(
		params: IAtomicRequest & IMultiIds,
		ResponseClass: ResultResponseConstructor,
		buildIdFn?: (param: IMultiIds) => TId[],
	): Promise<T> {
		const violation = await this.$checkDeleteManyViolation(params)
		if (violation.isJust) {
			return new ResponseClass(false, violation.value) as T
		}

		buildIdFn = buildIdFn || buidMultipleId
		const ids = buildIdFn(params)
		let task: Promise<number>
		if (params.isAtomic) {
			task = this.$sessionFactory.startSession()
				.pipe((atomicSession: AtomicSession) => {
					return this.$repo.deleteMany(ids, { atomicSession })
				})
				.closePipe()
		}
		else {
			task = this.$repo.deleteMany(ids)
		}
		const affectedCount: number = await task
		if (affectedCount) {
			const result = ResponseClass.from({
				deletedAt: momentifyUtc().format(),
			})
			return result
		}
		return new ResponseClass(false) as T
	}

	/**
	 * Can be overriden by derived class to check business rule for deleting.
	 */
	protected $checkDeleteManyViolation(params: any): Promise<Maybe> {
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Delete


	//#region Edit

	protected async $edit<CT extends InstanceType<ResultResponseConstructor>>(params: any,
			ResponseClass: ResultResponseConstructor): Promise<CT> {
		const violation = await this.$checkEditViolation(params)
		if (violation.isJust) {
			return new ResponseClass(false, violation.value) as CT
		}

		const partialDomainModel = this.$DomainClass.from(params)
		const maybe = await this.$repo.patch(partialDomainModel, { refetch: true })
		if (maybe.isJust) {
			const result = ResponseClass.from(maybe.value)
			return result
		}
		return new ResponseClass(false) as CT
	}

	/**
	 * Can be overriden by derived class to check business rule for editing.
	 */
	protected $checkEditViolation(params: any): Promise<Maybe> {
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Edit


	//#region Get

	protected async $getById<CT extends InstanceType<MaybeResponseConstructor>>(
		params: any,
		ResponseClass: MaybeResponseConstructor,
		buildIdFn?: (param: IMultiIds) => TId,
	): Promise<CT> {
		// type SpreadParam = {id: string, tenantId?: string} & RepositoryFindOptions
		// const { id, tenantId, ...opts }: SpreadParam = params

		buildIdFn = buildIdFn || buidSingleId
		const id = buildIdFn(params)
		params.relations = this.$objectifyRelations(params.relations)
		const maybe = await this.$repo.findById(id, params)
		if (maybe.isJust) {
			const result = ResponseClass.from(maybe.value)
			return result
		}
		return new ResponseClass(false) as CT
	}

	protected async $getList<CT extends InstanceType<ListResponseConstructor>>(params: any,
			ResponseClass: ListResponseConstructor): Promise<CT> {
		params.relations = this.$objectifyRelations(params.relations)
		const fetchedDomainModels: PagedData<TDomain> = await this.$repo.page(params)

		if (fetchedDomainModels.length) {
			const result = ResponseClass.from(fetchedDomainModels)
			return result
		}
		return new ResponseClass() as CT
	}

	//#endregion Get

	/**
	 * Converts string array to Objection's relation expression
	 * @example
	 *
	 * Input: ['tenant', 'category']
	 * Output: {
	 *   tenant: true,
	 *   category: true,
	 * }
	 *
	 * Input: ['tenant', 'product.producer']
	 * Output: {
	 *   tenant: true,
	 *   product: {
	 *      producer: true,
	 *   },
	 * }
	 */
	protected $objectifyRelations(relations: string[]): object {
		if (!relations) { return null }
		return relations.reduce((relationObj, currentRelation) => {
			const nestedRelations = currentRelation.split('.')
			nestedRelations.reduce((prev, cur, index) => {
				// The last relation in the nested should be true
				prev[cur] = index === nestedRelations.length - 1
					? true
					: (prev[cur]
						? prev[cur]
						: {}
					)

				// Handle modifiers
				if (cur === 'rootTransactionTypes') {
					prev[cur] = {
						$relation: 'rootTransactionTypes',
						$modify: [ 'selectRootTransactionTypes' ],
					}
				}
				// Recursive query in object notation
				else if (cur === '^') {
					delete prev[cur]
					prev['$recursive'] = true
					return prev
				}

				return prev[cur]
			}, relationObj)

			return relationObj
		}, {})
	}
}