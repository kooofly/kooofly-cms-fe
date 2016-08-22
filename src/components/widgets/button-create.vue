<template>
    <span class="button-wrapper">
       <a v-if="parentId" v-link="{ path: '/admin/' + this.$route.params.module + '/' + parentId + '/create' }" class="btn btn-primary btn-radius">{{attrs.text}}</a>
    <a v-else v-link="{ path: module + '/create' }" class="btn btn-primary btn-radius">{{attrs.text}}</a>
    </span>

</template>
<script>
    import store from '../../common/store'
    export default {
        props: {
            attrs: {
                type: Object,
                default: function () {
                    return {}
                }
            }
        },
        watch: {
            menu: function (newVal) {
                this.addText(newVal)
            }
        },
        computed: {
            menu: function () {
                return store.state.menu
            }
        },
        data () {
            return {
                parentId: this.$route.params.id,
                module: this.$route.params.module
            }
        },
        ready: function () {
            this.addText(this.menu)
        },
        methods: {
            addText: function (menu) {
                var v = '新增'
                var module = this.$route.params.module
                var text = menu.name ? v + menu.name.replace('管理', '') : v
                this.$set('attrs.text', text)
            }
        }
    }
</script>