<template>
    <div>
        <span v-if="value" class="bg bg-success">是</span>
        <span v-else class="bg bg-danger">否</span>
    </div>
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