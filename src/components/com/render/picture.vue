<template>
    <img width="40" height="40" :src="value" />
</template>
<script>
    export default {
        props: {
            value: {},
            rowData: {
                type: Object
            }
        }
    }
</script>