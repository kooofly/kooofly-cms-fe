<template>
    <a @click="deleteData()" href="javascript:;" class="text-danger action-delete">删除</a>
</template>
<script>
    import util from '../../../../common/base/base'
    export default {
        props: {
            value: {},
            rowData: {
                type: Object
            }
        },
        methods: {
            deleteData () {
                var self = this
                var module = util.getModule('main', this)
                var resource = this.$resource(util.getUri.call(this, module, 'c_delete'))
                resource['delete']({
                    _id: this.value
                }).then(function (result) {
                    self.notify('refreshMain', result)
                })
                console.log('delete:', this.value)
            },
            notify (type, value) {
                this.$dispatch(type, value)
            }
        }
    }
</script>