<style type="text/css">
    @import "../../src/common/base/base.css";
    body{ background: #f9f9f9; line-height: 1.6 }
    .wrapper{ padding: 10px; }
</style>
<template>
    <router-view></router-view>
</template>

<script>
import VHeader from '../../src/components/header.vue'
import Index from '../../src/components/p_index.vue'

export default {
    data () {
        return {}
    },
    components: {
//        Index
        VHeader
    }
}
</script>
