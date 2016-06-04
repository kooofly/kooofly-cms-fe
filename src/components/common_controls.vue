<template>
    <component :attrs="attrs" :model.sync="model" :is="currentCom"></component>
</template>
<script>
    import V_text from './control/text.vue'
    import V_upload from './control/upload.vue'
    import V_radioBoolean from './control/radio-boolean.vue'
    import V_fieldsInfo from './control/fields-info.vue'
    import V_number from './control/number.vue'
    import V_select from './control/select.vue'
    import V_groupFields from './control/group-fields.vue'
    export default {
        props: {
            attrs: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            model: {
                twoWay: true
            },
        },
        data () {
            return {
                currentCom: ''
            }
        },
        ready () {
            this.currentCom = this.getCurrentCom()
            var control = this.attrs.control
            if (typeof control === 'string') {
                this.attrs.control = {}
                this.attrs.control.name = control
            } else if (typeof control === 'object') {
                if (!control.label) {
                    control.label = this.attrs.name
                }
            }
        },
        methods: {
            getCurrentCom () {
                var result
                var control = this.attrs.control
                if (!control) {
                    result = ''
                } else {
                    if (typeof control === 'string') {
                        result = 'V_' + control
                    } else {
                        result = 'V_' + control.name
                    }
                }
                return result
            }
        },
        components: {
            V_text,
            V_upload,
            V_radioBoolean,
            V_fieldsInfo,
            V_number,
            V_select,
            V_groupFields
        }
    }
</script>