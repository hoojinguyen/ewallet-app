import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Transaction from '../views/Transaction.vue'
import BookDebt from '../views/BookDebt.vue'
import Category from '../views/Category.vue'
import Wallet from '../views/Wallet.vue'
import Account from '../views/Account.vue'
import Report from '../views/Report.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import CreateWallet from '../views/CreateWallet.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresLogout: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresLogout: true,
    }
  },
  {
    path: '/createwallet',
    name: 'createwallet',
    component: CreateWallet,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true,
      requiresWallet: true
    }
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: Transaction,
    meta: {
      requiresAuth: true,
      requiresWallet: true

    }
  },
  {
    path: '/bookDebt',
    name: 'bookDebt',
    component: BookDebt,
    meta: {
      requiresAuth: true,
      requiresWallet: true

    }
  },
  {
    path: '/category',
    name: 'category',
    component: Category,
    meta: {
      requiresAuth: true,
      requiresWallet: true

    }
  },
  {
    path: '/wallet',
    name: 'wallet',
    component: Wallet,
    meta: {
      requiresAuth: true,
      requiresWallet: true

    }
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
    meta: {
      requiresAuth: true,
      // requiresWallet: true
    }
  },
  {
    path: '/report',
    name: 'report',
    component: Report,
    meta: {
      requiresAuth: true,
      requiresWallet: true

    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
