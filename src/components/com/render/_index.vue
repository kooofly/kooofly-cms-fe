<template>
    <component v-if="render" :value="value" :row-data.sync="rowData" :is="currentCom"></component>
    <span v-else="render">{{value}}</span>
</template>
<script>
    import V_adminLink from './admin-link.vue'
    import V_blank from './blank.vue'
    import V_checkbox from './checkbox.vue'
    import V_isOrNot from './is-or-not.vue'
    import V_linkToEdit from './link-to-edit.vue'
    import V_options from './options.vue'
    import V_picture from './picture.vue'

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
            V_adminLink,
            V_blank,
            V_checkbox,
            V_isOrNot,
            V_linkToEdit,
            V_options,
            V_picture
        }
    }
</script>