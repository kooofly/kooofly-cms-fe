import common from '../../src/common/base/base'
import commonRouter from '../../src/common/router'
import Tpl_admin from '../../src/components/tpl_admin.vue'
import CommonList from '../../src/components/p_common_list.vue'
import CommonCreate from '../../src/components/p_common_edit.vue'
import CommonUpdate from '../../src/components/p_common_edit.vue'


function routerBase(prev) {
    var result = {}
    result[prev + '/:module'] = {
        component: CommonList
    }
    result[prev + '/:moduleParent/:id/:module'] = {
        component: CommonList
    }
    result[prev + '/:module/create'] = {
        component: CommonCreate
    }
    result[prev + '/:module/:id/create'] = {
        component: CommonCreate
    }
    result[prev + '/:module/update'] = {
        component: CommonUpdate
    }
    result[prev + '/:module/:id/update'] = {
        component: CommonUpdate
    }
    return result
}


export default {
    '/admin': {
        component: Tpl_admin,
        subRoutes : common.mix({}, commonRouter, routerBase(''), routerBase('/system'))
    }
}