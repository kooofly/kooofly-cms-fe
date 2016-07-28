<template>
    <component v-if="attrs.params" :attrs="attrs.params" :is="currentCom"></component>
    <component v-else :is="currentCom"></component>
</template>
<script>
    import V_create from './create.vue'
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
            V_create
        }
    }
</script>