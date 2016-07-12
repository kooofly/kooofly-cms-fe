<template>
<div class="row">
    <div class="col-md-4">
        <input class="form-control" placeholder="农户" v-model.sync="value.farmer" type="text"/>
    </div>
    <div class="col-md-4">
        <input class="form-control" placeholder="邮政" v-model.sync="value.zip" type="text"/>
    </div>
    <div class="col-md-4">
        <input class="form-control" placeholder="村站" v-model.sync="value.village" type="text"/>
    </div>
</div>
</template>
<script>
    export default {
        props: {
            value: {
                type: Object
            },
            rowData: {
                type: Object
            }
        }
    }
</script>