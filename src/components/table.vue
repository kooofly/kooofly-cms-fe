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
</style>
<template>
    <table class="table">
        <thead>
        <tr>
            <th v-for="key in columns"
                @click="sortBy(key.field)"
                :class="{active: sortKey == key.field}">
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
                {{{ render(entry[key.field], entry, key) }}}
            </td>
        </tr>
        </tbody>
    </table>
</template>
<script>
    //columns: [{ name: '', field: '', render: '' }],data: []
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
                var module = this.$route.params.module
                var path = this.$route.path
                return '<a href="/#!' + path + '/' + rowData._id + '/update' + '">' + value + '</a>'
            }
        }
    }
</script>