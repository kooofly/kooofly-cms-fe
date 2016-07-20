import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        menu: [],
        activeNav: {},
        pageId: '',
        mainQuery: {
            _limit: 10,
            _page: 1
        },
        mainTotal: ''
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
        },
        MAINQUERY(state, v) {
            console.log(state)
            for (var k in v) {
                state.mainQuery[k] = v[k]
            }
        },
        MAINTOTAL (state, v) {
            state.mainTotal = v
        }
    }
})
