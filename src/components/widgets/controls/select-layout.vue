<style>
    .wrap-layout { line-height: 1; height: 92px; }
    .wrap-layout img{ margin-right: 10px; padding: 4px; border: 4px solid #f0f0f0; border-radius: 4px; cursor: pointer; }
    .wrap-layout .selected{ border-color: #00bfff; }
</style>
<template>
    <label class="media media-top">
        <div class="media-left">
            <span class="control-label">{{attrs.control.label}}</span>
        </div>
        <div class="media-body">
            <div class="wrap-layout">
                <img :class="model === 'LayoutH' ? 'selected' : ''" @click="select('LayoutH')" src="../../../images/LayoutH.png" alt="">
                <img :class="model === 'LayoutS' ? 'selected' : ''" @click="select('LayoutS')" src="../../../images/LayoutS.png" alt="">
                <img :class="model === 'LayoutM' ? 'selected' : ''" @click="select('LayoutM')" src="../../../images/LayoutM.png" alt="">
            </div>
        </div>
    </label>
</template>
<script>
    import config from '../../../common/config'
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
        },
        methods: {
            select (v) {
                this.model = v
            }
        }
    }
</script>