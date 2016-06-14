<template>
    <ul class="pagination">
        <li><a class="item" @click="previousPage()" href="javascript:;">«</a></li>
        <li v-for="item in items" track-by="$index"><a class="item" :class="this.page === item ? 'active': ''" @click="goPage(item)" href="javascript:;">{{item}}</a></li>
        <li><a class="item" @click="nextPage()" href="javascript:;">»</a></li>
    </ul>
</template>
<script>
    export default {
        props: {
            maxItem: {
                type: Number,
                default: 7 //奇数
            },
            limit: {
                type: Number,
                default: 10
            },
            page: { // currentPage
                type: Number,
                twoWay: true
            },
            total: {
                type: Number
            },
        },
        computed: {
            items () {
                if(!this.total) return
                var result = []
                var count = Math.ceil(this.total / this.limit)
                if (count <= this.maxItem) {
                    console.log(1)
                    for (var i = 1; i <= count; i++) {
                        result.push(i)
                    }
                } else {
                    //3： 第一页和最后一页和自己
                    //普通情况，保持自己在中间两侧有计算出的数量的paging
                    //特殊情况，保持整个pagination有指定数量个paging

                    var half = (this.maxItem - 3) / 2

                    // 计算page左侧数据
                    if (this.page - half - 2 < 1) {
                        console.log(2)
                        for (var i = 1; i < this.page; i++) {
                            result.push(i)
                        }
                    } else {
                        console.log(3)
                        result.push(1)
                        result.push('...')
                        this.rightLack(result, half, count)
                        for (var i = this.page - half; i < this.page; i++) {
                            result.push(i)
                        }
                    }

                    // 计算page右侧数据
                    if (count > this.page + half + 1) {
                        console.log(4)
                        for (var i = this.page; i <= this.page + half; i++) {
                            result.push(i)
                        }
                        this.leftLack(result, half)
                        result.push('...')
                        result.push(count)
                    } else {
                        console.log(5)
                        for (var i = this.page; i <= count; i++) {
                            result.push(i)
                        }
                    }

                }

                return result
            },
            count () {
                if(!this.total) return null
                var count = Math.ceil(this.total / this.limit)
                return count
            }
        },
        methods: {
            goPage (index) {
                if(typeof index === 'string') return
                console.log('goPage', index)
                this.page = index
            },
            nextPage() {
                if( this.count && this.page + 1 > this.count) return
                this.page = this.page + 1
            },
            previousPage() {
                if (this.page - 1 < 1) return
                this.page = this.page - 1
            },
            leftLack (result, half) {
                // 特殊情况，保持整个pagination有指定数量个paging
                // page左侧不够half数量的paging
                // page左侧缺少的数量
                // page右侧补足
                var leftLack = half - this.page + 2
                if (leftLack > 0) {
                    var start = this.page + half + 1
                    console.log('leftLack', leftLack, 'start', start, 'half', half, 'page', this.page)
                    console.log('half', half)
                    for (var i = start; i <= start + leftLack - 1; i++) {
                        result.push(i)
                    }
                }
            },
            rightLack (result, half, count) {
                // page右侧不够half数量的paging
                // page右侧缺少的数量
                // page左侧补足
                var rightLack = half - count + this.page + 1
                if (rightLack > 0) {
                    var start = this.page - half - rightLack
                    console.log('rightLack', rightLack, 'start', start, 'half', half, 'count', count, 'page', this.page)
                    for (var i = start; i < this.page - half; i++) {
                        result.push(i)
                    }
                }
            }
        }
    }
</script>