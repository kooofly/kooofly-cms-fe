<style>
    .tree-root a.active{ background: #ebebeb; }
    .tree-root a.active:hover{ background: #ebebeb; color: #7799bb; }
</style>
<template>
    <ul class="tree tree-root">
        <li v-for="item in treeData">
            <a v-link="{ path: item.link, exact:true, activeClass: 'active' }">{{item.name}}</a>
            <tree-children :model.sync="item.children"></tree-children>
        </li>
    </ul>
</template>
<script>
    import TreeChildren from './tree_children.vue'
    import store from '../../../common/store'
    import util from '../../../common/base/base'
    export default {
        props: {
            attrs: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            model: {}
        },
        data () {
            return {
                widgetId: 'tree',
                treeData: []
            }
        },
        computed: {
            query: function () {
                return {
                    parentId: store.state.activeNav._id
                }
            }
        },
        watch: {
            model: function(newVal) {
                var treeData = this.dataTranslater(newVal, { root: this.query.parentId })
                this.$set('treeData', treeData)
            },
            'query.parentId': function () {
                this.render()
            }
        },
        ready () {
            this.render()
        },
        methods: {
            render: function () {
                var self = this
                util.getWidgetData.call(this).then(function (data) {
                    var menu = (function() {
                        var result = []
                        data.forEach(function(v, i) {
                            var link = '/'+ 'sadmin/' + store.state.activeNav.alias + '/' + (v.alias ? v.alias : v._id)
                            v.link = v.link || link
                            result.push(v)
                        })
                        return result
                    })()
                    // store.dispatch('MENU', menu)
                    self.$set('model', menu)
                })
            },
            dataTranslater: function(data, option) {
                if(!data) return [];
                var _newData = []; //最终返回结果
                var _treeArray = {}; //记录一级节点
                var _root = option.root; //最顶层pid 可选
                var _idKey = option.idKey || "_id"; //主键的键名
                var _pidKey = option.pidKey || "parentId"; //父ID的键名
                _getChildren(_root);
                function _getChildren($root){
                    var $children = [];

                    for (var i in data){
                        if($root == data[i][_pidKey]){
                            data[i]["children"] = _getChildren(data[i][_idKey]);
                            $children.push(data[i]);
                        }
                        //只要一级节点
                        if(_root == data[i][_pidKey] && !_treeArray[data[i][_idKey]]){
                            _treeArray[data[i][_idKey]] = data[i];
                            _newData.push(data[i]);
                        }
                    }
                    return $children;
                }
                return _newData;
            }
        },
        components: {
            TreeChildren
        }
    }
</script>