<template>
    <label class="media media-middle">
        <div class="media-left">
            <span class="control-label">{{text}}</span>
        </div>
        <div class="media-body">
            <input class="form-control" placeholder="{{placeholder}}" v-model="model" type="text"/>
        </div>
    </label>
</template>
<script>
    export default {
        props: ['text', 'model', 'placeholder']
    }
</script>