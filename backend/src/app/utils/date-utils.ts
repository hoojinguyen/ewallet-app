import * as moment from 'moment-timezone'


/**
 * Converts a time string in timezone +07:00.
 * If the input is not parseable by "moment",
 * the function returns the original string.
 * @param {boolean} isUtc If true, `source` is parsed as UTC datetime then
 *     converted to timezone +07:00. Otherwise, `source` is parsed in timezone +07:00.
 */
export function toTimeStringTz(source: string, isUtc = true): string {
	if (!source) { return source }
	const wrapped: moment.Moment = isUtc
		? moment.utc(source).tz('Asia/Ho_Chi_Minh')
		: moment.tz(source, 'Asia/Ho_Chi_Minh')
	return (wrapped.isValid() ? wrapped.format() : source)
}


/**
 * Converts a time string to W3C Date and Time Formats.
 * If the input is not parseable by "moment",
 * the function returns the original string.
 * @param {string} timezone If specified, `source` is parsed in `timezone` then
 *     converted to UTC. Otherwise, `source` is parsed as UTC time.
 */
export function toTimeStringUtc(source: string, timezone?: string): string {
	if (!source) { return source }
	const wrapped: moment.Moment = timezone
		? moment.tz(source, timezone).utc()
		: moment.utc(source)
	return (wrapped.isValid() ? wrapped.format() : source)
}

/**
 * Wraps `source` in a Moment instance in timezone +07:00.
 * If `source` is not given, returns Moment instance of current time in timezone +07:00.
 */
export function momentifyTz(source?: any): moment.Moment {
	return moment.tz(source, 'Asia/Ho_Chi_Minh')
}


/**
 * Wraps `source` in a Moment instance in UTC.
 * If `source` is not given, returns Moment instance of current time in UTC.
 */
export function momentifyUtc(source?: any): moment.Moment {
	return moment.utc(source)
}
