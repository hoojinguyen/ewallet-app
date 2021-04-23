import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VueCurrencyInput from 'vue-currency-input'
import BootstrapVue from 'bootstrap-vue'
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(BootstrapVue)

const pluginOptions = {
	/* see config reference */
	globalOptions: { currency: 'VND' }
}
Vue.use(VueCurrencyInput, pluginOptions)


router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!localStorage.getItem('token')) {
			unauthorizedHandler(next)
		}
		else {
			requireWalletHandler(to, next)
		}
	}
	else if (to.matched.some(record => record.meta.requiresLogout)) {
		if (!localStorage.getItem('token')) {
			next()
		}
		else {
			next({
				name: 'home'
			})
		}
	}
	else {
		next()
	}
})

const unauthorizedHandler = (next) => {
	console.log("Khong token");
	next({
		name: 'login',
	})
}

const requireWalletHandler = (to, next) => {
	if (to.matched.some(record => record.meta.requiresWallet)) {
		if (!JSON.parse(localStorage.getItem('hasWallet'))) {
			console.log("Chua co vi");
			next({
				name: 'createwallet',
			})
		}
		else {
			next()
		}
	}
	else {
		next()
	}
}

Vue.directive('focus', {
	// When the bound element is inserted into the DOM...
	inserted: function (el) {
		// Focus the element
		el.focus()
	}
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
