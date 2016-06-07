<template>
    <label class="media media-middle">
        <div class="media-left">
            <span class="control-label">{{attrs.control.label}}</span>
        </div>
        <div class="media-body">
            <input class="form-control" placeholder="number" :name="attrs.name" v-model="model" type="number"/>
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