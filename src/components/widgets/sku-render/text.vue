<template>
    <input class="form-control" v-model="value" type="text"/>
</template>
<script>
    export default {
        props: {
            value: {
                twoWay: true
            },
            rowData: {
                type: Object
            }
        }
    }
</script>