export default {
    getCategoryExpense: state => {
        // console.log("detail", state.categoryExpense);
        return state.categoryExpense
    },
    getCategoryIncome: state => state.categoryIncome,
    getCategoryDebt: state => state.categoryDebt,
    getWalletName: () => localStorage.getItem('walletName')
}