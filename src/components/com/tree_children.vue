<template>
    <ul class="tree">
        <li v-for="item in model">
            <a href="{{item.link}}">{{item.name}}</a>
            <tree-children :model="item.children"></tree-children>
        </li>
    </ul>
</template>
<script>
    export default {
        name: 'treeChildren',
        props: ['model'],
    }
</script>