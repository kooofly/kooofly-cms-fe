<style>
    .source{ width: 180px; text-align: center; }
    .source .media{ text-align: left; }
    .source span { display: inline-block; width: 60px; }
    .source .delete{ display: inline-block; width: 40px; }
</style>
<template>
    <div class="source">
        <div class="media" v-for="v in value">
            <div class="media-left">
                <span>{{v.farmer}}</span>
            </div>
            <div class="media-body">
                <span>{{v.stock}}</span>
            </div>
            <div class="media-right">
                <a class="delete" @click="delete(v)" href="javascript:;">删除</a>
            </div>
        </div>
        <a class="add" @click="addSource()" href="javascript:;">设置商品来源</a>
    </div>

</template>
<script>
    export default {
        props: {
            value: {},
            rowData: {
                type: Object
            }
        },
        methods: {
            delete: function (v) {
                this.rowData.source.$remove(v)
            },
            addSource: function () {
                this.rowData.source.push({
                    farmer: '农户' + Math.round(Math.random() * 1000),
                    stock: Math.round(Math.random() * 1000)
                })
            }
        }
    }
</script>