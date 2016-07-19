<template>
    <component :attrs="attrs.params" :is="currentCom"></component>
</template>
<script>
    import V_dropdown from './dropdown.vue'
    import V_buttonCreate from './button-create.vue'
    import V_buttonBatch_delete from './button-batch_delete.vue'
    import V_test from './test.vue'
    import V_logo from './logo.vue'
    import V_tree from './tree/tree.vue'
    import V_article from './article.vue'
    import V_directory from './directory.vue'
    import V_nav from './nav.vue'
    import V_skuEditor from './sku-editor.vue'
    import V_navAdmin from './nav-admin.vue'
    import V_searchAdmin from './search-admin.vue'
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
        components: {
            V_dropdown,
            V_buttonCreate,
            V_buttonBatch_delete,
            V_test,
            V_logo,
            V_tree,
            V_article,
            V_directory,
            V_nav,
            V_skuEditor,
            V_navAdmin,
            V_searchAdmin
        }
    }
</script>