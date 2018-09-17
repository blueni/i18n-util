import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import App from '../pages/app.vue'
import components from '../components'
import parse5 from 'parse5'

import '../styles/common.less'

Vue.use(Router)
Vue.use(Vuex)
Vue.use(components)

window.parse5 = parse5
const router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            component: () => import('../pages/init.vue'),
        },
        {
            path: '/detail',
            component: () => import('../pages/detail.vue'),
        },
        {
            path: '/*',
            redirect: '/'
        },
    ],
})

const store = new Vuex.Store({
    state: {
        file: '',
        translates: [],
        currentText: '',
        langs: ['CN', 'EN'],
        currentLang: 'CN',
        json: {},
    },

    mutations: {
        file(state, data){
            state.file = data
        },
        translates(state, data){
            state.translates = data
        },
        currentText(state, data){
            state.currentText = data
        },
        currentLang(state, data){
            state.currentLang = data
        },
        json(state, data){
            state.json = data
        },
    },
})

window.__app = new Vue({
    el: '#i18n-app',
    components: { App },
    render: (_h) => _h(App),
    router,
    store,
})
