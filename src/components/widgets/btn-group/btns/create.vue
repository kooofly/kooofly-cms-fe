<template>
    <a v-link="{ path: attrs.module + '/create' }" class="btn btn-primary btn-radius">{{ '新增' | addText }}</a>
</template>
<script>
    import store from '../../../../common/store'
    import util from '../../../../common/base/base'
    export default {
        props: {
            attrs: {
                type: Object,
                default: function () {
                    return {
                        module: '',
                        text: ''
                    }
                }
            }
        },
        filters: {
            addText (v) {
                if (this.attrs.text) {
                    return v + this.attrs.text.replace('管理', '')
                } else {
                    return v
                }

            }
        }
    }
</script>