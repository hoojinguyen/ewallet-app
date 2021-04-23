import axios from 'axios'
import moment from 'moment-timezone'
import config from '../../../config/config';

axios.defaults.baseURL = config.urlServer;

export default {
    actionLogin: ({ commit }, payload) => {
        commit("setLoading", true);
        axios.post(`/users/login`, {
            username: payload.displayName,
            password: payload.password
        })
            .then(res => {
                let user = {
                    id: res.data.id,
                    displayName: res.data.displayName,
                    image: res.data.image,
                    username: res.data.username,
                    role: res.data.role,
                    status: res.data.status,
                    createdAt: moment(res.data.createdAt).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY')
                }
                let token = res.data.token;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                axios.get(`/wallets?userId=${res.data.id}`).then(res => {
                    console.log('data vi:', res.data);
                    if (res.data.items.length <= 0) {
                        console.log("Chua co vi");
                        commit("setLogin", { token, user, hasWallet: false });
                        commit("setError", false);
                        commit("setLoading", false);
                    }
                    else {
                        console.log("da co vi");
                        commit("setLogin", { token, user, hasWallet: true, walletCurrent: res.data.items[0], walletList: res.data.items });
                        commit("setError", false);
                        commit("setLoading", false);
                    }
                }).catch(error => {
                    console.log(error)
                })
            })
            .catch(err => {
                let errorName = '';
                switch (err.response.data.details[0].message) {
                    case 'USERNAME_OR_PASSWORD_NOT_CORRECT':
                        errorName = "Mật khẩu không hợp lệ !"
                        break;
                    case 'USERNAME_NOT_EXISTED':
                        errorName = "Tài khoản không tồn tại !"
                        break;
                    default:
                        errorName = "Tài khoản của bạn đã bị khóa ! Vui lòng liên hệ Hỗ trợ để mở lại tài khoản."
                        break;
                }
                console.log(errorName)
                commit("setError", true);
                commit("setLoading", false);
                commit("setNameError", errorName)
            })
    },
    actionRegister: ({ commit }, payload) => {
        commit("setLoading", true);
        axios.post(`/users/signIn`, {
            displayName: payload.displayName,
            username: payload.username,
            password: payload.password,
            role: "guest",
        })
            .then(res => {
                let user = {
                    id: res.data.id,
                    displayName: res.data.displayName,
                    image: res.data.image,
                    username: res.data.username,
                    role: res.data.role,
                    status: res.data.status,
                    createdAt: moment(res.data.createdAt).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY')
                }
                let token = res.data.token;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                commit("setLogin", { token, user, hasWallet: false });
                commit("setError", false);
                commit("setLoading", false);
            })
            .catch(err => {
                commit("setError", true);
                commit("setLoading", false);
                console.log(err);
            })
    },
    actionLogout: ({ commit }, payload) => {
        commit('destroyToken', payload)
    },
    actionAddNewWallet: ({ commit }, payload) => {
        let token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.post(`/wallets`, {
            displayName: payload.displayName,
            image: payload.image,
            accountBalance: payload.balance,
            walletTypeId: config.walletTypeId,
            userId: payload.userId,
            status: config.statusActive
        })
            .then(res => {
                let userId = localStorage.getItem('userId');
                let token = localStorage.getItem('token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                axios.get(`/wallets?userId=${userId}`).then(res => {
                    commit("setAddWalletSuccess", { hasWallet: true, walletCurrent: res.data.items[0], walletList: res.data.items });
                    commit("setError", false);
                    commit("setLoading", false);
                }).catch(error => {
                    console.log(error)
                })

            }).catch(error => {
                console.log(error)
            })
    },
    retrieveWallets: ({ commit }, payload) => {
        let userId = localStorage.getItem('userId');
        let token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.get(`/wallets?userId=${userId}`).then(res => {
            commit("setWalletsList", { wallets: res.data.items });
        }).catch(error => {
            console.log(error)
        })
    },
    actionUpdateWallet: ({ commit }, payload) => {
        commit('setUpdateWallet', payload)
        let token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.patch(`wallets`, {
            id: payload.id,
            displayName: payload.displayName,
            image: payload.image,
            accountBalance: payload.balance,
        })
            .then(res => {
                console.log("Cap nhat thành công", res.data);
            })
            .catch(error => {
                console.log(error);
            })

    },
    actionDeleteWallet: ({ commit }, payload) => {
        commit('setDeleteWallet', payload)
        let token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.delete(`wallets/${payload}`)
            .then(res => {
                console.log("Xóa thành công", res.data);
            })
            .catch(error => {
                console.log(error);
            })

    },
    actionResetPassword: ({ commit }, payload) => {
        let userId = localStorage.getItem('userId')
        let token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return new Promise((resolve, reject) => {
            axios.post(`users/${userId}/changePassword`, {
                currentPassword: payload.passwordOld,
                newPassword: payload.passwordNew,
            })
                .then(function (res) {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                });
        })
    },
    actionUpdateProfile: ({ commit }, payload) => {
        let userId = localStorage.getItem('userId')
        let token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.patch(`/users`, {
            id: userId,
            displayName: payload.displayName,
        }).then(res => {
            commit('updateProfile', payload)
        }).catch(error => console.log(error))
    }


}