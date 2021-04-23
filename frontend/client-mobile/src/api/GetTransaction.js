
import UrlIcon from '../constants/URLImages';
const dataCurrentMonth = [
    {
        detailTime: {
            day: '01',
            weekDay: 'Thứ 3',
            monthAndYear: 'Tháng 10, 2019',
            sumMoney: '+ 5,000,000.00',
        },
        listTransaction: [
            {
                name: 'Cà phê',
                description: '',
                money: '50,000.00',
                urlIcon: UrlIcon.coffeeCupIcon
            },
            {
                name: 'Ăn uống',
                description: '',
                money: '20,000.00',
                urlIcon: UrlIcon.eatIcon
            },
            {
                name: 'Đổ xăng',
                description: '',
                money: '70,000.00',
                urlIcon: UrlIcon.gasIcon
            },
            {
                name: 'Khoản thu khác',
                description: 'Điều chỉnh số dư',
                money: '100,000.00',
                urlIcon: UrlIcon.revenueOtherIcon
            }
        ],

    },
    {
        detailTime: {
            day: '02',
            weekDay: 'Thứ 4',
            monthAndYear: 'Tháng 10, 2019',
            sumMoney: '- 50,000.00',
        },
        listTransaction: [
            {
                name: 'Cà phê',
                description: '',
                money: '50,000.00',
                urlIcon: UrlIcon.coffeeCupIcon
            }
        ],

    },
    {
        detailTime: {
            day: '04',
            weekDay: 'Thứ 5',
            monthAndYear: 'Tháng 10, 2019',
            sumMoney: '- 550,000.00',
        },
        listTransaction: [
            {
                name: 'Ăn sáng',
                description: '',
                money: '50,000.00',
                urlIcon: UrlIcon.coffeeCupIcon
            },
            {
                name: 'Ăn cưới',
                description: '',
                money: '500,000.00',
                urlIcon: UrlIcon.coffeeCupIcon
            }
        ],

    }
];

const dataLastMonth = [
    {
        detailTime: {
            day: '04',
            weekDay: 'Thứ 5',
            monthAndYear: 'Tháng 10, 2019',
            sumMoney: '- 550,000.00',
        },
        listTransaction: [
            {
                name: 'Ăn sáng',
                description: '',
                money: '50,000.00',
                urlIcon: UrlIcon.coffeeCupIcon
            },
            {
                name: 'Ăn cưới',
                description: '',
                money: '500,000.00',
                urlIcon: UrlIcon.coffeeCupIcon
            }
        ],

    }
];
const dataFuture = [];

export {
    dataCurrentMonth,
    dataLastMonth,
    dataFuture
}