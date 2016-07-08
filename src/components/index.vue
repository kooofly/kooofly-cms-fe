<style type="text/css">
    .progress-top{ position: absolute; width: 100%; top: 0; left: 0; }
</style>
<template>
    <div style="text-align: center; margin-top: 40px;">我是一个神奇的首页，访问后台请点击 <a v-link="'/admin'">这里</a></div>
    <div class="row">
        <div class="col-md-4">
            <v-widget></v-widget>
        </div>
        <div class="col-md-4">
            <v-widget></v-widget>
        </div>
        <div class="col-md-4">
            <v-widget></v-widget>
        </div>
    </div>
</template>
<script>
    export default {
        prop: {
            config: []
        }
    }
</script>