import { constants } from '@micro-fleet/common'

import { CustomConfig as CF } from './constants/Config'

const {
	DbClient,
	Database: D,
	Service: S,
	Web: W,
	Auth: A,
} = constants


export = {
	[S.SERVICE_SLUG]: 'vi-dien-tu',
	[D.DB_ENGINE]: DbClient.POSTGRESQL,
	[D.DB_HOST]: 'localhost',
	[D.DB_USER]: 'postgres',
	[D.DB_PASSWORD]: 'postgres',
	[D.DB_NAME]: 'vi_dien_tu',
	[W.WEB_PORT]: 3000,
	[W.WEB_URL_PREFIX]: '/api/v1',
	[W.WEB_CORS]: '*',
	[A.AUTH_KEY_SIGN]: '75510E28814558A454F83081DEAD536B73450F30B60DB006CAF4F970A8420790',
	[A.AUTH_ISSUER]: 'hoango7604',
	[A.AUTH_EXPIRE_ACCESS]: '1y',

	// Custom config
	[CF.HASH_ROUND]: 10,
	[CF.EMAIL_SERVICE]: 'gmail',
	[CF.EMAIL_USERNAME]: 'ngoduchoa.soc@gmail.com',
	[CF.EMAIL_PASSWORD]: 'manga24h.com',
	[CF.EMAIL_FROM]: '"Ví điện tử" <ngoduchoa.soc@gmail.com>',
}
