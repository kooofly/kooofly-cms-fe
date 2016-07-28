<template>
    <div class="pagination">
        <ul class="inner">
            <li><a class="item" @click="previous_page()" href="javascript:;">«</a></li>
            <li v-for="item in items" track-by="$index"><a class="item" :class="this.query._page === item ? 'active': ''" @click="go_page(item)" href="javascript:;">{{item}}</a></li>
            <li><a class="item" @click="next_page()" href="javascript:;">»</a></li>
        </ul>
    </div>
</template>
<script>
    import util from '../../common/base/base'
    export default {
        props: {
            attrs: {
                default: function () {
                    return {
                        maxItem: 7, //奇数
                        total: '',
                        query: {
                            _limit: 10,
                            _page: 1, // current_page
                        }
                    }
                }
            }
        },
        data () {
            return {
                total: '',
                widgetId: 'pagination',
                maxItem: 7,
                query: {}
            }
        },
        ready: function () {
            if (this.attrs.query) {
                this.query = this.attrs.query
            }
            this.attrs.maxItem && (this.maxItem = this.attrs.maxItem)
            this.attrs.total && (this.total = this.attrs.total)
        },
        computed: {
            items () {
                if(!this.total) return
                var result = []
                var count = Math.ceil(this.total / this.query._limit)
                if (count <= this.attrs.maxItem) {
                    console.log(1)
                    for (var i = 1; i <= count; i++) {
                        result.push(i)
                    }
                } else {
                    //3： 第一页和最后一页和自己
                    //普通情况，保持自己在中间两侧有计算出的数量的paging
                    //特殊情况，保持整个pagination有指定数量个paging

                    var half = (this.attrs.maxItem - 3) / 2

                    // 计算_page左侧数据
                    if (this.query._page - half - 2 < 1) {
                        console.log(2)
                        for (var i = 1; i < this.query._page; i++) {
                            result.push(i)
                        }
                    } else {
                        console.log(3)
                        result.push(1)
                        result.push('...')
                        this.rightLack(result, half, count)
                        for (var i = this.query._page - half; i < this.query._page; i++) {
                            result.push(i)
                        }
                    }

                    // 计算_page右侧数据
                    if (count > this.query._page + half + 1) {
                        console.log(4)
                        for (var i = this.query._page; i <= this.query._page + half; i++) {
                            result.push(i)
                        }
                        this.leftLack(result, half)
                        result.push('...')
                        result.push(count)
                    } else {
                        console.log(5)
                        for (var i = this.query._page; i <= count; i++) {
                            result.push(i)
                        }
                    }

                }

                return result
            },
            count () {
                if(!this.total) return null
                var count = Math.ceil(this.total / this.query._limit)
                return count
            }
        },
        methods: {
            go_page (index) {
                if(typeof index === 'string') return
                console.log('go_page', index)
                this.query._page = index
            },
            next_page() {
                if( this.count && this.query._page + 1 > this.count) return
                this.query._page = this.query._page + 1
            },
            previous_page() {
                if (this.query._page - 1 < 1) return
                this.query._page = this.query._page - 1
            },
            leftLack (result, half) {
                // 特殊情况，保持整个pagination有指定数量个paging
                // _page左侧不够half数量的paging
                // _page左侧缺少的数量
                // _page右侧补足
                var leftLack = half - this.query._page + 2
                if (leftLack > 0) {
                    var start = this.query._page + half + 1
                    console.log('leftLack', leftLack, 'start', start, 'half', half, '_page', this.query._page)
                    console.log('half', half)
                    for (var i = start; i <= start + leftLack - 1; i++) {
                        result.push(i)
                    }
                }
            },
            rightLack (result, half, count) {
                // _page右侧不够half数量的paging
                // _page右侧缺少的数量
                // _page左侧补足
                var rightLack = half - count + this.query._page + 1
                if (rightLack > 0) {
                    var start = this.query._page - half - rightLack
                    console.log('rightLack', rightLack, 'start', start, 'half', half, 'count', count, '_page', this.query._page)
                    for (var i = start; i < this.query._page - half; i++) {
                        result.push(i)
                    }
                }
            }
        }
    }
</script>