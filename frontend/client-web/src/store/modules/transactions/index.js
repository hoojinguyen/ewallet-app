import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
    refresh: false,
    transactionCurrentMonth: [],
    transactionLastMonth: [],
    transactionDebt: [],
    dataReport: [],
    dataReportPieExpense: {},
    dataReportPieIncome: {},
    transactionDebtCollection: "",
    transactionRepayment: "",
    walletId: localStorage.getItem('walletId'),
    walletName: localStorage.getItem('wallet') ? JSON.parse(localStorage.getItem('wallet')).displayName : null,
    walletIcon: localStorage.getItem('wallet') ? JSON.parse(localStorage.getItem('wallet')).image : '/images/ca_phe.png',
    wallet: JSON.parse(localStorage.getItem('wallet')),
    walletsList: JSON.parse(localStorage.getItem('walletList'))
}

export default {
    state,
    actions,
    mutations,
    getters
}