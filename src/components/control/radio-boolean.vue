<template>
    <label class="media media-middle">
        <div class="media-left">
            <span class="control-label">{{attrs.control.label}}</span>
        </div>
        <div class="media-body">
            <div class="check-group">
                <label>
                    <input :name="attrs.name" value='1' v-model="model" type="radio"/>
                    <span>是</span>
                </label>
                <label>
                    <input :name="attrs.name" value='0' v-model="model" type="radio"/>
                    <span>否</span>
                </label>
            </div>
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