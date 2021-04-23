import axios from 'axios'
import moment from 'moment-timezone'
import config from '../../../config/config'

axios.defaults.baseURL = config.urlServer;

export default {
    retrieveCategories: ({ commit }, walletId) => {
        let token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get(`/transaction-types?&relations=transactionGroup&relations=childrenTransactionTypes&pageSize=1000&pageIndex=1`)
            .then(res => {
                let data = res.data.items;
                let income = [];
                let expense = [];
                let debt = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].transactionGroup.displayName === "Thu nhập") {
                        income.push(data[i]);
                    }
                    else if (data[i].transactionGroup.displayName === "Chi tiêu") {
                        expense.push(data[i]);
                    }
                    else if (data[i].transactionGroup.displayName === "Cho vay/Thu nợ") {
                        debt.push(data[i]);
                    }
                }
                commit('retrieveCategories', { income, expense, debt })
            }).catch(error => {
                console.log(error);
            })
    },
    actionAddNewCategory: ({ commit }, payload) => {
        commit('addNewCategory', payload)
        axios.post(`/transaction-types`, {
            displayName: payload.displayName,
            transactionGroupId: payload.transactionGroup.id,
            parentTransactionTypeId: payload.idParentCategory,
            image: payload.image,
            isMoneyAdd: payload.isMoneyAdd
        })
            .then(res => {
                commit("changIdCategory", { idNew: res.data.id, idOld: payload.id, transactionGroup: payload.transactionGroup.displayName });
            }
            )
            .catch(error => {
                console.log(error)
            });
    },
    actionUpdateCategory: ({ commit }, payload) => {
        console.log("updateCategory", payload.id)
        commit('updateCategory', payload)
        axios.patch('/transaction-types', {
            id: payload.id,
            displayName: payload.displayName,
            image: payload.image,
        }).then(res => {
            console.log("Cap nhat thanh cong: ", res.data);
        }).catch(error => console.log(error))
    },
    actionRemoveCategory: ({ commit }, payload) => {
        commit('removeCategory', payload)
        axios.delete(`transaction-types/${payload.idCategory}`)
            .then(res => {
                console.log("Xóa thành công", res.data);
            })
            .catch(error => {
                console.log(error);
            })
    },

}