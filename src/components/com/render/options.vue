<template>
    <a @click="deleteData()" href="javascript:;" class="text-danger action-delete">删除</a>
</template>
<script>
    export default {
        props: {
            value: {},
            rowData: {
                type: Object
            }
        },
        methods: {
            deleteData () {
                console.log('delete:', this.value)
            }
        }
    }
</script>