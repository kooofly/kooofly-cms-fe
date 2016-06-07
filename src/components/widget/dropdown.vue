<template>
    <div class="dropdown">
        <a href="javascript:;" class="btn btn-danger btn-radius">{{attrs.name}}</a>
        <ul>
            <li v-for="item in attrs.data"><a class="btn btn-danger btn-radius" href="{{item.link}}">{{item.text}}</a></li>
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
        }
    }
</script>
<style>
    .dropdown{ display: inline-block; position: relative; }
    .dropdown ul{ position: absolute; left: 0; top: 34px; width: 90px; }
</style>