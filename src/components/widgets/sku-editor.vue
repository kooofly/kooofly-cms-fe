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
        entry in model" v-if="!entry.checked">
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
                //用于搜索
                temp: null,
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
                //注： model 中 checked 为 true 表示删除的数据
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
        },
        methods: {
            // 支持map
            key: function (index) {
                return this.map[index + 1] || '_' + (index + 1)
            },
            // 添加SKU属性名
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
                            key: this.key(index),
                            data: []
                        })
                        this.columns.unshift({
                            name: this.newSkuAttr,
                            field: this.key(index)
                        })
                    }
                }
            },
            // 添加SKU值
            addSku: function (v, item) {
                var o = {
                    value: Math.round(Math.random() * 1000),
                    checked: true
                }
                v.push(o)
                this.changeModel(o, item)
            },
            // === 单SKU处理Start
            singleSKUMain: function (v, item) {
                var rowData = this.getRowData(v.value, item.key)[0]
                // 单SKU处理
                if (v.checked) {
                    rowData ? (rowData.rowData.checked = undefined) : this.addRowData(v.value, item)
                } else {
                    // 单sku删除
                    this.$set('model[' + rowData.index + '].checked', true)
                }
            },
            // 单个sku添加
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
            // === 单SKU处理END

            // 获取 行数据和行号
            getRowData: function (value, key) {
                var result = []
                this.model.forEach(function (v, i) {
                    var r = {}
                    if(v[key] === value) {
                        r.index = i
                        r.rowData = v
                        result.push(r)
                    }
                })
                return result
            },

            // === 多SKU处理Start
            multiSKUMain: function (v, item) {
                // 多sku添加
                if (v.checked) {
                    this.addRows(v.value, item)
                } else {
                    // 多sku删除
                    // 判断是否删除单行内的全部sku
                    var isSKUExist = (function () {
                        var result = false
                        item.data.forEach(function (v) {
                            if(v.checked) {
                                result = true
                                return
                            }
                        })
                        return result
                    })()
                    if (isSKUExist) {
                        // 多SKU删除行
                        this.deleteRow(v.value, item)
                    } else {
                        // 多SKU删除列
                        this.deleteCol(v.value, item)
                    }
                }
            },

            deleteRow: function (value, item) {
                var self = this
                var rowData = this.getRowData(value, item.key)
                rowData.forEach(function (v, i) {
                    self.$set('model[' + v.index + '].checked', true)
                })
            },
            deleteCol: function (value, item) {
                var self = this
                this.columns.forEach(function (v) {
                    if(v['field'] === item.key) {
                        self.columns.$remove(v)
                    }
                })
                this.model.forEach(function (v, i) {
                    self.$set('model[' + i + '].' + item.key, 'undefined')
                })
            },
            addTh: function (item) {
                var isExistTH = false
                this.columns.forEach(function (v) {
                    if (item.key === v['field']) {
                        isExistTH = true
                    }
                })
                if (isExistTH) return
                this.columns.unshift({
                    name: item.text,
                    field: item.key
                })
            },
            addRows: function (value, item) {
                var self = this
                var data = this._dataHandler2()
                var smp = data[0]
                var index = (function () {
                    var i = 0
                    for (var k in smp) {
                        i ++
                    }
                    return i
                })()
                // 添加列
                this.addTh(item)
                var len = self.sku.length
                self.temp = [].concat(self.model)
                // 新增sku 第一个sku添加 需要保留之前的数据
                var isFirst = self.sku[len - 1].data.length === 1 || (function() {
                            var result = true
                            var flg = false
                            self.sku[len - 1].data.forEach(function (v) {
                                if(v.checked) {
                                    if (flg) {
                                        result = false
                                    }
                                    flg = true
                                }
                            })
                            return result
                        })()
                if(isFirst) {
                    self.$set('model', [])
                    data.forEach(function (d, i) {
                        var res = self.searchModel(d, index)
                        if (res) {
                            if (res.checked) {
                                res.checked = undefined
                            }
                            self.model.push(util.mix({}, res, d))
                        } else {
                            self.model.push(self.createRowData(d))
                        }
                    })
                } else {
                    data.forEach(function (d, i) {
                        var res = self.searchModel(d, index + 1)
                        if (!res) {
                            self.model.push(self.createRowData(d))
                        } else {
                            self.$set('model[' + i + '].checked', undefined)
                        }
                    })
                }
            },
            /*
             * 处理数据成
             * [
             *   [{ firstStandard:'xxx', checked: false}, { secondStandard:'xxx'}],
             * ...] 用来后期处理数据使用
             * */
            _dataHandler1: function () {
                var result
                var watingForComb = []
                this.sku.forEach(function (sk) {
                    var r = []
                    sk.data.forEach(function (v) {
                        var o = {}
                        o[sk.key] = v.value
                        if (v.checked) {
                            r.push(o)
                        }/* else {
                            o['checked'] = false
                            r.push(o)
                        }*/
                    })
                    watingForComb.push(r)
                })

                result = this.combination(watingForComb)
                return result
            },
            /*
             * 处理数据成
             * [
             *   { firstStandard:'xxx', secondStandard: 'yyy'},
             *   { firstStandard:'xxx', secondStandard: 'yzy' },
             * ...] 用于mix rowData
             * */
            _dataHandler2: function () {
                var result = []
                var array = this._dataHandler1()
                array.forEach(function (keys) {
                    var o = {}
                    keys.forEach(function (v) {
                        util.mix(o, v)
                    })
                    result.push(o)
                })
                return result
            },
            searchModel: function (d, index) {
                var result
                var condition = this.condition(d, index)
                result = _search(this.temp, condition)
                return result
                // 递归搜索
                function _search (data, condition) {
                    var d = []
                    var c = condition[0]
                    data.forEach(function (v) {
                        for (var k in c) {
                            if (v[k] === c[k]) {
                                d.push(v)
                            }
                        }
                    })
                    condition.shift()
                    if (d.length) {
                        if (condition.length) {
                            return _search(d, condition)
                        } else {
                            return d[0]
                        }
                    } else {
                        return null
                    }
                }
            },
            /*
             * 处理数据成
             * [
             *   { firstStandard:'xxx'},
             *   { secondStandard:'xxx'},
             * ...] 用于model搜索
             * */
            condition: function (o, index) {
                var result = []
                for (var i = 0; i < index - 1; i++) {
                    var r = {}
                    var k = this.key(i)
                    r[k] = o[k]
                    result.push(r)
                }
                return result
            },

            /*
             * 处理数据成
             * { firstStandard: 'a', stock: 324, price: '',  a: '', b: '', c: '', routing: {farmer: '', zip: '', village: ''}, source: [] },
             * 用来后期处理数据使用
             * */
            createRowData: function (o) {
                var columns = this.columns
                var result = {}
                columns.forEach(function (v) {
                    if (o[v.field]) {
                        result[v.field] = o[v.field]
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
                return result
            },
            // === 多SKU处理END
            changeModel: function (v, item) {
                var self = this
                var isSingleSKU = this.sku.length === 1 || (function () {
                            var index = 0
                            self.sku.forEach(function (it) {
                                for (var i = 0, j = it.data.length; i < j; i++) {
                                    var d = it.data[i];
                                    if (d.checked) {
                                        index ++
                                        break
                                    }
                                }
                            })
                            // 多个SKU变成单个SKU的临界值
                            var flg = false
                            item.data.forEach(function (r) {
                                if (r.checked) {
                                    flg = true
                                }
                            })

                            return !flg ? index !== 1 : index <= 1
                        })()
                if (isSingleSKU) {
                    this.singleSKUMain(v, item)
                } else {
                    this.multiSKUMain(v, item)
                }
            },
            //
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
                        result.push([heads[i]].concat([choices[m]]))
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