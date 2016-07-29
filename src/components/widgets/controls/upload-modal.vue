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
</style>
<template>
    <div v-if="show">
        <div class="layer"></div>
        <div id="upload-modal" class="upload-modal modals panel">
            <span class="close iconfont icon icon-shanchu"></span>
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
                        <div class="upload">
                            <ul class="model">
                                <li class="item">
                                    <a class="control-add" href="javascript:;"><i class="iconfont icon icon-add"></i></a>
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
                                </li>
                                <li class="item">
                                    <img src="http://api.kooofly.com:3000/ueditor/php/upload/image/749131770368233472.jpg" alt="">
                                    <span class="ratio">343*23</span>
                                    <div class="name tof">23434 dfjlfja dfj adfljlasd laflda</div>
                                </li>
                                <li class="item">
                                    <img src="http://api.kooofly.com:3000//ueditor/php/upload/image//749127193786978304.jpg?noCache=ir7hranu" alt="">
                                    <span class="ratio">343*23</span>
                                    <div class="name tof"> dfjlfja dfj adfljlasd laflda</div>
                                </li>
                                <li class="item">
                                    <img src="http://api.kooofly.com:3000/ueditor/php/upload/image/749131770368233472.jpg" alt="">
                                    <span class="ratio">343*23</span>
                                    <div class="name tof">23434  dfj adfljlasd laflda</div>
                                </li>
                                <li class="item">
                                    <img src="http://api.kooofly.com:3000/ueditor/php/upload/image/749131770368233472.jpg" alt="">
                                    <span class="ratio">343*23</span>
                                    <div class="name tof">23434 dfjlfja dfj adfljlasd laflda</div>
                                </li>
                                <li class="item">
                                    <img src="http://api.kooofly.com:3000//ueditor/php/upload/image//749126475525001216.jpg?noCache=ir7hranu" alt="">
                                    <span class="ratio">343*23</span>
                                    <div class="name tof">234 dfj adfljlasd laflda</div>
                                </li>
                                <li class="item">
                                    <img src="http://api.kooofly.com:3000//ueditor/php/upload/image//749129793152356352.jpg?noCache=ir7hranu" alt="">
                                    <span class="ratio">343*23</span>
                                    <div class="name tof">23434 dfjlfja dfj adfljlasd laflda</div>
                                </li>
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
    </div>

</template>
<script>
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
        events: {
            modal: function (attrs) {
                console.log(attrs)
                this.show = true
                this.$appendTo('body')
            },
            notify: function () {

            }
        }
    }
</script>