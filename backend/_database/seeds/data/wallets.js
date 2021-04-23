const { momentify } = require('../../utils')

const CREATED_AT = momentify().format()

module.exports = {
	WALLETS: [
		{
			id: '8365852326207947777',
			displayName: 'Ví mặc định',
			accountBalance: 100000000,
			image: '/images/kinh_doanh.png',
			userId: '8359841248751649795',
			walletTypeId: '8365848937403253761',
			status: 'active',
			createdAt: CREATED_AT,
		},
		{
			id: '8365852326224724994',
			displayName: 'Ví điện tử',
			accountBalance: 500000,
			image: '/images/nha_hang.png',
			userId: '8359841248751649795',
			walletTypeId: '8365848937436808194',
			creditCardSeries: '9591351564512164',
			status: 'active',
			createdAt: CREATED_AT
		},
	]
}
