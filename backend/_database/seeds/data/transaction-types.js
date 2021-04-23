// const { momentify } = require('../../utils')

// const CREATED_AT = momentify().format()

// module.exports = {
// 	TRANSACTION_TYPES: [
// 		//Khoản chi 
// 		{
// 			id: '8365841731815474118',
// 			displayName: 'Hóa đơn & Tiện ích',
// 			image: "/images/hoa_don_tien_ich.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			userId: '8359841248751649795',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365841731815474119',
// 			displayName: 'Tiền Điện',
// 			image: "/images/hoa_don_dien.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			parentTransactionTypeId: '8365841731815474118',
// 			userId: '8359841248751649795',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365841731815474120',
// 			displayName: 'Tiền Điện Thoại',
// 			image: "/images/hoa_don_dien_thoai.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			parentTransactionTypeId: '8365841731815474118',
// 			userId: '8359841248751649795',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365841731815474122',
// 			displayName: 'Tiền Internet',
// 			image: "/images/hoa_don_internet.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			userId: '8359841248751649795',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365841731815474123',
// 			displayName: 'Tiền nước',
// 			image: "/images/hoa_don_nuoc.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			userId: '8359841248751649795',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365841731815474126',
// 			displayName: 'Giáo dục',
// 			image: "/images/giao_duc.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			userId: '8359841248751649795',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365841731815474127',
// 			displayName: 'Sách',
// 			image: "/images/sach.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			parentTransactionTypeId: '8365841731815474126',
// 			userId: '8359841248751649795',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365841731815474129',
// 			displayName: 'Giải trí',
// 			image: "/images/giai_tri.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			userId: '8359841248751649795',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365841731815474131',
// 			displayName: 'Phim ảnh',
// 			image: "/images/phim_anh.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			userId: '8359841248751649795',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365841731815474133',
// 			displayName: 'Con cái',
// 			image: "/images/con_cai.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			userId: '8359841248751649795',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365841731815474134',
// 			displayName: 'Sửa chữa',
// 			image: "/images/sua_chua_nha_cu.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			parentTransactionTypeId: '8365839929766315032',
// 			userId: '8359841248751649795',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365839929766315037',
// 			displayName: 'Ăn uống',
// 			image: "/images/an_uong.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365841731815474139',
// 			displayName: 'Nhà hàng',
// 			image: "/images/nha_hang.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			parentTransactionTypeId: '8365839929766315037',
// 			userId: '8359841248751649795',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365839929766315040',
// 			displayName: 'Bạn bè và người yêu',
// 			image: "/images/ban_be_va_nguoi_yeu.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365839929766315042',
// 			displayName: 'Đám cưới',
// 			image: "/images/cuoi_hoi.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365839929766315043',
// 			displayName: 'Đám tang',
// 			image: "/images/tang_le.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365839929766315045',
// 			displayName: "Sức khỏe",
// 			image: "/images/suc_khoe.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365839929766315046',
// 			displayName: "Bảo hiểm",
// 			image: "/images/bao_hiem.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365839929766315047',
// 			displayName: "Mua sắm",
// 			image: "/images/mua_sam.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365839929766315048',
// 			displayName: "Quần áo",
// 			image: "/images/quan_ao.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			parentTransactionTypeId: '8365839929766315047',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365839929766315049',
// 			displayName: "Giày dép",
// 			image: "/images/giay_dep.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			parentTransactionTypeId: '8365839929766315047',
// 			createdAt: CREATED_AT
// 		},

// 		{
// 			id: '8365839929766315050',
// 			displayName: "Di chuyển",
// 			image: "/images/di_chuyen.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365839929766315051',
// 			displayName: "Xăng dầu",
// 			image: "/images/xang_dau.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			parentTransactionTypeId: '8365839929766315050',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365839929766315053',
// 			displayName: "Taxi",
// 			image: "/images/taxi.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365829466227737601',
// 			parentTransactionTypeId: '8365839929766315050',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365839929766315054',
// 			displayName: 'Du lịch',
// 			image: "/images/du_lich.png",
// 			isMoneyAdd: true,
// 			transactionGroupId: '8365829466227737601',
// 			createdAt: CREATED_AT
// 		},

