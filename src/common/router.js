import _404 from '../components/p_bad_404.vue'
import _500 from '../components/p_bad_500.vue'
import Forbidden from '../components/p_bad_forbidden.vue'
import Placeholder from '../components/p_bad_placeholder.vue'

export default {
    '/404': {
        component: _404
    },
    '/500': {
        component: _500
    },
    '/forbidden': {
        component: Forbidden
    },
    '/placeholder': {
        component: Placeholder
    }
}