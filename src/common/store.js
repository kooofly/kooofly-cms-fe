import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        menu: [],
        activeNav: {}
    },
    actions: {

    },
    mutations: {
        MENU (state, menu) {
            state.menu = menu
        },
        ACTIVENAV(state, activeNav) {
            state.activeNav = activeNav
        }
    }
})
