<template>
    <div :id="config.page" class="page page-m" v-if="config">
        <div class="layout-wrapper" v-for="widget in config.widgets">
            <v-widget :attrs="widget"></v-widget>
        </div>
    </div>
</template>
<script>
    import VWidget from '../widgets/_index.vue'
    import config from '../../common/config'
    import store from '../../common/store'
    export default {
        data () {
            return {
                config: null
            }
        },
        ready () {
            // 异步请求 可以让后端控制权限
            var self = this
            var resource = this.$resource(config.page)
            resource.get({
                _single: 1,
                layout: 'LayoutM',
                router: {
                    $regex: self.$route.fullPath
                }
            }).then(function (res) {
                self.config = res.data.config
                store.dispatch('PAGEID', res.data._id)
            })
        },
        components: {
            VWidget
        }
    }
</script>