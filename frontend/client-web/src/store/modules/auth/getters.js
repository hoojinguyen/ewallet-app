export default {
    getToken: state => {
    },
    getInfoUser: state => {
        console.log('lay user:', state.user);
    },
    getWallet: state => {

    },
    getError: state => {
        return state.error;
    },
    getLoggedIn: state => {
        return state.loggedIn;
    },
    getIsLoading: state => {
        return state.loading;
    },
    getLoggedIn: state => {
        let token = localStorage.getItem('token');
        let isLogin = token ? true : false
        console.log("get token", isLogin);
        return token ? true : false
    },
    getHasWallet: state => {
        return localStorage.getItem('hasWallet');
    },
    getWalletsList: state => {
        return state.walletsList
    }
}