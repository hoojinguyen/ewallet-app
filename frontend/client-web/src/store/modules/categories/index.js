import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
    categoryExpense: [],
    categoryIncome: [],
    categoryDebt: []
}

export default {
    state,
    actions,
    mutations,
    getters
}