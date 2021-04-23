export default {
    getTransactionCurrentMonth: state => {
        return state.transactionCurrentMonth
    },
    getTransactionLastMonth: state => {
        return state.transactionLastMonth
    },
    getDataDebtCollection: state => state.transactionDebtCollection,
    getDataRepayment: state => state.transactionRepayment,

    getTransactionDebt: state => state.transactionDebt,
    getDataReport: state => state.dataReport,
    getDataReportPieExpense: state => {
        return state.dataReportPieExpense
    },
    getDataReportPieIncome: state => state.dataReportPieIncome,
    getAccountBalance: state => {
        let hasWallet = JSON.parse(localStorage.getItem('hasWallet'))
        let accountBalance = 0
        if (state.wallet && hasWallet) {
            accountBalance = state.wallet.accountBalance
        } else if (!state.wallet && hasWallet) {
            accountBalance = JSON.parse(localStorage.getItem('wallet')).accountBalance
        } else {
            return;
        }
        let moneyFormat = new Intl.NumberFormat("vi", {
            style: "currency",
            currency: "VND"
        }).format(accountBalance);
        return moneyFormat
    },
    getTotalAccountBalance: state => {
        let totalMoney = 0
        let wallets = null
        let hasWallet = JSON.parse(localStorage.getItem('hasWallet'))
        if (state.walletsList && hasWallet) {
            wallets = state.walletsList
        } else if (!state.walletsList && hasWallet) {
            wallets = JSON.parse(localStorage.getItem('walletList'))
        } else {
            return;
        }
        wallets.forEach(item => {
            totalMoney += item.accountBalance
        })
        let moneyFormat = new Intl.NumberFormat("vi", {
            style: "currency",
            currency: "VND"
        }).format(totalMoney);
        return moneyFormat
    },

}