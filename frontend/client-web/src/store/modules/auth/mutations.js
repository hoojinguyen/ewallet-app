import config from '../../../config/config'
import moment from 'moment-timezone'

export default {
    setLogin: (state, payload) => {
        state.loggedIn = true
        state.token = payload.token
        state.user = payload.user
        state.userId = payload.user.id
        state.hasWallet = payload.hasWallet


        localStorage.setItem('token', payload.token)
        localStorage.setItem('hasWallet', payload.hasWallet)
        localStorage.setItem('user', JSON.stringify(payload.user))
        localStorage.setItem('userId', payload.user.id)
        localStorage.setItem('userActive', payload.user.status)
        localStorage.setItem("timeReportPieChart", moment.utc().format());

        if (payload.hasWallet) {
            state.wallet = payload.walletCurrent
            state.walletId = payload.walletCurrent.id
            state.walletName = payload.walletCurrent.displayName
            localStorage.setItem('walletList', JSON.stringify(payload.walletList))
            localStorage.setItem('wallet', JSON.stringify(payload.walletCurrent))
            localStorage.setItem('walletId', payload.walletCurrent.id)
        }
    },
    setAddWalletSuccess(state, payload) {
        state.hasWallet = payload.hasWallet
        state.wallet = payload.walletCurrent
        state.walletId = payload.walletCurrent.id
        state.walletName = payload.walletCurrent.displayName
        localStorage.setItem('walletList', JSON.stringify(payload.walletList))
        localStorage.setItem('wallet', JSON.stringify(payload.walletCurrent))
        localStorage.setItem('walletId', payload.walletCurrent.id)
        localStorage.setItem('hasWallet', payload.hasWallet)
        localStorage.setItem("timeReportPieChart", moment.utc().format());

    },
    setDeleteWallet(state, payload) {
        console.log("mutation delete", payload);
    },
    setUpdateWallet(state, payload) {
        console.log("mutation update", payload);
        state.walletName = payload.displayName
        state.walletIcon = payload.image
        state.wallet = payload
        let wallet = JSON.parse(localStorage.getItem('wallet'))
        wallet.displayName = payload.displayName
        wallet.image = payload.image
        wallet.accountBalance = payload.balance
        localStorage.setItem('wallet', JSON.stringify(wallet))
    },
    setLoading(state, payload) {
        state.loading = payload
    },
    setNameError(state, payload) {
        state.nameError = payload
    },
    setRegister: (state, payload) => {
        console.log("setRegister")
    },
    destroyToken: (state, payload) => {
        state.loggedIn = false;
        state.token = null;
        state.userId = null;
        state.username = null;
        localStorage.clear();
    },
    setError(state, payload) {
        state.error = payload
    },
    setWalletsList(state, payload) {
        state.walletsList = payload.wallets
        localStorage.setItem('walletList', JSON.stringify(payload.wallets))
    },
    updateProfile(state, payload) {
        state.username = payload.displayName
        let user = JSON.parse(localStorage.getItem('user'))
        user.displayName = payload.displayName
        localStorage.setItem('user', JSON.stringify(user))
    }
};