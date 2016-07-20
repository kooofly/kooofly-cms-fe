<template>
    <a href="{{value}}" target="_blank">{{value}}</a>
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