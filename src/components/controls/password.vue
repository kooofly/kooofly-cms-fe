<template>
    <label class="media">
        <div class="media-left">
            <span class="control-label">{{attrs.control.label}}</span>
        </div>
        <div class="media-body">
            <input class="form-control" placeholder="{{attrs.control.placeholder}}" :name="attrs.name" v-model="model" type="password"/>
        </div>
    </label>
</template>
<script>
    export default {
        props: {
            attrs: {
                type: Object,
                default: function () {
                    return {
                        control: {}
                    }
                }
            },
            model: {
                twoWay: true
            }
        }
    }
</script>