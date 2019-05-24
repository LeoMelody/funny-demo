<template>
  <div class="tree-item">
    <div class="tree-head" :style="`padding-left:${tree.level * 20}px;`" v-if="tree">
      <div v-if="tree.treeName" @mouseenter="showChoose($event, tree.treeName)" @mouseleave="hideChoose">
        <input type="checkbox" id="checkb" v-model="tree.value" @change="recursiTree">
        <label for="checkb">{{tree.treeName}}</label>
        <div :style="`padding-left: 100px; display: inline-block;`" v-show="showFloat">
          <button @click="addChildren">添加</button>
          <button @click="deleteCurrent">删除</button>
        </div>
      </div>
      <div v-else>
        <input type="checkbox" name="" id="">
        <input type="text" name="" id="" v-model="tree.tmpName" @keyup.enter="confirmV" placeholder="请输入节点名称">
      </div>
    </div>
    <template v-if="tree && tree.children">
      <div class="tree-child" v-for="treeC in tree.children" :key="treeC.treeName">
        <my-tree :tree="treeC"/>
      </div>
    </template>
    
  </div>
</template>

<script>
import MyTree from './Tree'
export default {
  name: 'my-tree',
  data() {
    return {
      floatX: 0,
      floatY: 0,
      showFloat: false
    }
  },
  mounted() {
  },
  props: {
    tree: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    MyTree
  },
  methods: {
    showChoose(e) {
      this.showFloat = true
      this.floatX = e.x + 100
      this.floatY = e.y
    },
    hideChoose() {
      this.showFloat = false
    },
    addChildren() {
      this.tree.children.push({
        treeName: '',
        tmpName: '',
        level: this.tree.level + 1,
        value: false,
        father: this.tree,
        children: []
      })
    },
    deleteCurrent() {
      let index = this.tree.father.children.findIndex(item => item === this.tree)
      this.tree.father.children.splice(index, 1)
    },
    confirmV() {
      this.tree.treeName = this.tree.tmpName
    },
    recursiTree() {
      let value = this.tree.value
      this.recursi(this.tree.children, value)
    },

    recursi(children, value) {
      if(children && children.length) {
        for (let item of children) {
          item.value = value
          this.recursi(item.children, value)
        }
      }
      return 
    }
  },
}
</script>

<style>
  .tree-head {
    height: 25px;
    line-height: 25px;
  }
</style>