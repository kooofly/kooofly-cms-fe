<style type="text/css">
    .layout-image img{ border: 2px solid #f0f0f0; padding: 2px; }
</style>
<template>
    <div><img v-if="value" width="40" height="40" :src="src" /></div>
</template>
<script>
    export default {
        props: {
            value: {},
            rowData: {
                type: Object
            }
        },
        data () {
            return {
                src: ''
            }
        },
        ready () {
            var v = this.value
            if (/http:|https:/.test(v)) {
                this.src = v
            } else {
                if (/\.jpg|\.png|\.gif/.test(v)) {
                    this.src = '/' + v
                } else {
                    this.src = '/src/images/' + v + '.png'
                }
            }

        }
    }
</script>