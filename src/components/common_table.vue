<style type="text/css">
    .progress-top{ position: absolute; width: 100%; top: 0; left: 0; }
    .table{ width: 100%; }
    .handlers{ padding: 10px; background: #fff; }
</style>
<template>
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
</template>
<script>
    var sidebarUri = 'http://api.kooofly.com:3000/resetful/catagory'
    import VHeader from './header.vue'
    import Sidebar from './sidebar.vue'
    export default {
        data() {
            return {
                parentId: ''
            }
        },
        watch: {
            menu: function(newVal, oldVal) {
                var nav = []
                newVal.forEach(function(v, i) {
                    if(!v.parentId){
                        nav.push(v)
                    }
                })
                this.$refs.header.$set('nav', nav)
            }
        },
        route: {
            data: function(transition) {
                console.log(1)
                var self = this
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
                }
            }
        },
        ready: function() {
            console.log('cat', this)
            var self = this
            this.$http.get({
                url: sidebarUri,
            }).then(function(res) {
                var catagoryList = [],
                    pId = self.$route.params.id,
                    catagoryModel = []
                res.data.forEach(function(v, i) {
                    v.link = '#!/catagory/' + v._id + '/list'
                    catagoryModel.push(v)
                })
                self.$set('catagoryModel', catagoryModel)

                if(pId) {
                    self.$get('catagoryModel').forEach(function(v, i) {
                        if(v.parentId === pId) {
                            catagoryList.push(v)
                        }
                    })
                    self.$set('catagoryList', catagoryList)
                } else {
                    self.$set('catagoryList', catagoryModel)
                }
            })
        },
        filters: {
            isOrNot: function(value) {
               return value ? '<span class="bg bg-success">是</span>' : '<span class="bg bg-danger">否</span>'
            }
        },
        components: {
            VHeader,
            Sidebar
        }
    }
</script>