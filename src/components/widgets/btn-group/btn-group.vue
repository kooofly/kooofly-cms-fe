<style>
    .btn-group{ padding: 15px; }
</style>
<template>
    <div class="btn-group">
        <v-btns v-for="item in attrs" :attrs="item | config"></v-btns>
    </div>
</template>
<script>
    import VBtns from './btns/_index.vue'
    import util from '../../../common/base/base'
    export default {
        props: {
            attrs: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        components: {
            VBtns
        },
        filters: {
            config: function (v) {
                var o = {
                    widget: v.widget,
                    params: {}
                }
                for (var k in v.params) {
                    o.params[k] = util.getWidgetConfig.call(this, v.params[k])
                }
                return o
            }
        }
    }
</script>