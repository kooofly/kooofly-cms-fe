<template>
    <component :attrs="attrs" :model.sync="model" :is="currentCom"></component>
</template>
<script>
    import V_text from './text.vue'
    import V_password from './password.vue'
    import V_upload from './upload.vue'
    import V_radioBoolean from './radio-boolean.vue'
    import V_groupInfo from './group-info.vue'
    import V_number from './number.vue'
    import V_select from './select.vue'
    import V_textarea from './textarea.vue'
    import V_textareaRich from './textarea-rich.vue'
    import V_groupFields from './group-fields.vue'
    import V_groupApis from './group-apis.vue'
    import V_selectLayout from './select-layout.vue'
    import V_pageEditor from './page-editor.vue'
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
            V_textareaRich,
            V_selectLayout,
            V_pageEditor
        }
    }
</script>