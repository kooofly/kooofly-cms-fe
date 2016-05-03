
<template>
    <label class="media media-middle">
        <div class="media-left">
            <span class="control-label">{{text}}</span>
        </div>
        <div class="media-body">
            <select class="form-control" v-model="model">
                <option value="text">text</option>
                <option value="textarea">textarea</option>
                <option value="select">select</option>
                <option value="rich_textarea">富文本</option>
            </select>
        </div>
    </label>
</template>
<script>
    export default {
        props: ['text', 'model']
    }
</script>