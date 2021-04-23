import moment from 'moment-timezone'
import config from '../../../config/config'

export default {
    retrieveCurrentMonth: (state, payload) => {
        state.transactionCurrentMonth = payload;
    },
    retrieveLastMonth: (state, payload) => {
        state.transactionLastMonth = payload
    },
    retrieveDebtCollection: (state, payload) => {
        state.transactionDebtCollection = payload
    },
    retrieveRepayment: (state, payload) => {
        state.transactionRepayment = payload
    },
    addNewTransaction: (state, payload) => {
        let isMoneyAdd = payload.isMoneyAdd;
        let walletLocalStorage = JSON.parse(localStorage.getItem('wallet'))
        let accountBalance = isMoneyAdd ? Number(walletLocalStorage.accountBalance) + payload.moneyInt : Number(walletLocalStorage.accountBalance) - payload.moneyInt;
        walletLocalStorage.accountBalance = accountBalance
        localStorage.setItem('wallet', JSON.stringify(walletLocalStorage))
        state.wallet = walletLocalStorage
        state.walletIcon = walletLocalStorage.image
        state.walletName = walletLocalStorage.displayName
        state.walletId = walletLocalStorage.id

        //
        if (state.transactionCurrentMonth.length <= 0) {
            let today = new Date();
            let dateDataServer = moment(today).tz('Asia/Ho_Chi_Minh');
            let sumMoney = 0;
            let sumMoneyUpdate = isMoneyAdd ? sumMoney + payload.moneyInt : sumMoney - payload.moneyInt;
            let detailTimeFirst = {
                day: dateDataServer.date(),
                weekDay: formatWeekDayVN(dateDataServer.format('dddd').toString()),
                monthAndYear: formatMonthVN(dateDataServer.format('MMMM').toString()) + ' - ' + dateDataServer.format('YYYY').toString(),
                sumMoney: formatMoney(sumMoneyUpdate, 0, '.', ','),
                sumMoneyInt: sumMoneyUpdate,
                fullday: moment(today).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY')
            }
            let transactionFirst = [payload]
            state.transactionCurrentMonth = [{ listTransaction: transactionFirst, detailTime: detailTimeFirst }]
        }
        else {
            let sumMoney = state.transactionCurrentMonth[0].detailTime.sumMoneyInt;
            let sumMoneyUpdate = isMoneyAdd ? sumMoney + payload.moneyInt : sumMoney - payload.moneyInt;
            state.transactionCurrentMonth[0].detailTime.sumMoneyInt = sumMoneyUpdate;
            state.transactionCurrentMonth[0].detailTime.sumMoney = formatMoney(sumMoneyUpdate, 0, '.', ',')
            let listTransaction = state.transactionCurrentMonth[0].listTransaction;
            listTransaction.unshift(payload)
        }

    },
    changIdTransaction: (state, payload) => {
        if (state.transactionCurrentMonth.length <= 0) {
        }
        else {
            state.transactionCurrentMonth[0].listTransaction.filter(item => item.id === payload.idOld)
                .map(itemMap => {
                    return itemMap.id = payload.idNew;
                });
        }
    },
    changIdTransactionCashBack: (state, payload) => {
        state.transactionCurrentMonth[0].listTransaction[0].id = payload.idNew
    },

    removeTransaction: (state, idTransaction) => {

        let walletLocalStorage = JSON.parse(localStorage.getItem('wallet'))

        //

        let indexDayCurrent = -1;
        let indexDayLast = -1;
        let indexTransactionCurrent = -1
        let indexTransactionLast = -1;
        state.transactionCurrentMonth.forEach((currentMonth, index) => {
            let temp1 = currentMonth.listTransaction.findIndex(item => item.id == idTransaction);
            if (temp1 != -1) {
                indexDayCurrent = index;
                indexTransactionCurrent = temp1
            }
        })
        state.transactionLastMonth.forEach((lastMonth, index) => {
            let temp2 = lastMonth.listTransaction.findIndex(item => item.id == idTransaction);
            if (temp2 != -1) {
                indexDayLast = index;
                indexTransactionLast = temp2
            }
        })
        if (indexTransactionLast != -1) {
            let sumMoney = state.transactionLastMonth[indexDayLast].detailTime.sumMoneyInt;
            let isMoneyAdd = state.transactionLastMonth[indexDayLast].listTransaction[indexTransactionLast].isMoneyAdd;
            let moneyTransaction = state.transactionLastMonth[indexDayLast].listTransaction[indexTransactionLast].moneyInt;
            let sumMoneyUpdate = isMoneyAdd ? sumMoney - moneyTransaction : sumMoney + moneyTransaction;
            state.transactionLastMonth[indexDayLast].detailTime.sumMoneyInt = sumMoneyUpdate;
            state.transactionLastMonth[indexDayLast].detailTime.sumMoney = formatMoney(sumMoneyUpdate, 0, '.', ',')

            //  localStorage
            let accountBalance = isMoneyAdd ? Number(walletLocalStorage.accountBalance) - moneyTransaction : Number(walletLocalStorage.accountBalance) + moneyTransaction;
            walletLocalStorage.accountBalance = accountBalance

            //
            state.transactionLastMonth[indexDayLast].listTransaction.splice(indexTransactionLast, 1);
        }
        if (indexTransactionCurrent != -1) {
            let sumMoney = state.transactionCurrentMonth[indexDayCurrent].detailTime.sumMoneyInt;
            let isMoneyAdd = state.transactionCurrentMonth[indexDayCurrent].listTransaction[indexTransactionCurrent].isMoneyAdd;
            let moneyTransaction = state.transactionCurrentMonth[indexDayCurrent].listTransaction[indexTransactionCurrent].moneyInt;
            let sumMoneyUpdate = isMoneyAdd ? sumMoney - moneyTransaction : sumMoney + moneyTransaction;
            state.transactionCurrentMonth[indexDayCurrent].detailTime.sumMoneyInt = sumMoneyUpdate;
            state.transactionCurrentMonth[indexDayCurrent].detailTime.sumMoney = formatMoney(sumMoneyUpdate, 0, '.', ',')

            //  localStorage
            let accountBalance = isMoneyAdd ? Number(walletLocalStorage.accountBalance) - moneyTransaction : Number(walletLocalStorage.accountBalance) + moneyTransaction;
            walletLocalStorage.accountBalance = accountBalance

            //
            state.transactionCurrentMonth[indexDayCurrent].listTransaction.splice(indexTransactionCurrent, 1);
        }

        localStorage.setItem('wallet', JSON.stringify(walletLocalStorage))
        state.wallet = walletLocalStorage
        state.walletIcon = walletLocalStorage.image
        state.walletName = walletLocalStorage.displayName
        state.walletId = walletLocalStorage.id
    },
    cashBackMoneyTransaction: (state, payload) => {
        console.log("cashBack mutation", payload)
        let indexDayCurrent = -1;
        let indexDayLast = -1;
        let indexTransactionCurrent = -1
        let indexTransactionLast = -1;
        let indexDebtCurrent = -1;
        let indexDayDebtCurrent = -1;

        let indexRepaymentCurrent = -1;
        let indexDayRepaymentCurrent = -1;

        state.transactionCurrentMonth.forEach((currentMonth, index) => {
            let temp1 = currentMonth.listTransaction.findIndex(item => item.id == payload.currentTransaction.id);
            if (temp1 != -1) {
                indexDayCurrent = index;
                indexTransactionCurrent = temp1
            }
        })
        // state.transactionLastMonth.forEach((lastMonth, index) => {
        //     let temp2 = lastMonth.listTransaction.findIndex(item => item.id == payload.currentTransaction.id);
        //     if (temp2 != -1) {
        //         indexDayLast = index;
        //         indexTransactionLast = temp2
        //     }
        // })

        // if (indexTransactionLast != -1) {
        //     let sumMoney = state.transactionLastMonth[indexDayLast].detailTime.sumMoneyInt;
        //     let isMoneyAdd = state.transactionLastMonth[indexDayLast].listTransaction[indexTransactionLast].isMoneyAdd;
        //     let moneyTransaction = state.transactionLastMonth[indexDayLast].listTransaction[indexTransactionLast].moneyInt;
        //     let sumMoneyUpdate = isMoneyAdd ? sumMoney - moneyTransaction : sumMoney + moneyTransaction;
        //     state.transactionLastMonth[indexDayLast].detailTime.sumMoneyInt = sumMoneyUpdate;
        //     state.transactionLastMonth[indexDayLast].detailTime.sumMoney = formatMoney(sumMoneyUpdate, 0, '.', ',')

        //     state.transactionLastMonth[indexDayLast].listTransaction.splice(indexTransactionLast, 1);
        // }
        if (indexTransactionCurrent != -1) {
            let sumMoney = state.transactionCurrentMonth[indexDayCurrent].detailTime.sumMoneyInt;
            let isMoneyAdd = state.transactionCurrentMonth[indexDayCurrent].listTransaction[indexTransactionCurrent].isMoneyAdd;
            let sumMoneyUpdate = isMoneyAdd ? sumMoney - Number(payload.cashBackMoney) : sumMoney + Number(payload.cashBackMoney)
            let moneyRemain = state.transactionCurrentMonth[indexDayCurrent].listTransaction[indexTransactionCurrent].moneyRemain;
            let moneyPaid = state.transactionCurrentMonth[indexDayCurrent].listTransaction[indexTransactionCurrent].moneyPaid;
            state.transactionCurrentMonth[indexDayCurrent].listTransaction[indexTransactionCurrent].moneyPaid = Number(moneyPaid) + Number(payload.cashBackMoney)
            state.transactionCurrentMonth[indexDayCurrent].listTransaction[indexTransactionCurrent].moneyRemain = Number(moneyRemain) - Number(payload.cashBackMoney)
            state.transactionCurrentMonth[indexDayCurrent].detailTime.sumMoneyInt = sumMoneyUpdate;
            state.transactionCurrentMonth[indexDayCurrent].detailTime.sumMoney = formatMoney(sumMoneyUpdate, 0, '.', ',')
        }
    },

    updateMoneyCashBack: (state, payload) => {
        state.transactionCurrentMonth[0].listTransaction.filter(item => item.id === payload.idOld)
            .map(itemMap => {
                return (
                    itemMap.id = payload.idNew,
                    itemMap.moneyRemain = payload.moneyRemain,
                    itemMap.moneyPaid = payload.moneyPaid
                )
            });
    },
    setTransactionDebt: (state, payload) => {
        state.transactionDebt = payload;
    },
    updateTransaction: (state, payload) => {
        let indexDayCurrent = -1;
        let indexDayLast = -1;
        let indexTransactionCurrent = -1
        let indexTransactionLast = -1;
        state.transactionCurrentMonth.forEach((currentMonth, index) => {
            let temp1 = currentMonth.listTransaction.findIndex(item => item.id == payload.id);
            if (temp1 != -1) {
                indexDayCurrent = index;
                indexTransactionCurrent = temp1
            }
        })
        state.transactionLastMonth.forEach((lastMonth, index) => {
            let temp2 = lastMonth.listTransaction.findIndex(item => item.id == payload.id);
            if (temp2 != -1) {
                indexDayLast = index;
                indexTransactionLast = temp2
            }
        })

        let walletLocalStorage = JSON.parse(localStorage.getItem('wallet'))
        let accountBalance = 0

        if (indexTransactionCurrent != -1) {
            let sumMoney = state.transactionCurrentMonth[indexDayCurrent].detailTime.sumMoneyInt;
            let moneyTransactionBefore = state.transactionCurrentMonth[indexDayCurrent].listTransaction[indexTransactionCurrent].moneyInt;
            let moneyTransactionAfter = payload.money
            let sumMoneyUpdate = 0;
            if (payload.categoryDetail.isMoneyAdd) {
                sumMoneyUpdate = Number.parseInt(sumMoney) - Number.parseInt(moneyTransactionBefore) + Number.parseInt(moneyTransactionAfter)
                accountBalance = Number(walletLocalStorage.accountBalance) - Number.parseInt(moneyTransactionBefore) + Number.parseInt(moneyTransactionAfter)
            }
            else {
                sumMoneyUpdate = Number.parseInt(sumMoney) + Number.parseInt(moneyTransactionBefore) - Number.parseInt(moneyTransactionAfter)
                accountBalance = Number(walletLocalStorage.accountBalance) + Number.parseInt(moneyTransactionBefore) - Number.parseInt(moneyTransactionAfter)
            }
            walletLocalStorage.accountBalance = accountBalance
            localStorage.setItem('wallet', JSON.stringify(walletLocalStorage))
            state.wallet = walletLocalStorage

            state.transactionCurrentMonth[indexDayCurrent].detailTime.sumMoneyInt = sumMoneyUpdate;
            state.transactionCurrentMonth[indexDayCurrent].detailTime.sumMoney = formatMoney(sumMoneyUpdate, 0, '.', ',')
            state.transactionCurrentMonth[indexDayCurrent].listTransaction[indexTransactionCurrent].name = payload.categoryDetail.nameCategory
            state.transactionCurrentMonth[indexDayCurrent].listTransaction[indexTransactionCurrent].description = payload.description
            state.transactionCurrentMonth[indexDayCurrent].listTransaction[indexTransactionCurrent].money = formatMoney(payload.money, 0, '.', ',')
            state.transactionCurrentMonth[indexDayCurrent].listTransaction[indexTransactionCurrent].moneyInt = payload.money
            state.transactionCurrentMonth[indexDayCurrent].listTransaction[indexTransactionCurrent].image = payload.categoryDetail.image
            state.transactionCurrentMonth[indexDayCurrent].listTransaction[indexTransactionCurrent].relatedUserName = payload.contact
            state.transactionCurrentMonth[indexDayCurrent].listTransaction[indexTransactionCurrent].isMoneyAdd = payload.categoryDetail.isMoneyAdd
            state.transactionCurrentMonth[indexDayCurrent].listTransaction[indexTransactionCurrent].idCategory = payload.categoryDetail.idCategory

        }
        if (indexTransactionLast != -1) {
            let sumMoney = state.transactionLastMonth[indexDayLast].detailTime.sumMoneyInt;
            let moneyTransactionBefore = state.transactionLastMonth[indexDayLast].listTransaction[indexTransactionLast].moneyInt;
            let moneyTransactionAfter = payload.money
            let sumMoneyUpdate = 0;
            if (payload.categoryDetail.isMoneyAdd) {
                sumMoneyUpdate = Number.parseInt(sumMoney) - Number.parseInt(moneyTransactionBefore) + Number.parseInt(moneyTransactionAfter)
                accountBalance = Number(walletLocalStorage.accountBalance) - Number.parseInt(moneyTransactionBefore) + Number.parseInt(moneyTransactionAfter)
            }
            else {
                sumMoneyUpdate = Number.parseInt(sumMoney) + Number.parseInt(moneyTransactionBefore) - Number.parseInt(moneyTransactionAfter)
                accountBalance = Number(walletLocalStorage.accountBalance) + Number.parseInt(moneyTransactionBefore) - Number.parseInt(moneyTransactionAfter)
            }
            walletLocalStorage.accountBalance = accountBalance
            localStorage.setItem('wallet', JSON.stringify(walletLocalStorage))
            state.wallet = walletLocalStorage

            state.transactionLastMonth[indexDayLast].detailTime.sumMoneyInt = sumMoneyUpdate;
            state.transactionLastMonth[indexDayLast].detailTime.sumMoney = formatMoney(sumMoneyUpdate, 0, '.', ',')
            state.transactionLastMonth[indexDayLast].detailTime.sumMoneyInt = sumMoneyUpdate;
            state.transactionLastMonth[indexDayLast].detailTime.sumMoney = formatMoney(sumMoneyUpdate, 0, '.', ',')
            state.transactionLastMonth[indexDayLast].listTransaction[indexTransactionLast].name = payload.categoryDetail.nameCategory
            state.transactionLastMonth[indexDayLast].listTransaction[indexTransactionLast].description = payload.description
            state.transactionLastMonth[indexDayLast].listTransaction[indexTransactionLast].money = formatMoney(payload.money, 0, '.', ',')
            state.transactionLastMonth[indexDayLast].listTransaction[indexTransactionLast].moneyInt = payload.money
            state.transactionLastMonth[indexDayLast].listTransaction[indexTransactionLast].image = payload.categoryDetail.image
            state.transactionLastMonth[indexDayLast].listTransaction[indexTransactionLast].relatedUserName = payload.contact
            state.transactionLastMonth[indexDayLast].listTransaction[indexTransactionLast].isMoneyAdd = payload.categoryDetail.isMoneyAdd
            state.transactionLastMonth[indexDayLast].listTransaction[indexTransactionLast].idCategory = payload.categoryDetail.idCategory
        }

    },
    setDataReport: (state, payload) => {
        console.log("data report mutation", payload);
        state.dataReport = payload
    },
    setDataReportPieExpense: (state, payload) => {
        state.dataReportPieExpense = payload
    },
    setDataReportPieIncome: (state, payload) => {
        state.dataReportPieIncome = payload
    },
    changeWallet: (state, wallet) => {
        if (JSON.parse(localStorage.getItem('wallet'))) {
            let idWalletLocal = JSON.parse(localStorage.getItem('wallet')).id
            if (idWalletLocal !== wallet.id) {
                localStorage.setItem('wallet', JSON.stringify(wallet))
                localStorage.setItem('walletId', wallet.id)
                state.wallet = wallet
                state.walletId = wallet.id
                state.walletName = wallet.displayName
                state.walletIcon = wallet.image
            } else {
                return
            }
        }
    }
}


