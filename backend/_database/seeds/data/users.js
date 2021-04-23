// const { momentify } = require('../../utils')

// const CREATED_AT = momentify()

// module.exports = {
// 	USERS: [
// 		{
// 			id: '8359840101794055169',
// 			displayName: 'Ngô Đức Hòa',
// 			username: 'admin',
// 			password: '$2y$10$XcmYZlu31.u4Ao0pB7cvM.H/cJZ1btCvPs549pt0/1d61Wkzo2aUW',
// 			role: 'admin',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(1, 'days').format()
// 		},
// 		{
// 			id: '8359841248743261186',
// 			displayName: 'Lê Mai Văn Khánh',
// 			username: 'supervisor',
// 			password: '$2y$10$0OKbkyJviOPTKjnabFbvoOwAoAt83VL7AJaBUlwxWncAvmkB2POxW',
// 			role: 'supervisor',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(30, 'days').format()
// 		},
// 		{
// 			id: '8359841248743265186',
// 			displayName: 'Lê Mai Văn Khánh',
// 			username: 'supervisor1',
// 			password: '$2y$10$0OKbkyJviOPTKjnabFbvoOwAoAt83VL7AJaBUlwxWncAvmkB2POxW',
// 			role: 'supervisor',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(30, 'days').format()
// 		},
// 		{
// 			id: '8359841248745265186',
// 			displayName: 'Lê Mai Văn Khánh',
// 			username: 'supervisor2',
// 			password: '$2y$10$0OKbkyJviOPTKjnabFbvoOwAoAt83VL7AJaBUlwxWncAvmkB2POxW',
// 			role: 'supervisor',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(30, 'days').format()
// 		},
// 		{
// 			id: '8359841248751649795',
// 			displayName: 'Nguyễn Văn Hội',
// 			username: 'guest',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(60, 'days').format()
// 		},
// 		{
// 			id: '8359841258751649795',
// 			displayName: 'Nguyễn Văn Hội',
// 			username: 'guestd',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(60, 'days').format()
// 		},
// 		{
// 			id: '8359841278751649795',
// 			displayName: 'Nguyễn Văn Hội',
// 			username: 'guesta',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(60, 'days').format()
// 		},
// 		{
// 			id: '8359841248751649796',
// 			displayName: 'Võ Quốc Huy',
// 			username: 'guest1xc',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(90, 'days').format()
// 		},
// 		{
// 			id: '8359841248751649797',
// 			displayName: 'Nguyễn Trung Nguyên',
// 			username: 'guest2zx',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(120, 'days').format()
// 		},
// 		{
// 			id: '8359841248751849797',
// 			displayName: 'Nguyễn Trung Nguyên',
// 			username: 'guest23',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(120, 'days').format()
// 		},
// 		{
// 			id: '8359841248751649798',
// 			displayName: 'Nguyễn Trung Nguyên',
// 			username: 'guestl2',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(150, 'days').format()
// 		},
// 		{
// 			id: '8359841248751649799',
// 			displayName: 'Nguyễn Trung Nguyên',
// 			username: 'guestj2',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(180, 'days').format()
// 		},
// 		{
// 			id: '8359841428751649799',
// 			displayName: 'Nguyễn Trung Nguyên',
// 			username: 'guestaj2',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(180, 'days').format()
// 		},
// 		{
// 			id: '8359841248751622799',
// 			displayName: 'Nguyễn Trung Nguyên',
// 			username: 'guestjas2',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(180, 'days').format()
// 		},
// 		{
// 			id: '8359841248751649100',
// 			displayName: 'Nguyễn Trung Nguyên',
// 			username: 'guest87872',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(210, 'days').format()
// 		},
// 		{
// 			id: '8359841248851649101',
// 			displayName: 'Nguyễn Trung Nguyên',
// 			username: 'guestui2',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(240, 'days').format()
// 		},
// 		{
// 			id: '8359841248771649101',
// 			displayName: 'Nguyễn Trung Nguyên',
// 			username: 'guestjk2',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(240, 'days').format()
// 		},
// 		{
// 			id: '8359871248751649101',
// 			displayName: 'Nguyễn Trung Nguyên',
// 			username: 'guesjklt2',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(240, 'days').format()
// 		},
// 		{
// 			id: '8359841248751649102',
// 			displayName: 'Nguyễn Trung Nguyên',
// 			username: 'guesjklt2',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(270, 'days').format()
// 		},
// 		{
// 			id: '8359841248751649103',
// 			displayName: 'Nguyễn Trung Nguyên',
// 			username: 'guestjkl2',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(300, 'days').format()
// 		},
// 		{
// 			id: '8359841248751649104',
// 			displayName: 'Nguyễn Trung Nguyên',
// 			username: 'guesjklt2',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(330, 'days').format()
// 		},
// 		{
// 			id: '8359841248751649105',
// 			displayName: 'Nguyễn Trung Nguyên',
// 			username: 'guejklst2',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(330, 'days').format()
// 		},
// 		{
// 			id: '8359841248751649106',
// 			displayName: 'Nguyễn Trung Nguyên',
// 			username: 'guejkst2',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(330, 'days').format()
// 		},
// 		{
// 			id: '8359841248751649107',
// 			displayName: 'Nguyễn Trung Nguyên',
// 			username: 'guesjklt2',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT.subtract(330, 'days').format()
// 		},
// 	]
// }


