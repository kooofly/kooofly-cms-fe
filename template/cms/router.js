import common from '../../src/common/base/base'
import commonRouter from '../../src/common/router'
import Index from '../../src/components/p_index.vue'
import Tpl_admin from '../../src/components/tpl_admin.vue'
import CommonList from '../../src/components/p_common_list.vue'
import CommonEdit from '../../src/components/p_common_edit.vue'

//区分编辑和添加
var CommonCreate = common.mix({}, CommonEdit)
CommonCreate.props = common.mix({}, CommonCreate.props, { action: {
    type: String,
    default: 'save'
} })
var CommonUpdate = common.mix({}, CommonEdit)
CommonUpdate.props = common.mix({}, CommonUpdate.props, { action: {
    type: String,
    default: 'update'
} })
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
    '/': {
        component: Index
    },
    '/admin': {
        component: Tpl_admin,
        subRoutes : common.mix({}, commonRouter, routerBase(''), routerBase('/system'))
    }
}