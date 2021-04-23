const { knexSnakeCaseMappers } = require('objection')

module.exports = {
	development: {
		client: 'pg',
		connection: {
			host: 'localhost',
			user: 'postgres',
			password: 'postgres',
			database: 'vi_dien_tu'
		},
		...knexSnakeCaseMappers()
	}
};
