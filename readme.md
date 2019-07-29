# 阿泽的后台管理系统

### 起别名

先引入<span style="color:red;">path</span>模块,然后设置`src`的别名为`@`

`__dirname` : 是 node 中的全局变量,找到当前文件的所在位置,然后拼接上 src,就可以找到 src 文件夹

```js
const path = require("path")
function resolve(dir) {
  return path.join(__dirname, dir)
}

resolve: {
      alias: {
        '@': resolve('src')
     }
}

//使用
import stickTop from '~/components/stickTop'
```

### Vuex 对表单的处理

直接使用 `<input v-model="obj.message">` 假设这里的 obj 是在计算属性中返回的一个属于 Vuex store 的对象，在用户输入时，v-model 会试图直接修改 obj.message。在严格模式中，由于这个修改不是在 mutation 函数中执行的, 这里会抛出一个错误。


用“Vuex 的思维”去解决这个问题的方法是：给 <input> 中绑定 value，然后侦听 input 或者 change 事件，在事件回调中调用 action:

```html
<input :value="message" @input="updateMessage">
```
```vuejs
computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage (e) {
    this.$store.commit('updateMessage', e.target.value)
  }
}
```
下面是 mutation 函数:
```js
// ...
mutations: {
  updateMessage (state, message) {
    state.obj.message = message
  }
}
```
