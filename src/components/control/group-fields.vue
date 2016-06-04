<template>
    <div class="media media-middle">
        <div class="media-left">
            <span class="control-label">&nbsp;</span>
        </div>
        <div class="media-body">
            <button class="btn btn-block" @click="addField()">添加字段</button>
            <div class="body" v-for="item in model">
                <a class="close" @click="deleteField(item)" href="javascript:;">×</a>
                <label class="media media-middle">
                    <div class="media-left">
                        <span class="control-label">字段名称</span>
                    </div>
                    <div class="media-body">
                        <input class="form-control" v-model="item.name" name="name" placeholder="字段key" type="text"/>
                    </div>
                </label>

                <label class="media media-middle">
                    <div class="media-left">
                        <span class="control-label">控件类型</span>
                    </div>
                    <div class="media-body">
                        <select name="control.name" v-model="item.control.name" class="form-control">
                            <option value="text">文本框 - text</option>
                            <option value="textarea">文本域 - textarea</option>
                            <option value="select">选择框 - select</option>
                            <option value="textarea-rich">富文本框 - textarea-rich</option>
                            <option value="radio-boolean">布尔Radio - radio-boolean</option>
                            <option value="number">数字 - number</option>
                            <option value="upload">文件上传 - upload</option>
                            <option value="group-fields">控件组 - group-fields</option>
                            <option value="group-info">控件组 - group-info</option>
                        </select>
                    </div>
                </label>
                <label class="media media-middle">
                    <div class="media-left">
                        <span class="control-label">控件Label</span>
                    </div>
                    <div class="media-body">
                        <input class="form-control" v-model="item.control.label" name="control.label" placeholder="字段key" type="text"/>
                    </div>
                </label>
                <label class="media media-middle">
                    <div class="media-left">
                        <span class="control-label">控件数据</span>
                    </div>
                    <div class="media-body">
                        <textarea class="form-control" name="control.data" v-model="item.control.data"></textarea>
                    </div>
                </label>
                <label class="media media-middle">
                    <div class="media-left">
                        <span class="control-label">数据类型</span>
                    </div>
                    <div class="media-body">
                        <select name="attribute.type" v-model="item.attribute.type" class="form-control">
                            <option value="text">Int</option>
                            <option value="textarea">Double</option>
                            <option value="select">String</option>
                            <option value="rich_textarea">.etc</option>
                        </select>
                    </div>
                </label>
                <label class="media media-middle">
                    <div class="media-left">
                        <span class="control-label">字段描述</span>
                    </div>
                    <div class="media-body">
                        <input class="form-control" v-model="item.description" placeholder="描述字段的用途等" type="text"/>
                    </div>
                </label>
            </div>
        </div>
    </div>
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
                twoWay: true,
                default: function () {
                    return []
                }
            }
        },
        methods: {
            addField () {
                if (!this.model) {
                    this.model = []
                }
                this.model.push({})
            },
            deleteField (item) {
                this.model.$remove(item)
            }
        }
    }
</script>