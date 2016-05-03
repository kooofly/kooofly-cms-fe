<style type="text/css">
    .progress-top{ position: absolute; width: 100%; top: 0; left: 0; }
    .table{ width: 100%; }
    .handlers{ padding: 10px; background: #fff; }
</style>
<template>
    <v-header v-ref:header></v-header>
    <div class="media">
        <div class="media-left">
            <sidebar :tree-model.sync="treeModel" :parent-id.sync="id"></sidebar>
        </div>

        <div class="main media-body">

        </div>
    </div>
</template>
<script>
    var sidebarUri = 'http://api.kooofly.com:3000/resetful/menu/'
    import VHeader from './header.vue'
    import Sidebar from './sidebar.vue'
    export default {
        ready: function() {
            console.log('cat', this)
            var self = this
            this.$set('id', self.$route.data._id)
            this.$http.get({
                url: sidebarUri,
                data: {
                    parentId: self.$route.data._id
                }
            }).then(function(res) {
                var treeModel = []
                res.data.forEach(function(v, i) {
                    v.link = '#!/system/' + ( v.alias || v._id )
                    treeModel.push(v)
                })
                self.$set('treeModel', treeModel)
            })
        },
        filters: {

        },
        components: {
            VHeader,
            Sidebar
        }
    }
</script>