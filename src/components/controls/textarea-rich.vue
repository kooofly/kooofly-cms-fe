<template>
    <label class="media">
        <div class="media-left">
            <span class="control-label">{{attrs.control.label}}</span>
        </div>
        <div class="media-body">
            <input class="form-control" placeholder="textarea-rich" :name="attrs.name" v-model="model" type="text"/>
        </div>
    </label>
</template>
<script>
    export default {
        props: {
            attrs: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            model: {
                twoWay: true
            }
        }
    }
</script>