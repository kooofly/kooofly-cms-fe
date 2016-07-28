<template>
    <component v-if="attrs.params" :attrs="attrs.params | transverter" :is="currentCom"></component>
    <component v-else :is="currentCom"></component>
</template>
<script>
    import util from '../../common/base/base'
    import V_dropdown from './dropdown.vue'
    import V_buttonCreate from './button-create.vue'
    import V_buttonBatch_delete from './button-batch_delete.vue'
    import V_test from './test.vue'
    import V_form from './form.vue'
    import V_logo from './logo.vue'
    import V_tree from './tree/tree.vue'
    import V_article from './article.vue'
    import V_directory from './directory.vue'
    import V_nav from './nav.vue'
    import V_skuEditor from './sku-editor.vue'
    import V_navAdmin from './nav-admin.vue'
    import V_searchAdmin from './search-admin.vue'
    import V_table from './table/table.vue'
    import V_pagination from './pagination2.vue'
    import V_btnGroup from './btn-group/btn-group.vue'
    export default {
        props: {
            attrs: {
                type: Object,
                default: function () {
                    return {}
                }
            }
        },
        data () {
            return {
                currentCom: ''
            }
        },
        ready () {
            this.currentCom = this.getCurrentCom()
        },
        methods: {
            getCurrentCom () {
                var result
                var widget = this.attrs && this.attrs.widget
                if (!widget) {
                    result = ''
                } else {
                    result = 'V_' + widget
                }
                return result
            }
        },
        filters: {
            transverter: function (v) {
                var result = v
                if (Object.prototype.toString.call(v) === "[object Object]") {
                    var o = {}
                    for (var k in v) {

                        o[k] = util.getWidgetConfig.call(this, v[k])
                    }
                    result = o
                }
                return result
            }
        },
        components: {
            V_btnGroup,
            V_dropdown,
            V_buttonCreate,
            V_buttonBatch_delete,
            V_test,
            V_form,
            V_logo,
            V_tree,
            V_article,
            V_directory,
            V_nav,
            V_skuEditor,
            V_navAdmin,
            V_searchAdmin,
            V_table,
            V_pagination

        }
    }
</script>