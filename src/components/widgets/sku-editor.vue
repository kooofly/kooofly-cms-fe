<style>

</style>
<template>
    <div>
        <a @click="addSkuAttr()" href="javascript:;">新增规格</a><input v-model.sync="newSkuAttr" type="text">
        <div class="media attr" v-for="item in sku">
            <div class="media-left">
                <span class="control-label">{{item.text}}</span>
            </div>
            <div class="media-body">
                <div class="check-group">
                    <label v-for="k in item.data">
                        <input value="k.value" type="checkbox" v-model.sync="k.checked" name="item.key" @change="changeModel(k, item)">
                        <span>{{k.value}}</span>
                    </label>
                    <a @click="addSku(item.data, item)" href="javascript:;">添加{{item.text}}</a>
                </div>
            </div>
        </div>
        <table class="table">
            <thead>
            <tr>
                <th v-for="key in columns"
                    class="{{key.className}}" :class="{active: sortKey == key.field}" >
                    {{key.name}}
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="
        entry in model" v-if="!entry.hide">
                <td v-for="key in columns" :class="key.className">
                    <v-render :value.sync="entry[key.field]" :row-data.sync="entry" :render="key.render"></v-render>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import util from '../../common/base/base'
    import VRender from './sku-render/_index.vue'
    /*
     * template
     * 规格选择
     * wrapper
     * 批量设置
     * */
    export default {
        data () {
            return {
                map: {
                    1: 'firstStandard',
                    2: 'secondStandard',
                    3: 'thirdStandard'
                },
                newSkuAttr: '',
                sku: [
                    {
                        text: '规格',
                        key: 'firstStandard',
                        data: [
                            {
                                value: 'a',
                                checked: true
                            },
                            {
                                value: 'b',
                                checked: true
                            }
                        ],
                    }
                ],
                columns: [
                    { name: '库存', field: 'stock' },
                    { name: '售价', field: 'price' },
                    { name: '批发价', field: 'a', render: 'text' },
                    { name: '建议最低售价', field: 'b', render: 'text' },
                    { name: '建议最高售价', field: 'c', render: 'text' },
                    { name: '商品分账', field: 'routing', render: 'routing', default: {} },
                    { name: '商品来源', field: 'source', render: 'source', default: [] }
                ],
                model: [
                    { firstStandard: 'a', stock: 324,price: 234,  a: '1', b: '2', c: '3', routing: {farmer: 'xyz', zip: 456454, village: '安溪村'}, source: [] },
                    { firstStandard: 'b', stock: 324,price: 234,  a: '1', b: '2', c: '3', routing: {farmer: 'xyz', zip: 453454, village: '地发村'}, source: [] }
                ]
            }
        },
        ready: function () {
            var self = this
            this.sku.forEach(function (v) {
                self.columns.unshift({
                    name: v.text,
                    field: v.key
                })
            })
            console.log(this.combination([[1,2],[3,54]]))
        },
        methods: {
            addSkuAttr: function () {
                var self = this
                if (this.newSkuAttr) {
                    var isRepeat = false
                    this.sku.forEach(function (v) {
                        if(v.text === self.newSkuAttr) {
                            isRepeat = true
                            return
                        }
                    })
                    if (!isRepeat) {
                        var index = this.sku.length
                        this.sku.push({
                            text: this.newSkuAttr,
                            key: this.map[index + 1] || '_' + (index + 1),
                            data: []
                        })
                        this.columns.unshift({
                            name: this.newSkuAttr,
                            field: this.map[index + 1] || '_' + (index + 1)
                        })
                    }
                }
            },
            addSku: function (v, item) {
                v.push({
                    value: Math.round(Math.random() * 1000),
                    checked: true
                })
                this.changeModel(v, item)
            },
            changeModel: function (v, item) {
                var rowData = this.getRowData(v.value, item.key)
                // 单SKU处理 start
                if (v.checked) {
                    rowData ? (rowData.rowData.hide = undefined) : this.addRowData(v.value, item)
                } else {
                    this.$set('model[' + rowData.index + '].hide', true)
                }
                // 单SKU处理 END
                
            },
            addRowData: function (value, item) {
                var columns = this.columns
                var result = {}
                columns.forEach(function (v) {
                    if (v.field === item.key) {
                        result[v.field] = value
                    } else {
                        if (Object.prototype.toString.call(v.default) === '[object Array]') {
                            result[v.field] = [].concat(v.default)
                        } else if (Object.prototype.toString.call(v.default) === "[object Object]") {
                            result[v.field] = util.mix({}, v.default)
                        } else {
                            result[v.field] = v.default || ''
                        }
                    }
                })
                this.model.push(result)
            },
            getRowData: function (value, key) {
                var result
                this.model.forEach(function (v, i) {
                    if(v[key] === value) {
                        result = {}
                        result.index = i
                        result.rowData = v
                    }
                })
                return result
            },
            combination: function (combArray) {
                var heads = combArray[0];
                for (var i = 1, j = combArray.length; i < j; i++) {
                    heads = this.addNewType(heads, combArray[i]);
                }
                return heads;
            },
            addNewType: function (heads, choices) {
                var result = [];
                for (var i = 0, j = heads.length; i < j; i++) {
                    var obj = heads[i];
                    for (var m = 0, n = choices.length; m < n; m++) {
                        result.push(heads[i] + ',' + choices[m])
                    }
                }
                return result;
            }
        },
        components: {
            VRender
        }
    }
</script>