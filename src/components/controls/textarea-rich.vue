<style>
    .wrap-wysiwyg{ background: #fafafa; border: 1px solid #ccc;  }
    .wrap-wysiwyg .tool-bar{ padding: 10px; }
    .wysiwyg{ width: 100%; border: 0; padding: 2px; background: #fff; }
</style>
<template>
    <label class="media">
        <div class="media-left">
            <span class="control-label">{{attrs.control.label}}</span>
        </div>
        <div class="media-body">
            <!-- 加载编辑器的容器 -->
            <script id="container" name="content" style="width:100%" type="text/plain"></script>
        </div>
    </label>
</template>
<script>
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
            }
        },
        data () {
            return {
                editor: null
            }
        },
        ready () {
            var self = this
            var ue = UE.getEditor('container')
            ue.ready(function() {
                ue.setContent(self.model || '')
                ue.addListener('contentChange', function (editor) {
                    self.model = ue.getContent()
                })
            })
        },
        methods: {

        }
    }
</script>