<template>
    <li v-for="item in treeData">
        <!--<a v-link="{ name: prev, params:{ id: item._id, page: 'list' }}">{{item.name}}</a>-->
        <a href="{{item.link}}">{{item.name}}</a>
        <tree-children :model.sync="item.children"></tree-children>
    </li>
</template>
<script>
    import TreeChildren from './tree_children.vue'
    export default {
        name: 'tree',
        props: ['model', 'root'],
        data () {
            return {
                treeData: []
            }
        },
        watch: {
            model: function(newVal) {
                var treeData = this.dataTranslater(newVal, { root: this.$get('root') })
                this.$set('treeData', treeData)
            }
        },
        methods: {
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