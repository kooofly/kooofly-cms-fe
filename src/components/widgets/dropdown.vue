<template>
    <div class="dropdown" @mouseleave="this.isShow=false">
        <a href="javascript:;" class="btn btn-primary" @mouseover="this.isShow=true">
            {{attrs.name}}
            <span class="arrow" :class="this.isShow ? 'asc' : 'dsc'"></span>
        </a>
        <ul v-show="isShow">
            <li v-for="item in attrs.data"><a class="btn btn-info btn-block" href="{{item.link}}">{{item.text}}</a></li>
        </ul>
    </div>
</template>
<script>
    export default {
        props: {
            attrs: {
                type: Object,
                default: function () {
                    return {
                        control: {}
                    }
                }
            }
        },
        data () {
            return {
                isShow: false
            }
        }
    }
</script>
<style>
    .dropdown{ display: inline-block; position: relative; z-index: 10; }
    .dropdown ul{ position: absolute; left: 0; top: 34px; width: 100%; }
    .dropdown .arrow{ opacity:1; }
    .dropdown .arrow.asc{ border-bottom-color: #fff;  }
    .dropdown .arrow.dsc{ border-top-color: #fff; }
</style>