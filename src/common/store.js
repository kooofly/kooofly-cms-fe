import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        menu: [],
        activeNav: {},
        pageId: '',
    },
    actions: {

    },
    mutations: {
        MENU (state, v) {
            state.menu = v
        },
        ACTIVENAV(state, v) {
            state.activeNav = v
        },
        PAGEID(state, v) {
            state.pageId = v
        }
    }
})
