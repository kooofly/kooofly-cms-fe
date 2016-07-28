<style>
    .form-search { background: #fff; margin-bottom: 10px; }
    .btn-search { margin-left: 10px; }
    .btn-search-switch { display: inline-block; width: 60px; font-size: 12px; }
</style>
<template>
    <div class="search-admin">
        <div v-if="isSenior && area" class="panel form-search">
            <div class="body">
                <div class="row">
                    <div v-for="item in area" class="col-md-6">
                        <v-controls  :attrs="item" :model.sync="model[item.name]"></v-controls>
                    </div>
                </div>
            </div>
            <div class="footer text-right">
                <a class="btn-search-switch" @click="isSenior = false" href="javascript:;">收起</a>
                <button @click="notify()" class="btn btn-primary btn-search">搜索</button>
            </div>
        </div>
        <div v-if="key" v-else class="panel">
            <div class="body" >
                <div class="media">
                    <div class="media-body">
                        <div class="media media-top search">
                            <div class="media-body"><input :placeholder="placeholder" class="form-control" :name="key" v-model="model[key]" type="search"><i class="icon icon-error clear"></i></div>
                            <div class="media-right"><button @click="notify()" class="btn">搜索</button></div>
                        </div>
                    </div>
                    <div v-if="area" class="media-right text-right">
                        <a class="btn-search-switch" @click="isSenior = true" href="javascript:;">高级搜索</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import VControls from '../controls/_index.vue'
    export default {
        props: {
            attrs: {
                type: Object,
                default: function () {
                    return {
                        placeholder: '',
                        key: null,
                        area: [
                            /*{
                                name: 'catagoryId',
                                control: {
                                    label: '分类',
                                    name: 'select',
                                    data: '@catagory'
                                }
                            }*/
                        ],
                        query: ''
                    }
                }
            }
        },
        data () {
            return {
                query: {},
                key: 'title',
                placeholder: '',
                widgetId: 'search',
                area: [],
                model: {},
                isSenior: false
            }
        },
        ready: function () {
            var attrs = this.attrs
            for (var k in attrs) {
                this[k] = attrs[k]
            }
        },
        methods: {
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