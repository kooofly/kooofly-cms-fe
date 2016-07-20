<style>
    .form-search { background: #fff; margin-bottom: 10px; }
    .btn-search { margin-left: 10px; }
    .btn-search-switch { display: inline-block; width: 60px; font-size: 12px; }
</style>
<template>
    <div class="search-admin">
        <div v-if="attrs.isSenior && attrs.area" class="panel form-search">
            <div class="body">
                <div class="row">
                    <div v-for="item in attrs.area" class="col-md-6">
                        <v-controls  :attrs="item" :model.sync="model[item.name]"></v-controls>
                    </div>
                </div>
            </div>
            <div class="footer text-right">
                <a class="btn-search-switch" @click="attrs.isSenior = false" href="javascript:;">收起</a>
                <button @click="notify()" class="btn btn-primary btn-search">搜索</button>
            </div>
        </div>
        <div v-else class="panel">
            <div class="body" >
                <div class="media">
                    <div class="media-body">
                        <div class="media media-top search">
                            <div class="media-body"><input :placeholder="attrs.placeholder" class="form-control" :name="model[attrs.key]" v-model="model[attrs.key]" type="search"><i class="icon icon-error clear"></i></div>
                            <div class="media-right"><button @click="notify()" class="btn">搜索</button></div>
                        </div>
                    </div>
                    <div v-if="attrs.area" class="media-right text-right">
                        <a class="btn-search-switch" @click="attrs.isSenior = true" href="javascript:;">高级搜索</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import VControls from '../controls/_index.vue'
    import util from '../../common/base/base'
    import store from '../../common/store'
    export default {
        props: {
            attrs: {
                type: Object,
                default: function () {
                    return {
                        isSenior: false,
                        key: null,
                        area: [],
                        query: ''
                    }
                }
            },
            model: {}
        },
        data () {
            return {
                query: '',
                widgetId: 'search'
            }
        },
        ready: function () {
            if (this.attrs.query) {
                this.query = store.state[this.attrs.query]
            }
            this.render()
            /*this.attrs = {
                store: true,
                isSenior: false,
                key: 'q',
                area: [
                    {
                        name: 'catagoryId',
                        control: {
                            label: '分类',
                            name: 'select',
                            data: '@catagory'
                        }
                    },
                    {
                        name: 'title',
                        attribute: { type: 'String', required: true },
                        control: {
                            name: 'text',
                            label: '名称'
                        }
                    }
                ],
            }*/
        },
        methods: {
            render () {
                var searchKey = util.getWidgetModule.call(this)['searchKey']
                if (!this.attrs.key) {
                    this.attrs.placeholder = searchKey.placeholder
                    this.attrs.key = searchKey.name
                }
            },
            notify () {
                if (this.attrs.query) {
                    for (var k in this.model) {
                        this.$set('query.' + k, this.model[k])
                    }
                } else {
                    this.$dispatch('search', this.model)
                }
            }
        },
        components: {
            VControls
        }
    }
</script>