<style>
  .sidebar{ width: 300px; }
  .sidebar .customArea{ background: #fff; padding: 10px; text-align: center; margin-bottom: 20px; }
  .sidebar .customArea .btn{ margin: 0 0 0px; }
  .sidebar .customArea .btn:last-child{ margin: 0; }
</style>
<template>
  <aside class="sidebar">
    <div class="customArea">
      <a class="btn btn-success btn-block btn-radius" href="javascript:;">一个自定义Link</a>
    </div>
    <ul class="tree tree-root">
      <tree :model.sync="treeModel" :parent-id.sync="parentId"></tree>
    </ul>
  </aside>
</template>
<script>
  import Tree from './tree.vue'
  export default {
    props: ['treeModel', 'prev', 'parentId'],
    data() {
      console.log('sidebar', this)
    },
    components: {
      Tree
    }
  }
</script>