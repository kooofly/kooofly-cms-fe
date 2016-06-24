<template>
    <a :href="link">{{value}}</a>
</template>
<script>
    export default {
        props: {
            value: {},
            rowData: {
                type: Object
            },
            twoWay: true
        },
        data () {
            return {
                link: ''
            }
        },
        ready () {
            var module = this.$route.params.mainData_module || this.$route.params.module
            var result = '/#!/admin/' + module + '/' + this.rowData._id + '/update'
            this.link = result
            return result
        }
    }
</script>