function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : " đ");
    } catch (e) {
        console.log(e)
    }
};

function formatWeekDayVN(weekDay) {
    switch (weekDay) {
        case 'Monday':
            weekDay = "Thứ 2"
            break;
        case 'Tuesday':
            weekDay = "Thứ 3"
            break;
        case 'Wednesday':
            weekDay = "Thứ 4"
            break;
        case 'Thursday':
            weekDay = "Thứ 5"
            break;
        case 'Friday':
            weekDay = "Thứ 6"
            break;
        case 'Saturday':
            weekDay = "Thứ 7"
            break;
        case 'Sunday':
            weekDay = "Chủ Nhật"
            break;
        default:
            break;
    }
    return weekDay;
}

function formatMonthVN(month) {
    switch (month) {
        case 'January':
            month = 'Tháng 1'
            break;
        case 'February':
            month = 'Tháng 2'
            break;
        case 'March':
            month = 'Tháng 3'
            break;
        case 'April':
            month = 'Tháng 4'
            break;
        case 'May':
            month = 'Tháng 5'
            break;
        case 'June':
            month = 'Tháng 6'
            break;
        case 'July':
            month = 'Tháng 7'
            break;
        case 'August':
            month = 'Tháng 8'
            break;
        case 'September':
            month = 'Tháng 9'
            break;
        case 'October':
            month = 'Tháng 10'
            break;
        case 'November':
            month = 'Tháng 11'
            break;
        case 'December':
            month = 'Tháng 12'
            break;
        default:
            break;
    }
    return month;
}
