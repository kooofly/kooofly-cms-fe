<template>
    <input type="checkbox" :value="value" />
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