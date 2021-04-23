const dataCategories = [
    {
        type: {
            name: "Income"
        },
        categories: [
            {
                categoryId: "1",
                nameTypeCategory: "Khoản chi",
                linkIconParent: "luong",
                name: "Mua sắm",
                linkIcon: "ban_do",
                nameParentCategory: "Lương",
                hasParentCategory: true,
                walletType: "Tiền mặt",
                createDefault: true
            },
            {
                categoryId: "1",
                nameTypeCategory: "Khoản chi",
                linkIconParent: null,
                name: "Ăn uống",
                linkIcon: "luong",
                nameParentCategory: "",
                hasParentCategory: false,
                walletType: "Tiền mặt",
                createDefault: true
            },
            {
                categoryId: "1",
                nameTypeCategory: "Khoản chi",
                linkIconParent: null,
                name: "Di chuyển",
                linkIcon: "thuong",
                nameParentCategory: null,
                hasParentCategory: false,
                walletType: "Tiền mặt",
                createDefault: true
            },
            {
                categoryId: "1",
                nameTypeCategory: "Khoản chi",
                linkIconParent: null,
                name: "Du lịch",
                linkIcon: "tien_lai",
                nameParentCategory: null,
                hasParentCategory: false,
                walletType: "Tiền mặt",
                createDefault: true
            },
            {
                categoryId: "1",
                nameTypeCategory: "Khoản chi",
                linkIconParent: null,
                name: "Bạn Bè Và Người yêu",
                linkIcon: "ban_be_va_nguoi_yeu",
                nameParentCategory: null,
                hasParentCategory: false,
                walletType: "Tiền mặt",
                createDefault: true
            },
            {
                categoryId: "1",
                nameTypeCategory: "Khoản chi",
                linkIconParent: null,
                name: "Bảo hiểm",
                linkIcon: "bao_hiem",
                nameParentCategory: null,
                hasParentCategory: false,
                walletType: "Tiền mặt",
                createDefault: true
            },
            {
                categoryId: "1",
                nameTypeCategory: "Khoản chi",
                linkIconParent: null,
                name: "Bảo dưỡng",
                linkIcon: "bao_duong",
                nameParentCategory: null,
                hasParentCategory: false,
                walletType: "Tiền mặt",
                createDefault: true
            },
            {
                categoryId: "1",
                nameTypeCategory: "Khoản chi",
                linkIconParent: null,
                name: "Gửi xe",
                linkIcon: "gui_xe",
                nameParentCategory: null,
                hasParentCategory: false,
                walletType: "Tiền mặt",
                createDefault: true
            },
            {
                categoryId: "1",
                nameTypeCategory: "Khoản chi",
                linkIconParent: null,
                name: "Taxi",
                linkIcon: "taxi",
                nameParentCategory: null,
                hasParentCategory: false,
                walletType: "Tiền mặt",
                createDefault: true
            },
            {
                categoryId: "1",
                nameTypeCategory: "Khoản chi",
                linkIconParent: null,
                name: "Khoản chi khác",
                linkIcon: "khoan_thu_khac",
                nameParentCategory: null,
                hasParentCategory: false,
                walletType: "Tiền mặt",
                createDefault: true
            }
        ]
    },
    {
        type: {
            name: "Expense"
        },
        categories: [
            {
                categoryId: "2",
                nameTypeCategory: "Khoản thu",
                linkIconParent: null,
                name: "Bán đồ",
                linkIcon: "ban_do",
                nameParentCategory: null,
                hasParentCategory: false,
                walletType: "Tiền mặt",
                createDefault: true
            },
            {
                categoryId: "2",
                nameTypeCategory: "Khoản thu",
                linkIconParent: null,
                name: "Được tặng",
                linkIcon: "duoc_tang",
                nameParentCategory: null,
                hasParentCategory: false,
                walletType: "Tiền mặt",
                createDefault: true
            },
            {
                categoryId: "2",
                nameTypeCategory: "Khoản thu",
                linkIconParent: null,
                name: "Lương",
                linkIcon: "luong",
                nameParentCategory: null,
                hasParentCategory: false,
                walletType: "Tiền mặt",
                createDefault: true
            },
            {
                categoryId: "2",
                nameTypeCategory: "Khoản thu",
                linkIconParent: null,
                name: "Thưởng",
                linkIcon: "thuong",
                nameParentCategory: null,
                hasParentCategory: false,
                walletType: "Tiền mặt",
                createDefault: true
            },
            {
                categoryId: "2",
                nameTypeCategory: "Khoản thu",
                linkIconParent: null,
                name: "Tiền Lãi",
                linkIcon: "tien_lai",
                nameParentCategory: null,
                hasParentCategory: false,
                walletType: "Tiền mặt",
                createDefault: true
            },
            {
                categoryId: "2",
                nameTypeCategory: "Khoản thu",
                linkIconParent: null,
                name: "Khoản thu khác",
                linkIcon: "khoan_thu_khac",
                nameParentCategory: null,
                hasParentCategory: false,
                walletType: "Tiền mặt",
                createDefault: true
            }
        ]
    },
    {
        type: {
            name: "DebtAndLoan"
        },
        categories: [
            {
                categoryId: "3",
                nameTypeCategory: "Vay nợ",
                linkIconParent: null,
                name: "Thu nợ",
                linkIcon: "thu_no",
                nameParentCategory: null,
                hasParentCategory: false,
                walletType: "Tiền mặt",
                createDefault: true
            },
            {
                categoryId: "3",
                nameTypeCategory: "Vay nợ",
                linkIconParent: null,
                name: "Đi vay",
                linkIcon: "di_vay",
                nameParentCategory: null,
                hasParentCategory: false,
                walletType: "Tiền mặt",
                createDefault: true
            },
            {
                categoryId: "3",
                nameTypeCategory: "Vay nợ",
                linkIconParent: null,
                name: "Cho vay",
                linkIcon: "cho_vay",
                nameParentCategory: null,
                hasParentCategory: false,
                walletType: "Tiền mặt",
                createDefault: true
            },
            {
                categoryId: "3",
                nameTypeCategory: "Vay nợ",
                linkIconParent: null,
                name: "Trả nợ",
                linkIcon: "tra_no",
                nameParentCategory: null,
                hasParentCategory: false,
                walletType: "Tiền mặt",
                createDefault: true
            }
        ]
    }
];

export { dataCategories };
