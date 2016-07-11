<style type="text/css">
    .page-h .layout-left{ padding-right: 0; }
    .page-h .layout-left .layout-wrapper{ padding-right: 0; width: 240px; }
    .page-h .layout{ margin-top: 0; }
</style>
<template>
    <div :id="config.page" class="page page-s" v-if="config">
        <div class="media layout  media-top">
            <aside class="media-left layout-left">
                <div class="layout-wrapper">
                    <v-widget :attrs="config.widgets[0]"></v-widget>
                </div>
                <div class="layout-wrapper">
                    <v-widget :attrs="config.widgets[1]"></v-widget>
                </div>
            </aside>
            <div class="main media-body">
                <div class="row" v-for="widget in config.widgets[2]">
                    <div class="col-md-12 layout-wrapper">
                        <v-widget :attrs="widget"></v-widget>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import VWidget from '../widgets/_index.vue'
    import config from '../../common/config'
    export default {
        data () {
            // [{"widget":"test"},{"widget":"test"},[{"widget":"test"},{"widget":"test"},{"widget":"test"}]]
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
                layout: 'LayoutS',
                router: self.$route.fullPath
            }).then(function (res) {
                self.config = res.data.config
            })
        },
        components: {
            VWidget
        }
    }
</script>