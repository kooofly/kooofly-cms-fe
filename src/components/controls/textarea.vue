<template>
    <label class="media media-top">
        <div class="media-left">
            <span class="control-label">{{attrs.control.label}}</span>
        </div>
        <div class="media-body">
            <textarea class="form-control" :name="attrs.name" :placeholder="attrs.control.placeholder" cols="30" rows="6" v-model="model | json"></textarea>
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