<style type="text/css">
    .progress-top{ position: absolute; width: 100%; top: 0; left: 0; }
    .table{ width: 100%; }
    .handlers{ padding: 10px; background: #fff; }
</style>
<template>
    <div class="media">
        <div class="media-left">
            <sidebar :tree-model.sync="catagoryModel"></sidebar>
        </div>

        <div class="main media-body">
            <div class="row handlers">
                <div class="col-md-12">
                    <a v-if="parentId" v-link="{ name: 'catagory', params: { id: parentId, page: 'create' } }" class="btn btn-primary btn-radius">新增分类</a>
                    <a v-else v-link="{ name: 'catagory_action', params: { page: 'create' } }" class="btn btn-primary btn-radius">新增分类</a>
                    <a href="javascript:;" class="btn btn-danger btn-radius">批量删除</a>
                </div>
            </div>
            <table class="table">
                <tr>
                    <th>#</th>
                    <th>名称</th>
                    <th>是否启用</th>
                    <th>别名</th>
                </tr>
                <tr v-for="item in catagoryList">
                    <td><input type="checkbox" value="{{item._id}}" /></td>
                    <td>{{item.name}}</td>
                    <td>{{{item.isEnable | isOrNot}}}</td>
                    <td>{{item.alias}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
    var sidebarUri = 'http://api.kooofly.com:3000/resetful/catagory'
    import Sidebar from './sidebar.vue'
    export default {
        data() {
            return {
                parentId: ''
            }
        },
        watch: {

            catagoryModel: function(newVal) {
                console.log(newVal)
            },
            parentId: function(newVal) {
                console.log(newVal)
            }
        },
        route: {
            data: function(transition) {
                this.$emit('dataReady')
                console.log('route.data')
                /*var self = this
                var catagoryList = [], pId = self.$route.params.id
                if(pId) {
                    self.$get('catagoryModel').forEach(function(v, i) {
                        if(v.parentId === pId) {
                            catagoryList.push(v)
                        }
                    })
                    self.$set('catagoryList', catagoryList)
                    self.$set('parentId', pId)
                } else {
                    self.$set('catagoryList', self.$get('catagoryModel'))
                    self.$set('parentId', '')
                }*/
            }
        },
        ready: function() {
            console.log('cat', this)
            var self = this
            this.dataReadyListener();
            this.$http.get({
                url: sidebarUri,
            }).then(function(res) {
                var catagoryModel = []
                res.data.forEach(function(v, i) {
                    v.link = '#!/catagory/' + v._id + '/list'
                    catagoryModel.push(v)
                })
                self.$set('catagoryModel', catagoryModel)
                self.$emit('dataReady')
            })
        },
        methods: {
            dataReadyListener: function() {
                this.$on('dataReady', function() {
                    if(!this.$get('catagoryModel')) return
                    var catagoryList = [], pId = this.$route.params.id
                    if(pId) {
                        this.$get('catagoryModel').forEach(function(v, i) {
                            if(v.parentId === pId) {
                                catagoryList.push(v)
                            }
                        })
                        this.$set('catagoryList', catagoryList)
                        this.$set('parentId', pId)
                    } else {
                        this.$set('catagoryList', this.$get('catagoryModel'))
                        this.$set('parentId', '')
                    }
                })
            }
        },
        components: {
            Sidebar
        }
    }
</script>