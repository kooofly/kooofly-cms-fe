<style type="text/css">
    .progress-top{ position: absolute; width: 100%; top: 0; left: 0; }
</style>
<template>
    <v-header v-ref:header></v-header>
    <router-view></router-view>
</template>
<script>
    import VHeader from './header.vue'
    import Sidebar from './sidebar.vue'
    export default {
        watch: {
            menu: function(newVal, oldVal) {
                var nav = []
                newVal.forEach(function(v, i) {
                    if(!v.parentId){
                        nav.push(v)
                    }
                })
                this.$refs.header.$set('nav', nav)
            }
        },
        ready: function() {

            var self = this
            this.$set('menu', this.$root.menu)
            //console.log('index', this)
            setTimeout(function() {
                console.log('index', self)
            }, 1000)

        },
        components: {
            VHeader,
            Sidebar
        }
    }
</script>