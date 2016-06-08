<template>
    <component :attrs="attrs.params" :is="currentCom"></component>
</template>
<script>
    import V_dropdown from './widget/dropdown.vue'
    import V_buttonCreate from './widget/button-create.vue'
    import V_buttonBatch_delete from './widget/button-batch_delete.vue'
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
                var widget = this.attrs.widget
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
            V_buttonBatch_delete
        }
    }
</script>