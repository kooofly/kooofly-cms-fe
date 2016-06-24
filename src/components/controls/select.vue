
<template>
    <label class="media media-middle">
        <div class="media-left">
            <span class="control-label">{{attrs.control.label}}</span>
        </div>
        <div class="media-body">
            <select name="attrs.name" class="form-control" v-model="model">
                <option v-for="item in renderData" value="{{item.value}}">{{item.text}}</option>
            </select>
        </div>
    </label>
</template>
<script>
    import config from '../../common/config'
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
        data () {
            return {
                renderData: []
            }
        },
        ready () {
            var data = this.attrs.control.data
            if (Object.prototype.toString.call(data) === '[object Array]') {
                this.renderData = data
            }
            if (/@/.test(data)) {
                this.getDataFromAPI(config.apiRoot + data.replace('@', ''))
            }
        },
        methods: {
            getDataFromAPI (api) {
                var self = this
                this.$http.get({
                    url: api
                }).then(function (res) {
                    var sampling = res.data[0]
                    if (sampling.text && sampling.value) {
                        self.renderData = res.data
                    } else if (sampling._id &&  sampling.name) {
                        res.data.forEach(function(v, i) {
                            self.renderData.push({
                                value: v._id,
                                text: v.name
                            })
                        })
                    }

                })
            }
        }
    }
</script>