<style type="text/css">
    .progress-top{ position: absolute; width: 100%; top: 0; left: 0; }
    ul, li{ list-style: none; padding: 0; margin: 0; }
</style>
<template>
    <v-header v-ref:header :nav.sync="nav" :active="activeNav.alias"></v-header>
    <router-view v-ref:content></router-view>
</template>
<script>
    import config from '../../common/config'
    import VHeader from '../com/header.vue'
    import store from '../../common/store'
    export default {
        data() {
            return {
                parentId: '',
                nav: []
            }
        },
        computed: {
            menu () {
                return store.state.menu
            },
            activeNav () {
                return store.state.activeNav
            }
        },
        watch: {
            menu: function(newVal) {
                this.setActiveNav(newVal)
            }
        },
        route: {
            data: function(transition) {
                var self = this
                var module = this.$route.params.module
                var nav = this.$get('nav')
                this.setActiveNav(nav)
            }
        },
        init: function() {

            console.log('tmp_admin', this)
            var self = this
            this.$http.get({
                url: config.menuUri
            }).then(function(res) {
                var menu = res.data
                store.dispatch('MENU', menu)
                var nav = []
                menu.forEach(function(v, i) {
                    if(!v.parentId){
                        nav.push(v)
                    }
                })
                self.$set('nav', nav)
            })

        },
        methods: {
            setActiveNav: function(nav) {
                var self = this
                var path = this.$route.path,
                    module = path.split('/')[2]
                nav.forEach(function(v, i) {
                    if(v.alias === module || v._id  === module ) {
                        store.dispatch('ACTIVENAV', v)
                    }
                })
            }
        },
        components: {
            VHeader
        }
    }
</script>