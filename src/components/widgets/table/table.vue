<style>
    .arrow {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.66;
    }

    .arrow.asc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid #5cb85c;
    }

    .arrow.dsc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid #5cb85c;
    }
    .option { width: 80px; }
</style>
<template>
    <table class="table">
        <thead>
        <tr>
            <th v-for="key in columns"
                @click="sortBy(key.field)"
                class="{{key.className}}" :class="{active: sortKey == key.field}" >
                {{key.name}}
          <span class="arrow"
                :class="sortOrders[key.field] > 0 ? 'asc' : 'dsc'">
          </span>
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="
        entry in model
        | filterBy filterKey
        | orderBy sortKey sortOrders[sortKey]">
            <td v-for="key in columns" :class="key.className">
                <v-render :value="entry[key.field]" :row-data.sync="entry" :render="key.render"></v-render>
            </td>
        </tr>
        </tbody>
    </table>
</template>
<script>
    //columns: [{ name: '', field: '', render: '' }],data: []
    //{{{ render(entry[key.field], entry, key) }}}
    import util from '../../../common/base/base'
    import config from '../../../common/config'
    import VRender from './render/_index.vue'
    import store from '../../../common/store'
    export default {
        props: {
            attrs: {
                default: function () {
                    return {
                        model: [],
                        module: null,
                        columns: '',
                        query: '' //store.state.mainQuery
                    }
                }
            }
        },
        data() {
            return {
                widgetId: 'table',
                sortOrders: {},
                sortKey: '',
                filterKey: '',
                columns: [],
                query: {},
                model: [],
                uri: ''
            }
        },
        watch: {
            columns: function(newVal) {
                if (!newVal) return
                var sortOrders = {}
                newVal.forEach(function(key) {
                    sortOrders[key.field] = 1
                })
                this.$set('sortKey', '')
                this.$set('sortOrders', sortOrders)
            },
            query: {
                deep: true,
                handler: function (newVal) {
                    this.render()
                }
            }
        },
        ready () {
            this.autoInit()
        },
        methods: {
            autoInit: function () {
                this.query = util.getWidgetConfig.call(this, this.attrs.query)
                this.columns = util.getWidgetConfig.call(this, this.attrs.columns)
                // 资源名 = 模块名
                this.attrs.uri = util.getWidgetConfig.call(this, this.attrs.uri)
            },
            render: function () {
                var self = this
                util.getWidgetData.call(this).then(function (data) {
                    self.model = data
                })
            },
            sortBy: function(key) {
                this.sortKey = key
                this.sortOrders[key] = this.sortOrders[key] * -1
            }
        },
        components: {
            VRender
        }
    }
</script>