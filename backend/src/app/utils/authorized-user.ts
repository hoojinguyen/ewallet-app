import { UserRole } from '../constants/User'

export interface AuthorizedUser {
	iat?: string | number,
	iss?: string,
	name?: string,
	role?: UserRole,
	sub?: string | number,
}
