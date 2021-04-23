import { BusinessInvariantError, Exception, MinorException } from '@micro-fleet/common'

import { ResultResponseConstructor, MaybeResponseConstructor } from '../models/dto/dto-base'

export type AsyncFunction<T> = (...args: any[]) => Promise<T>

/**
 * A custom version of Rambdax `composeAsync`
 * https://github.com/selfrefactor/rambdax#composeasync
 */
// export function composeAsync<T1, T2>(fn1: AsyncFunction<T1>, fn2: AsyncFunction<T2>): (input: any) => Promise<T2>
export function composeAsync<V extends any[], T1>(
	fn0: (...args: V) => Promise<T1>,
): (...args: V) => Promise<T1>
export function composeAsync<V extends any[], T1, T2>(
	fn1: (x: T1) => Promise<T2>,
	fn0: (...args: V) => Promise<T1>,
): (...args: V) => Promise<T2>
export function composeAsync<V extends any[], T1, T2, T3>(
	fn2: (x: T1) => Promise<T3>,
	fn1: (x: T1) => Promise<T2>,
	fn0: (...args: V) => Promise<T1>,
): (...args: V) => T3
export function composeAsync<V extends any[], T1, T2, T3, T4>(
	fn3: (x: T1) => Promise<T4>,
	fn2: (x: T1) => Promise<T3>,
	fn1: (x: T1) => Promise<T2>,
	fn0: (...args: V) => Promise<T1>,
): (...args: V) => T4
export function composeAsync<V extends any[], T1, T2, T3, T4, T5>(
	fn4: (x: T1) => Promise<T5>,
	fn3: (x: T1) => Promise<T4>,
	fn2: (x: T1) => Promise<T3>,
	fn1: (x: T1) => Promise<T2>,
	fn0: (...args: V) => Promise<T1>,
): (...args: V) => T5
export function composeAsync(...fns: any[]) {
	return async function(input: any) {
		let result = input

		while (fns.length !== 0) {
			const fn = fns.pop()
			result = await fn(result)
		}

		return result
	}
}


/**
 * Attempts to build failure response, if cannot, throws error.
 */
export function buildErrorResponse(ResponseClass: ResultResponseConstructor | MaybeResponseConstructor): (err: any) => any {
	return function (err: any): any {
		if (err instanceof BusinessInvariantError) {
			return new ResponseClass(false, err)
		}
		else if (! (err instanceof Exception)) {
			let ex
			if (err['name'] === 'BusinessInvariantError') {
				ex = new BusinessInvariantError(err['details'])
				return new ResponseClass(false, ex)
			}
			ex = new MinorException(err['message'])
			ex.details = err
			throw ex
		}
		throw err
	}
}
