<template>
    <component :attrs="attrs" :model.sync="model" :is="currentCom"></component>
</template>
<script>
    import V_text from './control/text.vue'
    import V_password from './control/password.vue'
    import V_upload from './control/upload.vue'
    import V_radioBoolean from './control/radio-boolean.vue'
    import V_groupInfo from './control/group-info.vue'
    import V_number from './control/number.vue'
    import V_select from './control/select.vue'
    import V_textarea from './control/textarea.vue'
    import V_textareaRich from './control/textarea-rich.vue'
    import V_groupFields from './control/group-fields.vue'
    import V_groupApis from './control/group-apis.vue'
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
                this.attrs.control.label = this.attrs.name
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
            V_password,
            V_upload,
            V_radioBoolean,
            V_groupInfo,
            V_number,
            V_select,
            V_textarea,
            V_groupFields,
            V_groupApis,
            V_textareaRich
        }
    }
</script>