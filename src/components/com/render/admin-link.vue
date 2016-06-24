<template>
    <div>
        <span v-if="value">{{value}}</span>
        <span v-else class="text-helper">/#!/admin/{{rowData.alias}}</span>
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