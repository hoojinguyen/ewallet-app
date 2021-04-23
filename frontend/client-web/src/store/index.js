import Vue from 'vue'
import Vuex from 'vuex'
import transactions from './modules/transactions'
import categories from './modules/categories'
import auth from './modules/auth'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  namespaced: true,
  modules: {
    transactions,
    categories,
    auth
  },
  strict: debug
})