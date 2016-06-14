<template>
    <ul class="pagination">
        <li v-if="page !== 1 || page"><a class="item" @click="previousPage()" href="javascript:;">«</a></li>
        <li v-for="item in items" track-by="$index"><a class="item" @click="goPage(item)" href="javascript:;">{{item}}</a></li>
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
                twoWay: true,
                default: 5
            },
            total: {
                type: Number,
                default: 95
            },
        },
        computed: {
            items () {
                var result = []
                var count = Math.ceil(this.total / this.limit)
                if (count <= this.maxItem) {
                    console.log(1)
                    for (var i = 1; i <= count; i++) {
                        result.push(i)
                    }
                } else {
                    var half = (this.maxItem - 3) / 2
                    if (this.page - half <= 1) {
                        console.log(2)
                        for (var i = 1; i < this.page; i++) {
                            result.push(i)
                        }
                    } else {
                        console.log(3)
                        result.push(1)
                        result.push('...')
                        for (var i = this.page - half; i < this.page; i++) {
                            result.push(i)
                        }
                    }
                    if (count > this.page + half + 1) {
                        console.log(4)
                        for (var i = this.page; i <= this.page + half; i++) {
                            result.push(i)
                        }
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
            }
        },
        methods: {
            goPage (index) {
                if(typeof index !== 'string')
                console.log('goPage', index)
                this.page = index
            },
            nextPage() {
                this.page = this.page + 1
            },
            previousPage() {
                this.page = this.page - 1
            }
        }
    }
</script>