const { momentify } = require('../../utils')

const CREATED_AT = momentify().format()

module.exports = {
	TRANSACTION_GROUPS: [
		{
			id: '8365829466227737601',
			displayName: 'Chi tiêu',
			isMoneyAdd: false,
			isUserRelated: false,
			isTransactionRelated: false,
			createdAt: CREATED_AT
		},
		{
			id: '8365832911118664706',
			displayName: 'Thu nhập',
			isMoneyAdd: true,
			isUserRelated: false,
			isTransactionRelated: false,
			createdAt: CREATED_AT
		},
		{
			id: '8365832911127053315',
			displayName: 'Cho vay/Thu nợ',
			isMoneyAdd: true,
			isUserRelated: true,
			isTransactionRelated: true,
			createdAt: CREATED_AT
		},
	]
}
