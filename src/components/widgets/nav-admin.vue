<style scoped>
    .header{ background: #fff; }
    .header .logo{ width: 100px; height: 40px; background: #eee; display: block; }
    .header nav{ font-family: "Microsoft YaHei", sans-serif; font-size: 0; }
    .header nav a{ font-size: 14px; margin: 3px 10px; display: inline-block; padding: 6px 20px; background: #7799bb; color: #fff; border-radius: 34px; }
    .header nav a:hover{ opacity: .9 }
    .header nav a.v-link-active{ background: #d9534f; box-shadow: #d0534e 0 0 3px 3px inset; opacity: 1 }
    .header nav a.active{ background: #d9534f; box-shadow: #d0534e 0 0 3px 3px inset; opacity: 1 }
</style>
<template>
    <nav class="wrapper an-group-moveFromRightFade">
        <a v-for="item in model" class="anitem" :class="active === item.alias && 'active'" v-link="{ path: '/admin/' + item.alias }">{{item.name}}</a>
    </nav>
</template>
<script>
    import util from '../../common/base/base'
    import config from '../../common/config'
    import store from '../../common/store'
    export default {
        props: {
            attrs: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            model: {}
        },
        ready () {
            var self = this

            this.$http.get({
                url: util.uri.call(this)
            }).then(function(res) {
                var menu = res.data

                store.dispatch('MENU', menu)
                var nav = []
                menu.forEach(function(v, i) {
                    if(!v.parentId){
                        nav.push(v)
                    }
                })
                self.$set('model', nav)
            })
        }
    }
</script>