<style>
    #upload-modal{ border-radius: 4px;
        position: fixed;
        width: 80%;
        max-width: 890px;
        top: 50%;
        left: 50%;
        font-size: 14px;
        background-color: #fafafa;
        overflow: hidden;
        z-index: 401;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%); }
    #upload-modal .close{ font-size: 30px; top: 0; color: #ccc; }
    #upload-modal .title { border-bottom: 1px solid #f1f1f1; }
    #upload-modal .title .media{ width: 300px; margin-right: 40px; float: right; }
    #upload-modal .title .form-control{ height: 24px; font-size: 12px; padding:2px 6px; }
    #upload-modal .title .media-right{ padding-left: 0; }
    #upload-modal .title .btn-sm{ font-size: 12px; padding:3px 0.15rem; }
    #upload-modal .title .pull-left{ margin-right: 10px; }
    #upload-modal .bd{ background: #fff; }
    #upload-modal .bd .media-left{ background: #f5f5f5; padding-right: 0; }
    #upload-modal .bd .upload{ padding-left: 10px; }
    #upload-modal .list{ width: 200px; min-height: 387px; background: #f5f5f5; overflow: hidden; min-height: 300px; }
    #upload-modal .list .item{ text-align: left; padding: 10px; margin: 0 0 6px; }

    #upload-modal .list .active{ background: #fff; }
    #upload-modal .footer{ background: #fff; border-top: 1px solid #e2e2e2; }
    #upload-modal .upload .model{ min-height: 387px; width: 100%; }
    #upload-modal .upload .model .item{ position: relative; float: left; font-size: 12px; }
    #upload-modal .upload .model .item:hover img,
    #upload-modal .upload .model .active img{ border: 2px solid #7799bb; }
    #upload-modal .upload .model img{ margin: 10px 5px 0; width: 100px; height: 100px; }
    #upload-modal .upload .model .ratio{ width: 100px; bottom: 18px; left: 5px; position: absolute; background: #999; opacity: .8; color: #fff; text-align: center; }
    #upload-modal .upload .model .name{ margin: 0 5px; width: 100px; }
    #upload-modal .upload .control-add{ margin: 10px 5px 0; width: 100px; height: 100px; line-height: 98px; }
    #upload-modal .upload .control-add .icon{ font-size: 60px; }
    #upload-modal .wrap-p{ border-top: 1px solid #f5f5f5; margin-top: 10px; }
    #upload-modal .wrap-p .pagination{ background: transparent; padding: 6px 0; }
    .layer{ position: fixed; width: 100%; height: 100%; top: 0; left: 0; background-color: rgba(0, 0, 0, 0.5);  z-index: 201; pointer-events: none; }
    .search .icon{ margin-left: 10px; }
    .dz-drag-hover{ border: 3px dashed #0087F7; }
</style>
<template>
    <div v-if="show">
        <div class="layer"></div>
        <div id="upload-modal" class="upload-modal modals panel">
            <span @click="close()" class="close iconfont icon icon-shanchu"></span>
            <div class="title clearfix">
                <div class="media search">
                    <div class="media-left">
                        <i class="icon iconfont icon-search"></i>
                    </div>
                    <div class="media-body"><input class="form-control" placeholder="搜索" type="search"><i class="icon icon-error clear"></i></div>
                    <div class="media-right"><button class="btn btn-sm">搜索</button></div>
                </div>
                <div class="pull-left">
                    <span>我的图片</span>
                </div>
            </div>
            <div class="bd">
                <div class="media media-top">
                    <div class="media-left">
                        <ul class="list list-horizontal">
                            <li class="item active">未分组</li>
                            <li class="item">未分组</li>
                        </ul>
                    </div>
                    <div class="media-body">
                        <div class="upload ">
                            <ul id="dropzone" class="model dropzone">
                                <li class="item">
                                    <a class="control-add" href="javascript:;"><i class="iconfont icon icon-add"></i></a>
                                </li>
                                <!--<li class="item">
                                    <img src="http://api.kooofly.com:3000//ueditor/php/upload/image//749125966181306368.jpg?noCache=ir7hranu" alt="">
                                    <span class="ratio">343*23</span>
                                    <div class="name tof">23434 dfjlfja dfj adfljlasd laflda</div>
                                </li>
                                <li class="item">
                                    <img src="http://api.kooofly.com:3000/ueditor/php/upload/image/749131770368233472.jpg" alt="">
                                    <span class="ratio">343*23</span>
                                    <div class="name tof">23434 dfjlfja dfj adfljlasd laflda</div>
                                </li>
                                <li class="item">
                                    <img src="http://api.kooofly.com:3000//ueditor/php/upload/image//749125966181306368.jpg?noCache=ir7hranu" alt="">
                                    <span class="ratio">343*23</span>
                                    <div class="name tof">23434 dfjlfja dfj adfljlasd laflda</div>
                                </li>
                                <li class="item">
                                    <img src="http://api.kooofly.com:3000/ueditor/php/upload/image/749131770368233472.jpg" alt="">
                                    <span class="ratio">343*23</span>
                                    <div class="name tof">23434 dfjlfja dfj adfljlasd laflda</div>
                                </li>
                                <li class="item">
                                    <img src="http://api.kooofly.com:3000/ueditor/php/upload/image/749131770368233472.jpg" alt="">
                                    <span class="ratio">343*23</span>
                                    <div class="name tof">23434 dfjlfja dfj  laflda</div>
                                </li>
                                <li class="item">
                                    <img src="http://api.kooofly.com:3000/ueditor/php/upload/image/749131770368233472.jpg" alt="">
                                    <span class="ratio">343*23</span>
                                    <div class="name tof">23434 dfjlfja dfj laflda</div>
                                </li>-->
                            </ul>
                        </div>
                        <div class="clearfix wrap-p">
                            <ul class="pagination pull-right">
                                <li><a class="item" href="javascript:;">«</a></li>
                                <li><a class="item" href="javascript:;">1</a></li>
                                <li><a class="item active" href="javascript:;">2</a></li>
                                <li><a class="item" href="javascript:;">3</a></li>
                                <li><a class="item" href="javascript:;">4</a></li>
                                <li><a class="item" href="javascript:;">»</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer text-center">
                <button class="btn btn-primary btn-radius">确定</button>
            </div>
        </div>
        <div id="preview-template" style="display: none">

            <div class="dz-preview dz-file-preview">
                <div class="dz-details">
                    <div class="dz-filename"><span data-dz-name></span></div>
                    <div class="dz-size">文件大小: <span data-dz-size></span></div>
                    <div class="dz-thumbnail-wrapper">
                        <div class="dz-thumbnail">
                            <img class="preview" data-dz-thumbnail>
                            <span class="dz-nopreview">没有预览</span>
                            <div class="dz-success-mark">
                                <i class="fa fa-check-circle-o"></i>
                            </div>
                            <div class="dz-error-mark">
                                <i class="fa fa-times-circle-o"></i>
                            </div>
                            <div class="dz-error-message">
                                <span data-dz-errormessage></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="progress progress-striped active">
                    <div class="progress-bar progress-bar-success" data-dz-uploadprogress></div>
                </div>
            </div>

        </div>

        <div id="preview-template2">

            <div class="dz-preview dz-processing dz-error dz-complete dz-image-preview">
                <div class="dz-image">
                    <img data-dz-thumbnail>
                </div>
                <div class="dz-details">
                    <div class="dz-size">
                        <span data-dz-size></span>
                    </div>
                    <div class="dz-filename">
                        <span data-dz-name>751decd38b8e7a2f3bf3cfdf.jpg</span>
                    </div>
                </div>
                <div class="dz-progress">
                    <span class="dz-upload" data-dz-uploadprogress=""></span>
                </div>
                <div class="dz-error-message">
                    <span data-dz-errormessage>Server responded with 0 code.</span>
                </div>
                <div class="dz-success-mark">
                    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">      <title>Check</title>      <defs></defs>      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>      </g>
                    </svg>
                </div>
                <div class="dz-error-mark">
                    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">      <title>Error</title>      <defs></defs>      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">        <g id="Check-+-Oval-2" sketch:type="MSLayerGroup" stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" sketch:type="MSShapeGroup"></path>        </g>      </g>
                    </svg>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    import Dropzone from 'dropzone'
    export default {
        props: {
            attrs: {
                type: Object
            }
        },
        data () {
            return {
                searchOption: {
                    _limit: 17,
                    _page: 1
                },
                show: false,
                model: [],
            }
        },
        ready: function () {

        },
        methods: {
            close: function () {
                this.$remove()
            },
        },
        events: {
            modal: function (attrs) {
                var self = this
                this.show = true
                this.$appendTo('body')
                if (!self.dropzone) {
                    setTimeout(function() {
                        self.dropzone = new Dropzone('#dropzone', {
                            url: 'http://api.kooofly.com:3000/upload',
                            clickable: '#dropzone .icon-add',
                            headers: {
                                'Access-Control-Request-Headers': null,
                                X_Requested_With: 'XMLHttpRequest'
                            },
                            previewTemplate: document.querySelector('#preview-template2').innerHTML,
                            sending: function (file, xhr, formData) {
                                console.log(file, xhr, formData)
                            }
                        })
                    }, 100)
                }

            },
            notify: function () {

            }
        }
    }
</script>