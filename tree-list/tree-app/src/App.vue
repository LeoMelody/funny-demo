<template>
  <div id="app">
    <div class="head-btn">
      <button @click="addRoot">添加</button>
      <button @click="deleteNode">删除</button>
    </div>
    <div class="root">
      <div v-if="tree.treeName"  @mouseenter="showChoose($event, tree.treeName)" @mouseleave="hideChoose">
        <input type="checkbox" id="checkb" v-model="tree.value" @change="recursiTree">
        <label for="checkb">{{tree.treeName}}</label>
        <div :style="`padding-left: 100px; display: inline-block;`" v-show="showFloat">
          <button @click="addChildren">添加</button>
        </div>
      </div>
    </div>
    <div v-for="treeC in tree.children" :key="treeC.treeName">
      <my-tree :tree="treeC"/>
    </div>

  </div>
</template>

<script>
import MyTree from './components/Tree'
export default {
  name: 'app',
  data() {
    return {
      tree: {
        treeName: '',
        value: false,
        level: 0,
        children: []
      },
      showFloat: false
    }
  },
  components: {
    MyTree
  },
  methods: {
    addRoot() {
      if (this.tree.treeName) {
        alert('您已经有根结点了')
        return 
      }
      this.tree.treeName = 'Root'
    },
    deleteNode() {},
    showChoose() {
      this.showFloat = true
    },
    hideChoose() {
      this.showFloat = false
    },
    addChildren() {
      this.tree.children.push({
        treeName: '',
        value: false,
        tmpName: '',
        level: this.tree.level+1,
        father: this.tree,
        children: []
      })
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.root {
  height: 42px;
  line-height: 42px;
}

button {
  margin: 0 20px;
}

.float-area {
  position: absolute;
}
</style>
