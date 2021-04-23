import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
    refresh: false,
    loading: false,
    error: false,
    nameError: null,
    loggedIn: localStorage.getItem('token') ? true : false,
    hasWallet: JSON.parse(localStorage.getItem('hasWallet')),
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
    username: null,
    userActive: localStorage.getItem('userActive'),
    user: JSON.parse(localStorage.getItem('user')),
    walletId: localStorage.getItem('walletId'),
    walletName: localStorage.getItem('wallet') ? JSON.parse(localStorage.getItem('wallet')).displayName : null,
    walletIcon: localStorage.getItem('wallet') !== null ? JSON.parse(localStorage.getItem('wallet')).image : '/images/ca_phe.png',
    wallet: JSON.parse(localStorage.getItem('wallet')),
    walletsList: JSON.parse(localStorage.getItem('walletList'))
}

export default {
    state,
    actions,
    mutations,
    getters
}