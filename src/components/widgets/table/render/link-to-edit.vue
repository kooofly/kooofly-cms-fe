<template>
    <a v-link="link">{{value}}</a>
</template>
<script>
    import util from '../../../../common/base/base'
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
            var module = util.getModule('main', this)
            var parentPath = util.getParantPath.call(this)
            var result = parentPath + '/' + module + '/' + this.rowData._id + '/update'
            this.link = result
            return result
        }
    }
</script>