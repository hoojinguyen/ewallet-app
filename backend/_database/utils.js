const moment = require('moment-timezone')


exports.createSequenceFactory = function (schema) {
	return function (tableName) {
		return schema.raw(`DROP SEQUENCE IF EXISTS public.${tableName}_id_seq;` +
			`CREATE SEQUENCE public.${tableName}_id_seq;`)
	}
}

exports.dropTableCascadeIfExistsFactory = function (schema) {
	return function (tableName) {
		return schema.raw(`DROP TABLE IF EXISTS ${tableName} CASCADE;`)
	}
}

exports.momentify = function (source) {
	return moment(source).utc()
}