// 		//Khoản thu
// 		{
// 			id: '8365839929766315090',
// 			displayName: 'Bán đồ',
// 			image: "/images/ban_do.png",
// 			isMoneyAdd: true,
// 			transactionGroupId: '8365832911118664706',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365841731773531932',
// 			displayName: 'Giải thưởng',
// 			image: "/images/duoc_tang.png",
// 			isMoneyAdd: true,
// 			transactionGroupId: '8365832911118664706',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365841731781919474',
// 			displayName: 'Lương',
// 			image: "/images/luong.png",
// 			isMoneyAdd: true,
// 			transactionGroupId: '8365832911118664706',
// 			userId: '8359841248751649795',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365841731807085275',
// 			displayName: 'Thưởng',
// 			image: "/images/thuong.png",
// 			isMoneyAdd: true,
// 			transactionGroupId: '8365832911118664706',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365841731807085111',
// 			displayName: 'Tiền Lãi',
// 			image: "/images/tien_lai.png",
// 			isMoneyAdd: true,
// 			transactionGroupId: '8365832911118664706',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365841731807085578',
// 			displayName: 'Khoản thu khác',
// 			image: "/images/khoan_thu_khac.png",
// 			isMoneyAdd: true,
// 			transactionGroupId: '8365832911118664706',
// 			createdAt: CREATED_AT
// 		},


// 		//Debt,Loan
// 		{
// 			id: '8365846352252371959',
// 			displayName: 'Cho vay',
// 			image: "/images/cho_vay.png",
// 			isTransactionRelated: true,
// 			isUserRelated: true,
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365832911127053315',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365846352252371954',
// 			displayName: 'Thu nợ',
// 			image: "/images/thu_no.png",
// 			isTransactionRelated: true,
// 			isMoneyAdd: true,
// 			transactionGroupId: '8365832911127053315',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365846352260765084',
// 			displayName: 'Đi vay',
// 			image: "/images/di_vay.png",
// 			isTransactionRelated: true,
// 			isUserRelated: true,
// 			isMoneyAdd: true,
// 			transactionGroupId: '8365832911127053315',
// 			createdAt: CREATED_AT
// 		},
// 		{
// 			id: '8365846352629149193',
// 			displayName: 'Trả nợ',
// 			image: "/images/cho_vay.png",
// 			isMoneyAdd: false,
// 			transactionGroupId: '8365832911127053315',
// 			createdAt: CREATED_AT
// 		},
// 	]
// }


const { momentify } = require('../../utils')

const CREATED_AT = momentify().format()

