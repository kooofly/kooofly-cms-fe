<style>
    .upload{ font-size: 0; }
    .upload .model{ display: inline-block; }
    .upload img{ width: 60px; height: 60px; vertical-align: top; margin-right: 10px; }
    .upload .control-add { width: 60px; height: 60px; border: 1px solid #ccc; line-height: 56px;
        text-align: center; display: inline-block; vertical-align: top }
    .upload .control-add .icon{  font-size: 40px; color: #ccc; }

</style>
<template>
    <v-upload-modal></v-upload-modal>
    <div class="media media-top">
        <div class="media-left">
            <span class="control-label">{{attrs.control.label}}</span>
        </div>
        <div class="media-body">
            <!--<input class="form-control" style="display: none;" type="file"/>-->
            <div class="upload">
                <div class="model">
                    <img src="http://api.kooofly.com:3000/ueditor/php/upload/image/749131770368233472.jpg" alt="">
                    <img src="http://api.kooofly.com:3000/ueditor/php/upload/image/749131770368233472.jpg" alt="">
                </div>
                <a class="control-add" @click="showModal()" href="javascript:;"><i class="iconfont icon icon-add"></i></a>

            </div>

        </div>
    </div>
</template>
<script>
    import VUploadModal from './upload-modal.vue'
    export default {
        props: {
            attrs: {
                type: Object,
                default: function () {
                    return {
                        uriUpload: '',
                        uriList: '',
                        uriGroup: ''
                    }
                }
            },
            model: {
                twoWay: true
            }
        },
        methods: {
            showModal: function () {
                this.$broadcast('modal', this.attrs)
            }
        },
        components: {
            VUploadModal
        }
    }
</script>