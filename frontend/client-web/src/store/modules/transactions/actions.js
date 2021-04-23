import axios from 'axios'
import moment from 'moment-timezone'
import config from '../../../config/config'

axios.defaults.baseURL = config.urlServer;

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

export default {
    retrieveTransactions: ({ commit }, walletId) => {
        let date = moment.utc().format();
        var dateFrom = moment(date).subtract(1, 'months').utc().format();
        let dataCurrentMonth = [];
        let dataLastMonth = []
        let token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get(`/transactions?date=${date}&walletId=${walletId}&byMonth=true&sortBy=createdAt&sortType=desc&relations=transactionType&relations=wallet&pageSize=5000`)
            .then(res => {
                if (res.data.items.length <= 0) {
                    commit('retrieveCurrentMonth', [])
                }
                else {
                    let dataFormat = res.data.items;
                    let listOfDay = [];
                    for (let i = 0; i < dataFormat.length; i++) {
                        let date = moment(dataFormat[i].createdAt).tz('Asia/Ho_Chi_Minh').format('MMMM Do YYYY dddd');
                        listOfDay.push(date);
                    }
                    let newlistOfDay = listOfDay.filter(
                        (item, index) => {
                            return listOfDay.indexOf(item) === index;
                        }
                    )
                    for (let i = 0; i < newlistOfDay.length; i++) {
                        let DateData = {};
                        DateData.listTransaction = [];
                        let sumMoney = 0;
                        for (let j = 0; j < dataFormat.length; j++) {
                            if (dataFormat[j].transactionType) {
                                let dateDataServer = moment(dataFormat[j].createdAt).tz('Asia/Ho_Chi_Minh');
                                let weekDay = formatWeekDayVN(dateDataServer.format('dddd').toString());
                                let month = formatMonthVN(dateDataServer.format('MMMM').toString());
                                if (newlistOfDay[i] === dateDataServer.format('MMMM Do YYYY dddd')) {
                                    let checkMoney = dataFormat[j].transactionType.isMoneyAdd
                                    sumMoney = checkMoney ? sumMoney + dataFormat[j].money : sumMoney - dataFormat[j].money
                                    DateData.detailTime = {
                                        day: dateDataServer.date(),
                                        weekDay: weekDay,
                                        monthAndYear: month + ' - ' + dateDataServer.format('YYYY').toString(),
                                        sumMoney: formatMoney(sumMoney, 0, '.', ','),
                                        sumMoneyInt: sumMoney,
                                        fullday: moment(dataFormat[j].createdAt).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY')
                                    }
                                    let listTransactionData = {
                                        id: dataFormat[j].id,
                                        idCategory: dataFormat[j].transactionType.id,
                                        name: dataFormat[j].transactionType.displayName,
                                        description: dataFormat[j].description,
                                        money: formatMoney(dataFormat[j].money, 0, '.', ','),
                                        moneyInt: dataFormat[j].money,
                                        moneyPaid: dataFormat[j].moneyPaid,
                                        moneyRemain: dataFormat[j].moneyRemain,
                                        image: dataFormat[j].transactionType.image,
                                        relatedUserName: dataFormat[j].relatedUserName,
                                        isUserRelated: dataFormat[j].transactionType.isUserRelated,
                                        isMoneyAdd: dataFormat[j].transactionType.isMoneyAdd,
                                        walletName: dataFormat[j].wallet.displayName,
                                        walletId: dataFormat[j].wallet.id,
                                        walletImage: dataFormat[j].wallet.image,
                                        createdAt: dataFormat[j].createdAt
                                    }
                                    DateData.listTransaction.push(listTransactionData);
                                }
                            }
                        }
                        dataCurrentMonth.push(DateData);
                    }
                    commit('retrieveCurrentMonth', dataCurrentMonth)
                }
            })
            .catch(error => console.log(error));

        axios.get(`/transactions?date=${dateFrom}&walletId=${walletId}&byMonth=true&sortBy=createdAt&sortType=desc&relations=transactionType&relations=wallet&pageSize=5000`)
            .then(res => {
                if (res.data.items.length <= 0) {
                    commit('retrieveLastMonth', [])
                }
                else {
                    let dataFormat = res.data.items;
                    let listOfDay = [];
                    for (let i = 0; i < dataFormat.length; i++) {
                        let date = moment(dataFormat[i].createdAt).tz('Asia/Ho_Chi_Minh').format('MMMM Do YYYY dddd');
                        listOfDay.push(date);
                    }
                    let newlistOfDay = listOfDay.filter(
                        (item, index) => {
                            return listOfDay.indexOf(item) === index;
                        }
                    )
                    for (let i = 0; i < newlistOfDay.length; i++) {
                        let DateData = {};
                        DateData.listTransaction = [];
                        let sumMoney = 0;
                        for (let j = 0; j < dataFormat.length; j++) {
                            if (dataFormat[j].transactionType) {
                                let dateDataServer = moment(dataFormat[j].createdAt).tz('Asia/Ho_Chi_Minh');
                                let weekDay = formatWeekDayVN(dateDataServer.format('dddd').toString());
                                let month = formatMonthVN(dateDataServer.format('MMMM').toString());

                                if (newlistOfDay[i] === dateDataServer.format('MMMM Do YYYY dddd')) {
                                    let day = dateDataServer.format('Do');
                                    let checkMoney = dataFormat[j].transactionType.isMoneyAdd
                                    sumMoney = checkMoney ? sumMoney + dataFormat[j].money : sumMoney - dataFormat[j].money
                                    DateData.detailTime = {
                                        day: dateDataServer.date(),
                                        weekDay: weekDay,
                                        monthAndYear: month + ' - ' + dateDataServer.format('YYYY').toString(),
                                        sumMoney: formatMoney(sumMoney, 0, '.', ','),
                                        sumMoneyInt: sumMoney,
                                        // fullday: dateDataServer.format('dd MM YYYY').toString()
                                        // fullday: weekDay + ' , ' + dateDataServer.date() + '/' + dateDataServer.format('MM').toString() + '/' + dateDataServer.format('YYYY').toString(),
                                        fullday: moment(dataFormat[j].createdAt).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY')
                                    }
                                    let listTransactionData = {
                                        id: dataFormat[j].id,
                                        idCategory: dataFormat[j].transactionType.id,
                                        name: dataFormat[j].transactionType.displayName,
                                        description: dataFormat[j].description,
                                        money: formatMoney(dataFormat[j].money, 0, '.', ','),
                                        moneyInt: dataFormat[j].money,
                                        moneyPaid: dataFormat[j].moneyPaid,
                                        moneyRemain: dataFormat[j].moneyRemain,
                                        image: dataFormat[j].transactionType.image,
                                        relatedUserName: dataFormat[j].relatedUserName,
                                        isUserRelated: dataFormat[j].transactionType.isUserRelated,
                                        isMoneyAdd: dataFormat[j].transactionType.isMoneyAdd,
                                        walletName: dataFormat[j].wallet.displayName,
                                        walletId: dataFormat[j].wallet.id,
                                        walletImage: dataFormat[j].wallet.image,
                                        createdAt: dataFormat[j].createdAt
                                    }
                                    DateData.listTransaction.push(listTransactionData);
                                }
                            }
                        }
                        dataLastMonth.push(DateData);
                    }
                    commit('retrieveLastMonth', dataLastMonth)
                }
            })
            .catch(error => console.log(error));

    },
    retrieveTransactionsDebt: ({ commit }, walletId) => {
        let date = moment.utc().format();
        var dateFrom = moment(date).subtract(1, 'months').utc().format();
        let dataDebt = [];
        let dataRepayment = []
        let token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get(`/transactions/debt-list?walletId=${walletId}&relations=transactionType&relations=wallet`)
            .then(res => {
                if (res.data.items.length <= 0) {
                    commit('retrieveDebtCollection', [])
                }
                else {
                    let dataFormat = res.data.items;
                    let listOfDay = [];
                    for (let i = 0; i < dataFormat.length; i++) {
                        let date = moment(dataFormat[i].createdAt).tz('Asia/Ho_Chi_Minh').format('MMMM Do YYYY dddd');
                        listOfDay.push(date);
                    }
                    let newlistOfDay = listOfDay.filter(
                        (item, index) => {
                            return listOfDay.indexOf(item) === index;
                        }
                    )
                    for (let i = 0; i < newlistOfDay.length; i++) {
                        let DateData = {};
                        DateData.listTransaction = [];
                        let sumMoney = 0;
                        for (let j = 0; j < dataFormat.length; j++) {
                            if (dataFormat[j].transactionType) {
                                let dateDataServer = moment(dataFormat[j].createdAt).tz('Asia/Ho_Chi_Minh');
                                let weekDay = formatWeekDayVN(dateDataServer.format('dddd').toString());
                                let month = formatMonthVN(dateDataServer.format('MMMM').toString());
                                if (newlistOfDay[i] === dateDataServer.format('MMMM Do YYYY dddd')) {
                                    let checkMoney = dataFormat[j].transactionType.isMoneyAdd
                                    sumMoney = checkMoney ? sumMoney + dataFormat[j].money : sumMoney - dataFormat[j].money
                                    DateData.detailTime = {
                                        day: dateDataServer.date(),
                                        weekDay: weekDay,
                                        monthAndYear: month + ' - ' + dateDataServer.format('YYYY').toString(),
                                        sumMoney: formatMoney(sumMoney, 0, '.', ','),
                                        sumMoneyInt: sumMoney,
                                        fullday: moment(dataFormat[j].createdAt).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY')
                                    }
                                    let listTransactionData = {
                                        id: dataFormat[j].id,
                                        idCategory: dataFormat[j].transactionType.id,
                                        name: dataFormat[j].transactionType.displayName,
                                        description: dataFormat[j].description,
                                        money: formatMoney(dataFormat[j].money, 0, '.', ','),
                                        moneyInt: dataFormat[j].money,
                                        moneyPaid: dataFormat[j].moneyPaid,
                                        moneyRemain: dataFormat[j].moneyRemain,
                                        image: dataFormat[j].transactionType.image,
                                        relatedUserName: dataFormat[j].relatedUserName,
                                        isUserRelated: dataFormat[j].transactionType.isUserRelated,
                                        isMoneyAdd: dataFormat[j].transactionType.isMoneyAdd,
                                        walletName: dataFormat[j].wallet.displayName,
                                        walletId: dataFormat[j].wallet.id,
                                        walletImage: dataFormat[j].wallet.image,
                                        createdAt: dataFormat[j].createdAt
                                    }
                                    DateData.listTransaction.push(listTransactionData);
                                }
                            }
                        }
                        dataDebt.push(DateData);
                    }
                    commit('retrieveDebtCollection', dataDebt)
                }
            })
            .catch(error => console.log(error));

        axios.get(`/transactions/lend-list?walletId=${walletId}&relations=transactionType&relations=wallet`)
            .then(res => {
                if (res.data.items.length <= 0) {
                    commit('retrieveRepayment', [])
                }
                else {
                    let dataFormat = res.data.items;
                    let listOfDay = [];
                    for (let i = 0; i < dataFormat.length; i++) {
                        let date = moment(dataFormat[i].createdAt).tz('Asia/Ho_Chi_Minh').format('MMMM Do YYYY dddd');
                        listOfDay.push(date);
                    }
                    let newlistOfDay = listOfDay.filter(
                        (item, index) => {
                            return listOfDay.indexOf(item) === index;
                        }
                    )
                    for (let i = 0; i < newlistOfDay.length; i++) {
                        let DateData = {};
                        DateData.listTransaction = [];
                        let sumMoney = 0;
                        for (let j = 0; j < dataFormat.length; j++) {
                            if (dataFormat[j].transactionType) {
                                let dateDataServer = moment(dataFormat[j].createdAt).tz('Asia/Ho_Chi_Minh');
                                let weekDay = formatWeekDayVN(dateDataServer.format('dddd').toString());
                                let month = formatMonthVN(dateDataServer.format('MMMM').toString());

                                if (newlistOfDay[i] === dateDataServer.format('MMMM Do YYYY dddd')) {
                                    let day = dateDataServer.format('Do');
                                    let checkMoney = dataFormat[j].transactionType.isMoneyAdd
                                    sumMoney = checkMoney ? sumMoney + dataFormat[j].money : sumMoney - dataFormat[j].money
                                    DateData.detailTime = {
                                        day: dateDataServer.date(),
                                        weekDay: weekDay,
                                        monthAndYear: month + ' - ' + dateDataServer.format('YYYY').toString(),
                                        sumMoney: formatMoney(sumMoney, 0, '.', ','),
                                        sumMoneyInt: sumMoney,
                                        fullday: moment(dataFormat[j].createdAt).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY')
                                    }
                                    let listTransactionData = {
                                        id: dataFormat[j].id,
                                        idCategory: dataFormat[j].transactionType.id,
                                        name: dataFormat[j].transactionType.displayName,
                                        description: dataFormat[j].description,
                                        money: formatMoney(dataFormat[j].money, 0, '.', ','),
                                        moneyInt: dataFormat[j].money,
                                        moneyPaid: dataFormat[j].moneyPaid,
                                        moneyRemain: dataFormat[j].moneyRemain,
                                        image: dataFormat[j].transactionType.image,
                                        relatedUserName: dataFormat[j].relatedUserName,
                                        isUserRelated: dataFormat[j].transactionType.isUserRelated,
                                        isMoneyAdd: dataFormat[j].transactionType.isMoneyAdd,
                                        walletName: dataFormat[j].wallet.displayName,
                                        walletId: dataFormat[j].wallet.id,
                                        walletImage: dataFormat[j].wallet.image,
                                        createdAt: dataFormat[j].createdAt
                                    }
                                    DateData.listTransaction.push(listTransactionData);
                                }
                            }
                        }
                        dataRepayment.push(DateData);
                    }
                    commit('retrieveRepayment', dataRepayment)
                }
            })
            .catch(error => console.log(error));
    },

    actionAddNewTransaction: ({ commit }, payload) => {
        const walletId = localStorage.getItem('walletId')
        let moneyPaid = undefined
        let moneyRemain = undefined
        let isUserRelated = undefined
        if (payload.categoryDetail.nameCategory == "Đi vay" || payload.categoryDetail.nameCategory == "Cho vay") {
            moneyPaid = 0
            moneyRemain = Number(payload.money)
            isUserRelated = true
        }
        let transactionTemp = {
            id: payload.categoryDetail.idCategory,
            name: payload.categoryDetail.nameCategory,
            description: payload.description,
            image: payload.categoryDetail.image,
            money: formatMoney(payload.money, 0, '.', ','),
            moneyInt: Number(payload.money),
            moneyPaid: moneyPaid,
            moneyRemain: moneyRemain,
            isMoneyAdd: payload.categoryDetail.isMoneyAdd,
            relatedUserName: payload.contact,
            walletId: walletId,
            isUserRelated: isUserRelated,
            walletImage: 'avatar_wallet',
            walletName: 'Ví mặc định'
        }
        commit('addNewTransaction', transactionTemp)

        axios.post('/transactions', {
            transactionTypeId: payload.categoryDetail.idCategory,
            money: payload.money,
            moneyPaid: moneyPaid,
            moneyRemain: moneyRemain,
            description: payload.description,
            walletId: walletId,
            relatedUserName: payload.contact
        }).then(res => {
            commit("changIdTransaction", { idNew: res.data.id, idOld: payload.categoryDetail.idCategory });
        }).catch(error => console.log(error))
    },

    actionRemoveTransaction: ({ commit }, payload) => {
        commit('removeTransaction', payload)
        axios.delete(`/transactions/${payload}`)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    actionCashBackMoney: ({ commit }, payload) => {
        const walletId = localStorage.getItem('walletId')
        let relatedUserName = payload.currentTransaction.relatedUserName
        let relatedUserNameTemp = relatedUserName ? relatedUserName : "Ai đó"
        let transactionTypeIdTemp = (payload.currentTransaction.name == config.borrowName) ? config.repaymentId : config.debtCollectionId
        let description = (payload.currentTransaction.name == config.borrowName) ? "Trả nợ cho " + relatedUserNameTemp : "Thu nợ của " + relatedUserNameTemp
        let isMoneyAdd = (payload.currentTransaction.name == config.borrowName) ? false : true
        let nameTransaction = (payload.currentTransaction.name == config.borrowName) ? config.repaymentName : config.debtCollectionName
        let image = (payload.currentTransaction.name == config.borrowName) ? config.repaymentImage : config.debtCollectionImage

        let transactionTemp = {
            id: payload.currentTransaction.id,
            name: nameTransaction,
            description: description,
            image: image,
            money: formatMoney(payload.cashBackMoney, 0, '.', ','),
            moneyInt: Number(payload.cashBackMoney),
            moneyPaid: undefined,
            moneyRemain: undefined,
            isMoneyAdd: isMoneyAdd,
            relatedUserName: relatedUserName,
            walletId: walletId,
            isUserRelated: undefined,
            walletImage: config.iconWallet,
            walletName: config.walletName
        }
        const moneyRemain = Number.parseInt(payload.currentTransaction.moneyRemain) - Number.parseInt(payload.cashBackMoney)
        const moneyPaid = Number.parseInt(payload.currentTransaction.moneyPaid) + Number.parseInt(payload.cashBackMoney)
        const idCurrentTransaction = payload.currentTransaction.id
        try {
            axios.post('/transactions', {
                transactionTypeId: transactionTypeIdTemp,
                money: payload.cashBackMoney,
                description: description,
                walletId: walletId,
                relatedUserName: relatedUserNameTemp,
                parentTransactionId: payload.currentTransaction.id
            })
                .then(res => {
                    commit('cashBackMoneyTransaction', payload)
                    commit('addNewTransaction', transactionTemp)
                    commit("changIdTransactionCashBack", { idNew: res.data.id, idOld: payload.currentTransaction.id });
                })
                .catch(error => console.log(error))
            axios.patch('/transactions', {
                id: idCurrentTransaction,
                moneyRemain: moneyRemain,
                moneyPaid: moneyPaid
            })
                .then(res => {
                }).catch(error => console.log(error))
        }
        catch (error) {
            console.log(error)
        }
    },
    actionUpdateTransaction: ({ commit }, payload) => {
        commit('updateTransaction', payload)
        axios.patch('/transactions', {
            id: payload.id,
            money: payload.money,
            description: payload.description,
            relatedUserName: payload.contact ? payload.contact : undefined,
            transactionTypeId: payload.categoryDetail.idCategory
        }).then(res => {
            console.log("Cap nhat thanh cong: ", res.data);
        }).catch(error => console.log(error))
    },
    actionGetTransactionDebt: ({ commit }, idParenTransaction) => {
        axios.get(`/transactions/${idParenTransaction}?relations=childrenTransaction`)
            .then(res => {
                let transactionChild = res.data.childrenTransaction.map(item => {
                    return {
                        name: item.relatedUserName,
                        date: moment(item.createdAt).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY'),
                        money: formatMoney(item.money, 0, '.', ','),
                    }
                })
                commit('setTransactionDebt', transactionChild)
            }).catch(error => console.log(error))
    },
    actionChangeWallet: ({ commit }, wallet) => {
        console.log("Chang Walelt1 : ", wallet);
        commit('changeWallet', wallet);
    }
}