module.exports = {
	// TRANSACTION_TYPES: [
	// 	//Khoản chi 
	// 	{
	// 		id: '8365841731815474118',
	// 		displayName: 'Hóa đơn & Tiện ích',
	// 		image: "/images/hoa_don_tien_ich.png",
	// 		isMoneyAdd: false,
	// 		transactionGroupId: '8365829466227737601',
	// 		userId: '8359841248751649795',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365841731815474119',
	// 		displayName: 'Tiền Điện',
	// 		image: "/images/hoa_don_dien.png",
	// 		isMoneyAdd: false,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365841731815474118',
	// 		userId: '8359841248751649795',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365841731815474120',
	// 		displayName: 'Tiền Điện Thoại',
	// 		image: "/images/hoa_don_dien_thoai.png",
	// 		isMoneyAdd: false,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365841731815474118',
	// 		userId: '8359841248751649795',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365841731815474121',
	// 		displayName: 'Tiền Gas',
	// 		image: "/images/hoa_don_gas.png",
	// 		isMoneyAdd: false,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365841731815474118',
	// 		userId: '8359841248751649795',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365841731815474122',
	// 		displayName: 'Tiền Internet',
	// 		image: "/images/hoa_don_internet.png",
	// 		isMoneyAdd: false,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365841731815474118',
	// 		userId: '8359841248751649795',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365841731815474123',
	// 		displayName: 'Tiền nước',
	// 		image: "/images/hoa_don_nuoc.png",
	// 		isMoneyAdd: false,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365841731815474118',
	// 		userId: '8359841248751649795',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365841731815474124',
	// 		displayName: 'Tiền TV',
	// 		image: "/images/hoa_don_tv.png",
	// 		isMoneyAdd: false,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365841731815474118',
	// 		userId: '8359841248751649795',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365841731815474125',
	// 		displayName: 'Kinh doanh',
	// 		image: "/images/kinh_doanh.png",
	// 		isMoneyAdd: false,
	// 		transactionGroupId: '8365829466227737601',
	// 		userId: '8359841248751649795',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365841731815474126',
	// 		displayName: 'Giáo dục',
	// 		image: "/images/giao_duc.png",
	// 		isMoneyAdd: false,
	// 		transactionGroupId: '8365829466227737601',
	// 		userId: '8359841248751649795',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365841731815474127',
	// 		displayName: 'Sách',
	// 		image: "/images/sach.png",
	// 		isMoneyAdd: false,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365841731815474126',
	// 		userId: '8359841248751649795',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365841731815474128',
	// 		displayName: 'Truyện tranh',
	// 		image: "/images/truyen_tranh.png",
	// 		isMoneyAdd: false,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365841731815474126',
	// 		userId: '8359841248751649795',
	// 		createdAt: CREATED_AT
	// 	},

	// 	{
	// 		id: '8365841731815474129',
	// 		displayName: 'Giải trí',
	// 		image: "/images/giai_tri.png",
	// 		isMoneyAdd: false,
	// 		transactionGroupId: '8365829466227737601',
	// 		userId: '8359841248751649795',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365841731815474130',
	// 		displayName: 'Trò chơi',
	// 		image: "/images/tro_choi.png",
	// 		isMoneyAdd: false,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365841731815474129',
	// 		userId: '8359841248751649795',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365841731815474131',
	// 		displayName: 'Phim ảnh',
	// 		image: "/images/phim_anh.png",
	// 		isMoneyAdd: false,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365841731815474129',
	// 		userId: '8359841248751649795',
	// 		createdAt: CREATED_AT
	// 	},



	// 	{
	// 		id: '8365839929766315032',
	// 		displayName: 'Gia đình',
	// 		image: "/images/gia_dinh.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365829466227737601',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365841731815474133',
	// 		displayName: 'Con cái',
	// 		image: "/images/con_cai.png",
	// 		isMoneyAdd: false,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365839929766315032',
	// 		userId: '8359841248751649795',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365841731815474134',
	// 		displayName: 'Sửa chữa',
	// 		image: "/images/sua_chua_nha_cu.png",
	// 		isMoneyAdd: false,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365839929766315032',
	// 		userId: '8359841248751649795',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365841731815474135',
	// 		displayName: 'Thú cưng',
	// 		image: "/images/vat_nuoi.png",
	// 		isMoneyAdd: false,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365839929766315032',
	// 		userId: '8359841248751649795',
	// 		createdAt: CREATED_AT
	// 	},

	// 	{
	// 		id: '8365839929766315036',
	// 		displayName: 'Đầu tư',
	// 		image: "/images/dau_tu.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365829466227737601',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365839929766315037',
	// 		displayName: 'Ăn uống',
	// 		image: "/images/an_uong.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365829466227737601',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365841731815474138',
	// 		displayName: 'Cà phê',
	// 		image: "/images/ca_phe.png",
	// 		isMoneyAdd: false,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365839929766315037',
	// 		userId: '8359841248751649795',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365841731815474139',
	// 		displayName: 'Nhà hàng',
	// 		image: "/images/nha_hang.png",
	// 		isMoneyAdd: false,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365839929766315037',
	// 		userId: '8359841248751649795',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365839929766315040',
	// 		displayName: 'Bạn bè và người yêu',
	// 		image: "/images/ban_be_va_nguoi_yeu.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365829466227737601',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365839929766315041',
	// 		displayName: 'Tặng và ủng hộ',
	// 		image: "/images/qua_tang_quyen_gop.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365829466227737601',

	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365839929766315042',
	// 		displayName: 'Đám cưới',
	// 		image: "/images/cuoi_hoi.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365839929766315041',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365839929766315043',
	// 		displayName: 'Đám tang',
	// 		image: "/images/tang_le.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365839929766315041',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365839929766315044',
	// 		displayName: 'Từ thiện',
	// 		image: "/images/tu_thien.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365839929766315041',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365839929766315045',
	// 		displayName: "Sức khỏe",
	// 		image: "/images/suc_khoe.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365829466227737601',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365839929766315046',
	// 		displayName: "Bảo hiểm",
	// 		image: "/images/bao_hiem.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365829466227737601',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365839929766315047',
	// 		displayName: "Mua sắm",
	// 		image: "/images/mua_sam.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365829466227737601',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365839929766315048',
	// 		displayName: "Quần áo",
	// 		image: "/images/quan_ao.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365839929766315047',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365839929766315049',
	// 		displayName: "Giày dép",
	// 		image: "/images/giay_dep.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365839929766315047',
	// 		createdAt: CREATED_AT
	// 	},

	// 	{
	// 		id: '8365839929766315050',
	// 		displayName: "Di chuyển",
	// 		image: "/images/di_chuyen.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365829466227737601',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365839929766315051',
	// 		displayName: "Xăng dầu",
	// 		image: "/images/xang_dau.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365839929766315050',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365839929766315052',
	// 		displayName: "Gửi xe",
	// 		image: "/images/gui_xe.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365839929766315050',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365839929766315053',
	// 		displayName: "Taxi",
	// 		image: "/images/taxi.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365829466227737601',
	// 		parentTransactionTypeId: '8365839929766315050',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365839929766315054',
	// 		displayName: 'Du lịch',
	// 		image: "/images/du_lich.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365829466227737601',
	// 		createdAt: CREATED_AT
	// 	},

	// 	//Khoản thu
	// 	{
	// 		id: '8365839929766315090',
	// 		displayName: 'Bán đồ',
	// 		image: "/images/ban_do.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365832911118664706',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365841731773531932',
	// 		displayName: 'Giải thưởng',
	// 		image: "/images/duoc_tang.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365832911118664706',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365841731781919474',
	// 		displayName: 'Lương',
	// 		image: "/images/luong.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365832911118664706',
	// 		userId: '8359841248751649795',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365841731807085275',
	// 		displayName: 'Thưởng',
	// 		image: "/images/thuong.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365832911118664706',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365841731807085111',
	// 		displayName: 'Tiền Lãi',
	// 		image: "/images/tien_lai.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365832911118664706',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365841731807085578',
	// 		displayName: 'Khoản thu khác',
	// 		image: "/images/khoan_thu_khac.png",
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365832911118664706',
	// 		createdAt: CREATED_AT
	// 	},


	// 	//Debt,Loan
	// 	{
	// 		id: '8365846352252371959',
	// 		displayName: 'Cho vay',
	// 		image: "/images/cho_vay.png",
	// 		isTransactionRelated: true,
	// 		isUserRelated: true,
	// 		isMoneyAdd: false,
	// 		transactionGroupId: '8365832911127053315',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365846352252371954',
	// 		displayName: 'Thu nợ',
	// 		image: "/images/thu_no.png",
	// 		isTransactionRelated: true,
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365832911127053315',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365846352260765084',
	// 		displayName: 'Đi vay',
	// 		image: "/images/di_vay.png",
	// 		isTransactionRelated: true,
	// 		isUserRelated: true,
	// 		isMoneyAdd: true,
	// 		transactionGroupId: '8365832911127053315',
	// 		createdAt: CREATED_AT
	// 	},
	// 	{
	// 		id: '8365846352629149193',
	// 		displayName: 'Trả nợ',
	// 		image: "/images/cho_vay.png",
	// 		isMoneyAdd: false,
	// 		transactionGroupId: '8365832911127053315',
	// 		createdAt: CREATED_AT
	// 	},
	// ]

	TRANSACTION_TYPES: [
		{
			id: '8365839929766315009',
			displayName: 'Mua sắm',
			image: "/images/ban_do.png",
			isMoneyAdd: false,
			transactionGroupId: '8365829466227737601',
			createdAt: CREATED_AT
		},
		{
			id: '8365841731773531138',
			displayName: 'Ăn uống',
			image: "/images/luong.png",
			isMoneyAdd: false,
			transactionGroupId: '8365829466227737601',
			createdAt: CREATED_AT
		},
		{
			id: '8365841731781919747',
			displayName: 'Di chuyển',
			image: "/images/thuong.png",
			isMoneyAdd: false,
			transactionGroupId: '8365829466227737601',
			userId: '8359841248751649795',
			createdAt: CREATED_AT
		},
		{
			id: '8365841731807085572',
			displayName: 'Du lịch',
			image: "/images/tien_lai.png",
			isMoneyAdd: false,
			transactionGroupId: '8365829466227737601',
			createdAt: CREATED_AT
		},
		{
			id: '8365839929766315909',
			displayName: 'Bạn Bè Và Người yêu',
			image: "/images/ban_be_va_nguoi_yeu.png",
			isMoneyAdd: false,
			transactionGroupId: '8365829466227737601',
			createdAt: CREATED_AT
		},
		{
			id: '8365841731773534475',
			displayName: 'Bảo hiểm',
			image: "/images/bao_hiem.png",
			isMoneyAdd: false,
			transactionGroupId: '8365829466227737601',
			createdAt: CREATED_AT
		},
		{
			id: '836584173178191012',
			displayName: 'Bảo dưỡng',
			image: "/images/bao_duong.png",
			isMoneyAdd: false,
			transactionGroupId: '8365829466227737601',
			userId: '8359841248751649795',
			createdAt: CREATED_AT
		},
		{
			id: '8365841731807085472',
			displayName: 'Gửi xe',
			image: "/images/gui_xe.png",
			isMoneyAdd: false,
			transactionGroupId: '8365829466227737601',
			createdAt: CREATED_AT
		},
		{
			id: '8365841731815474118',
			displayName: 'Taxi',
			image: "/images/taxi.png",
			isMoneyAdd: false,
			transactionGroupId: '8365829466227737601',
			parentTransactionTypeId: '8365841731807085572',
			userId: '8359841248751649795',
			createdAt: CREATED_AT
		},
		{
			id: '8365846352243983399',
			displayName: 'Khoản chi khác',
			image: "/images/khoan_thu_khac.png",
			isMoneyAdd: false,
			isTransactionRelated: false,
			transactionGroupId: '8365829466227737601',
			createdAt: CREATED_AT
		},



		{
			id: '8365839929766315090',
			displayName: 'Bán đồ',
			image: "/images/ban_do.png",
			isMoneyAdd: true,
			transactionGroupId: '8365832911118664706',
			createdAt: CREATED_AT
		},
		{
			id: '8365841731773531932',
			displayName: 'Được tặng',
			image: "/images/duoc_tang.png",
			isMoneyAdd: true,
			transactionGroupId: '8365832911118664706',
			createdAt: CREATED_AT
		},
		{
			id: '8365841731781919474',
			displayName: 'Lương',
			image: "/images/luong.png",
			isMoneyAdd: true,
			transactionGroupId: '8365832911118664706',
			userId: '8359841248751649795',
			createdAt: CREATED_AT
		},
		{
			id: '8365841731807085275',
			displayName: 'Thưởng',
			image: "/images/thuong.png",
			isMoneyAdd: true,
			transactionGroupId: '8365832911118664706',
			createdAt: CREATED_AT
		},
		{
			id: '8365841731807085111',
			displayName: 'Tiền Lãi',
			image: "/images/tien_lai.png",
			isMoneyAdd: true,
			transactionGroupId: '8365832911118664706',
			createdAt: CREATED_AT
		},
		{
			id: '8365841731807085578',
			displayName: 'Khoản thu khác',
			image: "/images/khoan_thu_khac.png",
			isMoneyAdd: true,
			transactionGroupId: '8365832911118664706',
			createdAt: CREATED_AT
		},



		{
			id: '8365846352252371959',
			displayName: 'Cho vay',
			image: "/images/cho_vay.png",
			isTransactionRelated: true,
			isUserRelated: true,
			isMoneyAdd: false,
			transactionGroupId: '8365832911127053315',
			createdAt: CREATED_AT
		},
		{
			id: '8365846352252371954',
			displayName: 'Thu nợ',
			image: "/images/thu_no.png",
			isTransactionRelated: true,
			isMoneyAdd: true,
			transactionGroupId: '8365832911127053315',
			createdAt: CREATED_AT
		},
		{
			id: '8365846352260765084',
			displayName: 'Đi vay',
			image: "/images/di_vay.png",
			isTransactionRelated: true,
			isUserRelated: true,
			isMoneyAdd: true,
			transactionGroupId: '8365832911127053315',
			createdAt: CREATED_AT
		},
		{
			id: '8365846352629149193',
			displayName: 'Trả nợ',
			image: "/images/cho_vay.png",
			isMoneyAdd: false,
			transactionGroupId: '8365832911127053315',
			createdAt: CREATED_AT
		},
	]
}

