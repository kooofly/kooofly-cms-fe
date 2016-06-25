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
        entry in data
        | filterBy filterKey
        | orderBy sortKey sortOrders[sortKey]">
            <td v-for="key in columns">
                <v-render :value="entry[key.field]" :row-data.sync="entry" :render="key.render"></v-render>
            </td>
        </tr>
        </tbody>
    </table>
</template>
<script>
    //columns: [{ name: '', field: '', render: '' }],data: []
    //{{{ render(entry[key.field], entry, key) }}}
    import util from '../../common/base/base'
    import VRender from './render/_index.vue'
    export default {
        props: {
            data: [],
            columns: [],
            filterKey: ''
        },
        data() {
            return {
                sortOrders: {},
                sortKey: ''
            }
            /*var sortOrders = {}
            this.columns.forEach(function(key) {
                sortOrders[key] = 1
            })
            return {
                sortKey: '',
                sortOrders: sortOrders
            }*/
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
            }
        },
        methods: {
            sortBy: function(key) {
                this.sortKey = key
                this.sortOrders[key] = this.sortOrders[key] * -1
            },
            render: function(name, rowData, columnOpt) {
                var result
                var renderFn = this[columnOpt.render]
                if(renderFn) {
                    result = renderFn(name, rowData)
                } else {
                    result = name
                }
                return result
            },
            isOrNot: function(value, rowData) {
                return value ? '<span class="bg bg-success">是</span>' : '<span class="bg bg-danger">否</span>'
            },
            checkbox: function(value, rowData) {
                return '<input type="checkbox" value="' + value + '" />'
            },
            linkToEdit: function(value, rowData) {
                var module = util.getMode('main', this)
                var href = '/#!/admin/' + module + '/' + rowData._id + '/update'
                return '<a href="' + href + '">' + value + '</a>'
            },
            link_blank: function (value, rowData) {
                return '<a href="' + value + '" target="_blank">' + value + '</a>'
            },
            adminLink: function (value, rowData) {
                return value ? value : '<span class="text-helper">/#!/admin/' + rowData.alias + '</span>'
            },
            option: function(value, rowData) {
                var module = this.$route.params.module
                return '<a @click="abc()" class="text-danger action-delete">删除</a>'
            },
            abc: function () {
                console.log(1)
            }
        },
        components: {
            VRender
        }
    }
</script>