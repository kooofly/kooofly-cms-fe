<template>
    <component v-if="render" :value.sync="value" :row-data.sync="rowData" :is="currentCom"></component>
    <span v-else="render">{{value}}</span>
</template>
<script>
    import V_source from './source.vue'
    import V_text from './text.vue'
    import V_routing from './routing.vue'

    export default {
        props: {
            rowData: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            value: {},
            render: {}
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
                return 'V_' + this.render
            }
        },
        components: {
            V_source,
            V_text,
            V_routing
        }
    }
</script>