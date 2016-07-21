<template>
    <div class="btn-group">
        <span>
       <a v-if="parentId" v-link="{ path: '/admin/' + this.$route.params.module + '/' + parentId + '/create' }" class="btn btn-primary btn-radius">{{ '新增' | addText }}</a>
    <a v-else v-link="{ path: module + '/create' }" class="btn btn-primary btn-radius">{{ '新增' | addText }}</a>
    </span>
    </div>
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
        data () {
            return {
                parentId: this.$route.params.id,
                module: this.$route.params.module
            }
        },
        filters: {
            addText (v) {
                var module = this.$route.params.module
                var menu = store.state.menu
                if(menu && menu.length) {
                    for (var i = 0, j = menu.length; i < j; i++) {
                        if(menu[i].alias === module) {
                            return v + menu[i].name.replace('管理', '')
                        }
                    }
                    return v
                }
            }
        }
    }
</script>