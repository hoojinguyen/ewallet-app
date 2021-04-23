const { momentify } = require('../../utils')

const CREATED_AT = momentify().format()

module.exports = {
	WALLET_TYPES: [
		{
			id: '8365848937403253761',
			displayName: 'Ví tiền thật',
			isCreditCardConnectable: false,
			createdAt: CREATED_AT
		},
		{
			id: '8365848937436808194',
			displayName: 'Ví điện tử',
			isCreditCardConnectable: true,
			createdAt: CREATED_AT
		},
	]
}
