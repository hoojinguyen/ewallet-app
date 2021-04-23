/// <reference types="debug" />
// const debug: debug.IDebugger = require('debug')('scaffold:repo:user')

import { IRepository, PgCrudRepositoryBase, IDatabaseConnector, Types as T, QueryCallback, QueryCallbackReturn, RepositoryPageOptions } from '@micro-fleet/persistence'
import { decorators as cd, Types as cT, IConfigurationProvider, Maybe } from '@micro-fleet/common'
import { QueryBuilder } from 'objection'
import * as bcrypt from 'bcryptjs'

import { User } from '../models/domain/User'
import { UserORM } from '../models/orm/UserORM'
import { CustomConfig as CC } from '../constants/Config'
import { momentifyTz } from '../utils/date-utils'

export interface IUserRepositoryPageOptions extends RepositoryPageOptions {
	roles?: string[]
	date?: string
}

export interface IUserRepository extends IRepository<User> {
	// Extra methods to manipulate user
	findByUsername(username: string): Promise<Maybe<User>>

	/**
	 * Change user password without asking for current one
	 */
	changePasswordHard(id: string, newPassword: string): Promise<Partial<User>>
}

@cd.injectable()
export class UserRepository
	extends PgCrudRepositoryBase<UserORM, User>
	implements IUserRepository {

	constructor(
		@cd.inject(T.DB_CONNECTOR) connector: IDatabaseConnector,
		@cd.inject(cT.CONFIG_PROVIDER) private _config: IConfigurationProvider,
	) {
		super(UserORM, User, connector)
		// debug('UserRepository instantiated')
	}

	protected $buildPageQuery(query: QueryBuilder<UserORM>, opts: IUserRepositoryPageOptions): QueryCallbackReturn {
		const q = (super.$buildPageQuery(query, opts) as QueryBuilder<UserORM>)
		opts.roles && q.whereIn('role', opts.roles)
		const { date } = opts
		if (date) {
			const startOfMonth = momentifyTz(date).startOf('month').utc().format()
			const endOfMonth = momentifyTz(date).endOf('month').utc().format()
			q.andWhere('createdAt', '>=', startOfMonth).andWhere('createdAt', '<=', endOfMonth)
		}
		// debug(`GET USERS OF MONTH ${momentifyTz(date).get('month') + 1}: ${q.toSql()}`)
		return q
	}

	// Implemenent extra methods here
	public async findByUsername(username: string): Promise<Maybe<User>> {
		return this.$dbConnector.prepare(
			UserORM,
			(async query => {
				const q = await this.$buildFindByUsernameQuery(query, username)
				return q
			}) as QueryCallback<UserORM>
		).then((fetchedUser: UserORM) => fetchedUser ? Maybe.Just(this.$toDomainModel(fetchedUser)) : Maybe.Nothing())
	}

	protected async $buildFindByUsernameQuery(query: QueryBuilder<UserORM>, username: string): Promise<QueryCallback<UserORM>> {
		return query.findOne({ username }) as any
	}

	/**
	 * @see IUserRepository.changePasswordHard
	 */
	public async changePasswordHard(id: string, newPassword: string): Promise<Partial<User>> {
		return this.$dbConnector.prepare(
			UserORM,
			(async query => {
				const q = await this.$buildChangePasswordHard(query, id, newPassword)
				return q
			}) as QueryCallback<UserORM>
		).then((refetch: UserORM) => this.$toDomainModel(refetch))
	}

	protected async $buildChangePasswordHard(query: QueryBuilder<UserORM>, id: string, newPassword: string): Promise<QueryCallback<UserORM>> {
		const numOfRound = this._config.get(CC.HASH_ROUND).tryGetValue(10)
		const salt = await bcrypt.genSalt(numOfRound)
		const passwordHashed = await bcrypt.hash(newPassword, salt)

		return query.updateAndFetchById(id, { password: passwordHashed }) as any
	}
}