const { momentify } = require('../../utils')

const CREATED_AT = momentify()

// module.exports = {
// 	USERS: [
// 		{
// 			id: '8359840101794055169',
// 			displayName: 'Ngô Đức Hòa',
// 			username: 'admin',
// 			password: '$2y$10$XcmYZlu31.u4Ao0pB7cvM.H/cJZ1btCvPs549pt0/1d61Wkzo2aUW',
// 			role: 'admin',
// 			status: 'active',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8359841248743261186',
// 			displayName: 'Lê Mai Văn Khánh',
// 			username: 'supervisor',
// 			password: '$2y$10$0OKbkyJviOPTKjnabFbvoOwAoAt83VL7AJaBUlwxWncAvmkB2POxW',
// 			role: 'supervisor',
// 			status: 'active',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8359841248751649795',
// 			displayName: 'Nguyễn Văn Hội',
// 			username: 'guest',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8359841248751649796',
// 			displayName: 'Võ Quốc Huy',
// 			username: 'guest',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8359841248751649797',
// 			displayName: 'Nguyễn Trung Nguyên',
// 			username: 'guest',
// 			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
// 			role: 'guest',
// 			status: 'active',
// 			createdAt: CREATED_AT
// 		},
// 	]
// }

module.exports = {
	USERS: [
		{
			id: '8359840101794055169',
			displayName: 'Ngô Đức Hòa',
			username: 'admin',
			password: '$2y$10$XcmYZlu31.u4Ao0pB7cvM.H/cJZ1btCvPs549pt0/1d61Wkzo2aUW',
			role: 'admin',
			status: 'active',
			createdAt: CREATED_AT.subtract(1, 'days').format()
		},
		{
			id: '8359841248743261186',
			displayName: 'Lê Mai Văn Khánh',
			username: 'supervisor',
			password: '$2y$10$0OKbkyJviOPTKjnabFbvoOwAoAt83VL7AJaBUlwxWncAvmkB2POxW',
			role: 'supervisor',
			status: 'active',
			createdAt: CREATED_AT.subtract(30, 'days').format()
		},
		{
			id: '8359841248743265186',
			displayName: 'Lê Mai Văn Khánh',
			username: 'supervisor1',
			password: '$2y$10$0OKbkyJviOPTKjnabFbvoOwAoAt83VL7AJaBUlwxWncAvmkB2POxW',
			role: 'supervisor',
			status: 'active',
			createdAt: CREATED_AT.subtract(30, 'days').format()
		},
		{
			id: '8359841248745265186',
			displayName: 'Lê Mai Văn Khánh',
			username: 'supervisor2',
			password: '$2y$10$0OKbkyJviOPTKjnabFbvoOwAoAt83VL7AJaBUlwxWncAvmkB2POxW',
			role: 'supervisor',
			status: 'active',
			createdAt: CREATED_AT.subtract(30, 'days').format()
		},
		{
			id: '8359841248751649795',
			displayName: 'Nguyễn Văn Hội',
			username: 'guest',
			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
			role: 'guest',
			status: 'active',
			createdAt: CREATED_AT.subtract(60, 'days').format()
		},
		{
			id: '8359841258751649795',
			displayName: 'Nguyễn Văn Hội',
			username: 'guestd',
			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
			role: 'guest',
			status: 'active',
			createdAt: CREATED_AT.subtract(60, 'days').format()
		},
		{
			id: '8359841278751649795',
			displayName: 'Nguyễn Văn Hội',
			username: 'guesta',
			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
			role: 'guest',
			status: 'active',
			createdAt: CREATED_AT.subtract(60, 'days').format()
		},
		{
			id: '8359841248751649796',
			displayName: 'Võ Quốc Huy',
			username: 'guest1xc',
			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
			role: 'guest',
			status: 'active',
			createdAt: CREATED_AT.subtract(90, 'days').format()
		},
		{
			id: '8359841248751649797',
			displayName: 'Nguyễn Trung Nguyên',
			username: 'guest2zx',
			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
			role: 'guest',
			status: 'active',
			createdAt: CREATED_AT.subtract(120, 'days').format()
		},
		{
			id: '8359841248751849797',
			displayName: 'Nguyễn Trung Nguyên',
			username: 'guest23',
			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
			role: 'guest',
			status: 'active',
			createdAt: CREATED_AT.subtract(120, 'days').format()
		},
		{
			id: '8359841248751649798',
			displayName: 'Nguyễn Trung Nguyên',
			username: 'guestl2',
			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
			role: 'guest',
			status: 'active',
			createdAt: CREATED_AT.subtract(150, 'days').format()
		},
		{
			id: '8359841248751649799',
			displayName: 'Nguyễn Trung Nguyên',
			username: 'guestj2',
			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
			role: 'guest',
			status: 'active',
			createdAt: CREATED_AT.subtract(180, 'days').format()
		},
		{
			id: '8359841428751649799',
			displayName: 'Nguyễn Trung Nguyên',
			username: 'guestaj2',
			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
			role: 'guest',
			status: 'active',
			createdAt: CREATED_AT.subtract(180, 'days').format()
		},
		{
			id: '8359841248751622799',
			displayName: 'Nguyễn Trung Nguyên',
			username: 'guestjas2',
			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
			role: 'guest',
			status: 'active',
			createdAt: CREATED_AT.subtract(180, 'days').format()
		},
		{
			id: '8359841248751649100',
			displayName: 'Nguyễn Trung Nguyên',
			username: 'guest87872',
			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
			role: 'guest',
			status: 'active',
			createdAt: CREATED_AT.subtract(210, 'days').format()
		},
		{
			id: '8359841248851649101',
			displayName: 'Nguyễn Trung Nguyên',
			username: 'guestui2',
			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
			role: 'guest',
			status: 'active',
			createdAt: CREATED_AT.subtract(240, 'days').format()
		},
		{
			id: '8359841248771649101',
			displayName: 'Nguyễn Trung Nguyên',
			username: 'guestjk2',
			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
			role: 'guest',
			status: 'active',
			createdAt: CREATED_AT.subtract(240, 'days').format()
		},
		{
			id: '8359871248751649101',
			displayName: 'Nguyễn Trung Nguyên',
			username: 'guesjklt2',
			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
			role: 'guest',
			status: 'active',
			createdAt: CREATED_AT.subtract(240, 'days').format()
		},
		{
			id: '8359841248751649102',
			displayName: 'Nguyễn Trung Nguyên',
			username: 'guesjklt2',
			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
			role: 'guest',
			status: 'active',
			createdAt: CREATED_AT.subtract(270, 'days').format()
		},
		{
			id: '8359841248751649103',
			displayName: 'Nguyễn Trung Nguyên',
			username: 'guestjkl2',
			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
			role: 'guest',
			status: 'active',
			createdAt: CREATED_AT.subtract(300, 'days').format()
		},
		{
			id: '8359841248751649104',
			displayName: 'Nguyễn Trung Nguyên',
			username: 'guesjklt2',
			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
			role: 'guest',
			status: 'active',
			createdAt: CREATED_AT.subtract(330, 'days').format()
		},
		{
			id: '8359841248751649105',
			displayName: 'Nguyễn Trung Nguyên',
			username: 'guejklst2',
			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
			role: 'guest',
			status: 'active',
			createdAt: CREATED_AT.subtract(330, 'days').format()
		},
		{
			id: '8359841248751649106',
			displayName: 'Nguyễn Trung Nguyên',
			username: 'guejkst2',
			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
			role: 'guest',
			status: 'active',
			createdAt: CREATED_AT.subtract(330, 'days').format()
		},
		{
			id: '8359841248751649107',
			displayName: 'Nguyễn Trung Nguyên',
			username: 'guesjklt2',
			password: '$2y$10$lSXpZJ4xU8kIkbPMKGxxMuH6b5n/jEVZx7DqoqRfmyFnltuhqwOQ2',
			role: 'guest',
			status: 'active',
			createdAt: CREATED_AT.subtract(330, 'days').format()
		},
	]
}

