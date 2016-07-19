<style>
    .form-search { background: #fff; margin-bottom: 10px; }
    .btn-search { margin-left: 10px; }
    .btn-search-switch { display: inline-block; width: 60px; font-size: 12px; }
</style>
<template>
    <div>
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
        <div v-else v-if="attrs.key" class="panel">
            <div class="body" >
                <div class="media">
                    <div class="media-body">
                        <div class="media media-top search">
                            <div class="media-body"><input :placeholder="attrs.key.placeholder" class="form-control" :name="model[attrs.key]" v-model="model[attrs.key]" type="search"><i class="icon icon-error clear"></i></div>
                            <div class="media-right"><button @click="notify()" class="btn">搜索</button></div>
                        </div>
                    </div>
                    <div class="media-right text-right">
                        <a class="btn-search-switch" @click="attrs.isSenior = true" href="javascript:;">高级搜索</a>
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
                        isSenior: false,
                        key: null,
                        area: [],
                    }
                }
            },
            model: {
                default: function () {
                    return {
                        _map: 'catagory_link_content',
                        _pattern: 'onetomany',
                        _limit: 10,
                        _page: 1
                    }
                }
            }
        },
        ready: function () {
            this.attrs = {
                isSenior: false,
                key: 'q',
                area: [],
            }
        },
        methods: {
            notify () {
                console.log(this.$log())
                this.$dispatch('search', this.model)
            }
        }
    }
</script>