 ## Vue-项目-重点

### day-07-重点

#### 01-项目-准备-项目目录说明

1. src/
2. eslinttrc.js ESLint 配置文件
3. config/ 服务器配置文件
4. build/ webpack 相关文件

#### 02-项目-准备-代码规范-自定义指令-lintfix

1. package.json 中的 scripts 作用: 简化指令
   > "dev":"webpack-dev-server --inline --progress --config build/webpack.dev.conf.js --open", 在 cmd 中 npm run dev
2. eslint 会检查 js 代码规范
   > "lintfix":"eslint --ext .js,.vue src --fix",
   > npm run lintfix

#### 03-项目-准备-element-ui-文档分析

    >   element-ui 是饿了么团队开发的 适用 vue 的 PC 端项目的开发

#### 04-项目-准备-element-ui-安装-引入

1. npm i element-ui -S
2. 在 main.js 中

- import ElementUI from 'element-ui'
- import 'element-ui/lib/theme-chalk/index.css'
- Vue.use(ElementUI)

#### 05-项目-准备-项目模板简化-调整

> 将模板中无用文件/文件夹 删除

#### 06-项目-准备-git 版本控制

> github (git/svn)
> git init
> git status
> git add .
> git commit -m '注释'
> 新建远程仓库
> 关联仓库
> git push

#### 07-项目-登录-新建分支-login 组件-配置路由

1. git branch
2. git checkout -b dev-login
3. 新建 login.vue 组件
4. 配置路由 index.js 导入 login.vue 配置
   > @指的是 src 下 '@/components/login/login.vue'

#### 08-项目-登录-引入表单组件

1. 找到 element-ui 的表单组件
2. 提供 formdata
3. h3
4. <el-button></el-button>

#### 09-项目-登录-样式调整

> height:100% #app{height:100%}
> main.js 不要忘记引入 css/index.css 重置层

#### 10-项目-登录-axios 插件

> 把不是 vue 插件的 axios 库 改成了 vue 插件

1. 新建 http.js
2. import axios from 'axios'
3. const MyHttpServer = {}
4. 增加 install 属性

```js
 MyHttpServer.install = (Vue)=>{
  <!-- 插件功能 -->
  Vue.prototype.$http = axios
}
```

5. 导出 export default MyHttpServer
6. 在 main.js Vue.use(MyHttpServer)
7. 使用: this.\$http()

#### 11-项目-登录-发送登录请求

> 点击登录按钮 发送 login 请求

1. http.js 配置 baseUrl
2. login.vue js this.\$http.post()

#### 12-项目-登录-引入提示框组件

> this.\$message.success(msg)

#### 13-项目-登录-登录成功-进入 home 组件

1. 新建 home.vue
2. 配置路由 path:'/'
3. 编程式导航 this.\$router.push({name:'12-项目-登录-引入提示框组件'})

#### 14-项目-登录-简化登录请求代码-async 和 await

> 目的: 在异步操作的外面获取到异步操作里面的结果

1. 给异步操作有结果的位置前面 加 await 通过用变量接收异步操作结果 res
2. 在举例异步操作最近的函数前面加 async

#### 15-项目-登录-保存 token 值

> 如果用户没登录 就无法进入到 home 组件

1. login.vue handleLogin(){登录成功->保存 token 值}
2. const token = localStorage.setItem('token',data.token)

#### 16-项目-首页-布局容器-使用-样式调整

> 使用 element-ui 里面的布局容器
> 自定义了一些样式

#### 17-项目-首页-头部-样式调整

> layout 布局

1. el-row 行
2. el-col 列

#### 18-项目-首页-侧边栏-导航组件-文档

> el-menu

1. router 值 布尔类型
   > 作用: 如果为 true 点击导航时, path 的值就是 index 的值
2. unique-opened false 是否只保持一个子菜单的展开

#### 19-项目-首页-侧边栏-引入导航组件-调整

> 每个导航的 index 要不同
> 图标 i class="element-ui 中的图标类名"

#### 20-项目-首页-进入首页的权限验证

> 如果用户没登录 就无法进入 home 组件

1. beforeCreate(){}
2. 获取 token
3. if 不存在 -> 登录组件
   > 测试: 手动删除 token

#### 21-项目-首页-头部-退出功能

```js
 handleloginout(){
      // 1. 提示
      this.$message.success('退出成功')
      // 2. 清除
      localStorage.clear()
      // 3. 回到login组件
      this.$router.push({name:'login'})
    }
```

#### 22-项目-首页-合并分支-新建用户分支

1. git branch
2. git checkout master
3. git merge dev-login(合并分支)
4. git push
5. git checkout -b dev-users

#### 23-项目-用户管理-用户列表-新建组件-路由配置

1. home.vue el-menu 开启导航的路由模式
2. home.vue main <router-view>
3. 新建 users.vue
4. 路由配置 home 组件的配置中写 children:[path:'/users']

### day-08-重点

#### 01-项目-用户管理-用户列表-面包屑和搜索框

1. el-card 小容器
2. 面包屑 el-breadcrumb
3. el-row>el-col > 搜索框 el-input+添加用户的按钮 el-button
4. 给 el-input 绑定数据 query

#### 02-项目-用户管理-用户列表-引入表格组件

> el-table

1. :data="网络请求返回的数据数组 list"
2. el-table-column label->表头 prop->list 中每个对象的 key 单元格的数据
3. 表格的行数 和 list 数组长度有关

#### 03-项目-用户管理-用户列表-表头处理

> type 属性值是 index 时 每行会显示索引(从 1 开始)

```html
<el-table-column type="index" label="#" width="80"> </el-table-column>
```

#### 04-项目-用户管理-用户列表-请求数据

> 除了登录之外的请求 需要设置请求头 (授权)

1. 设置请求头

```js
const AUTH_TOKEN = localStorage.getItem('token')
this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
```

2. created(){this.getUserList()} 发送请求
3. 处理响应
   3.1 this.userlist = res.data.data.users
   3.2 this.total = res.data.data.total
4. 在表格视图中 通过 prop 绑定单元格要显示的数据

#### 05-项目-用户管理-用户列表-渲染数据-一般数据

1. el-table 绑定数据 userlist
2. js data 中 提供了 userlist
3. methods getUserList(){获取了用户列表数据 this.userlist = res.data.data.users}
4. prop="users 中的 key 名"
   > 一般数据: 单元格显示的数据是文本(字符串)

#### 06-项目-用户管理-用户列表-渲染数据-日期格式处理

1. main.js 定义过滤器
2. 处理日期
   2.1 prop="create_time | fmtdate" 不行!
   2.2 在<el-table-column></el-table-column>内部写{{create_time | fmtdate}} 不行!
3. 如果 el-table-column 单元格内部数据不是字符串 需要提供容器 template
   3.1 <el-table-column><template>{{create_time | fmtdate}}</tempalte></el-table-column>不行!
4. 在 template 通过 slot-scope 进行传值
   4.1 slot-scope 会自动找外层数据 "scope"就相当于 el-table 所绑定的数据 userlist
   4.2 scope.row 指的是 userlist 每个对象
   4.3 最终写法

```html
<el-table-column label="创建日期">
  <!--
    如果单元格的内容不是字符串/文本 需要给要展示的内容外层包裹一个tempalte
  -->
  <!-- slot-scope 传值 userlist是外层容器绑定的数据 -->
  <template slot-scope="scope">
    <!-- {{create_time | fmtdate}} -->
    <!-- userlist中的每个对象中的create_time -->
    {{scope.row.create_time |fmtdate}}
  </template>
</el-table-column>
```

#### 07-项目-用户管理-用户列表-渲染数据-用户状态开关

> el-switch 开关组件

1. 单元格里面不是文本内容 提供容器 template
2. slot-scope="scope"
3. 开关组件 v-model="scope.row.mg_state"

```html
<el-table-column label="用户状态">
  <template slot-scope="scope">
    <el-switch
      v-model="scope.row.mg_state"
      active-color="#13ce66"
      inactive-color="#ff4949"
    >
    </el-switch>
  </template>
</el-table-column>
```

#### 08-项目-用户管理-用户列表-渲染数据-操作

> 操作中显示三个按钮

1. 提供容器 template slot-scope="scope"
2. el-button plain size="mini" circle

#### 09-项目-用户管理-用户列表-分页组件-文档-引入

1. @size-change 每个条数修改触发
2. @current-change 页码改变时 就出发
3. total 总数
4. currentPage 当前页码
5. page-sizes=[] 每个显示的条数数组 2 4 6 8

> 引入分页组件 配置分页组件要用的数据

#### 10-项目-用户管理-用户列表-分页组件-配置数据

> pagenum 控制从第几页开始的数据
> pagesize 控制每页有几条
> total 一共多少条数据 24 条

```html
24条 total 每页2条 pagesize 12页 pagenum pagenum=3 pagesize=2 1.2. / 3.4 / 5.6
```

#### 11-项目-用户管理-用户列表-分页组件-分页请求

1. 改变页码 按照新页码 重新获取数据
2. 改变每页条数 按照新 pagesize 重新获取数据

> 重置 pagenum=1

```js
 // 分页相关的方法
    // 每个条数改变
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      // 重置页码pagenum
      this.pagenum = 1
      this.getUserList()
    },
    // 当前页码改变时 pagenum=1->2
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUserList()
    }
```

#### 12-项目-用户管理-用户列表-搜索用户

1. 给搜索输入框 绑定 query v-model="query"
2. 按钮搜索按钮 发送请求 pagenum=1

> 一键清除 el-input 的 clearable 属性

#### 13-项目-用户管理-用户列表-添加用户-显示对话框

1. el-dialog 对话框
2. js data dialogFormVisibleAdd:false
3. 点击添加用户的按钮 -> dialogFormVisibleAdd=true
4. 配置对话框的数据 form
   > form 的需要看接口文档添加用户时的 key 名
5. 调整对话框中 el-form-el-input 的宽度 label-width

#### 14-项目-用户管理-用户列表-添加用户-发送请求

1. 点击对话框确定按钮 - 发请求
   1.1 关闭对话框
   1.2 提示消息
   1.3 刷新视图
   1.4 清空对话框
   > this.form 清空

#### 15-项目-用户管理-用户列表-添加用户-处理响应

```js
for (const key in this.form) {
  if (this.form.hasOwnProperty(key)) {
    this.form[key] = ''
  }
}
```

#### 16-项目-用户管理-用户列表-删除用户-打开确认框

> this.\$confirm().then().catch()

1. 点击按钮 -> 打开确认框
2. 点击确认框中的确定 -> 发送删除请求 -> id
   2.1 data 中找 id
   2.2 调用方法时 传参 scope.row.id
   > 注意: async 的位置

```js
 showMegBoxDele(userId) {
      this.$confirm('是否删除用户', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 发送删除请求
          const res = await this.$http.delete(`users/${userId}`)
          console.log(res)
          // 更新视图
          //
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })

```

#### 17-项目-用户管理-用户列表-删除用户-处理响应

> 如果删除成功-> 更新视图

#### 18-项目-用户管理-用户列表-编辑用户-显示对话框

> 点击操作中的编辑按钮 -> 打开编辑对话框

1. 编辑对话框
2. 配置数据 dialogFormVisibleEdit
3. this.form 中的 mobile 和 email

### day-09-重点

#### 01-项目-用户管理-用户列表-编辑用户-显示编辑数据

1. 点击按钮 把 scope.row 传参
2. 在展示对话框的方法中 this.form = scope.row->(user)
   > 先编辑再添加 this.form={}

#### 02-项目-用户管理-用户列表-编辑用户-发送请求

1. 点击编辑对话框的确定 -> 发送请求
   > put this.form.id this.form
2. 处理响应
   2.1 提示 X
   2.2 关闭对话框
   2.3 更新视图

#### 03-项目-用户管理-用户列表-修改用户状态

1. 找到开关 v-model="scope.row.mg_state"
2. @change="发送请求"
3. put `users/${user.id}/state/${user.mg_state}`

#### 04-项目-用户管理-用户列表-分配角色-功能演示

1. 打开对话框
2. 显示当前用户的角色
3. 修改/分配/设置 角色

#### 05-项目-用户管理-用户列表-分配角色-显示对话框

1. 引入对话框 分配角色的对话框
2. 点击 check 按钮 打开对话框
3. 配置分配角色的对话框 ({{}}+el-select+option)

> 点击 check 打开对话框

#### 06-项目-用户管理-用户列表-分配角色-显示对话框-下拉框

> el-select 和 el-option 特性:
> 如果 select 的 v-model 绑定的值 和 option 的 value 值 一样 显示对应的 label 值

1. 打开对话框前 发送请求 获取所有的角色所在的数组
2. data 中 roles:[]
3. this.roles = res.data.data
4. 视图中 el-select v-model="currRoleId"
5. 视图中 el-option v-for="(item,i) in roles" :label="item.roleName" :value="item.id"
   > 显示了 6 个(1 个请选择 5 个是角色名称)

#### 07-项目-用户管理-用户列表-分配角色-显示当前用户角色

1. 打开对话框时 获取当前用户的 rid(角色 id)
2. this.currRoleId = res2.data.data.rid
   > 需要把 currRoleId 重置 为 -1!

#### 08-项目-用户管理-用户列表-分配角色-修改用户角色

1. 点击对话框中的确定 -> 发送请求
2. id 和 rid
   2.1 id -> 当前用户的 id data 中声名 currUserId -> 打开对话框时 this.currUserId = user.id
   2.2 rid ->this.currRoleId
3. 修改成功后 关闭对话框

```js
this.$http.put(`users/${this.currUserId}/role`, {
  rid: this.currRoleId
})
```

#### 09-项目-用户管理-用户列表-合并分支-推送

1. git add .
2. git commit -m "用户管理完成"
3. git checkout master
4. git merger dev-users
5. git push

#### 10-项目-权限管理-新建分支-功能演示

1. 权限管理
   1.1 角色列表
   1.2 权限列表
2. 新建分支 dev-rights

#### 10-项目-权限管理-权限列表-新建组件-路由配置

1. rights/rights.vue 权限列表组件
2. 配置路由

#### 11-项目-权限管理-权限列表-自定义面包屑组件

> 面包屑组件在多个组件都用 -> 二次封装 -> 自定义.vue 文件

1. 新建 mrBread.vue tempalte->elementui 面包屑代码
2. 设置数据 props:['level1','level2']
3. 在 main.js 导入
4. 全局注册 Vue.component(MyBread.name, MyBread)
5. 在任意组件中 tempalte 里 <my-bread level1="xxx"></my-bread>

#### 12-项目-权限管理-权限列表-获取权限列表数据

1. el-table
2. `rights/:type`

> list 列表数据 tree 树形数据
> 重新设置头部

#### 13-项目-权限管理-权限列表-axios-拦截器统一设置请求头

> 除了登录之外的请求 都需要设置头部
> axios 中的拦截器(请求拦截器-响应拦截器)
> 在请求发起之前会自动进入到请求拦截器的 callbback
> callback 执行完 会继续发起请求

```js
axios.interceptors.request.use(
  function(config) {
    // console.log(config)
    console.log(config.url)
    if (config.url !== 'login') {
      // config参数 headers头部 url标识
      const AUTH_TOKEN = localStorage.getItem('token')
      config.headers['Authorization'] = AUTH_TOKEN
    }
    // 在发送请求之前做些什么
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
```

#### 14-项目-权限管理-权限列表-表格展示

#### 15-项目-权限管理-权限列表-表格展示-层级显示

#### 16-项目-权限管理-权限列表-表格展示-固定表头

1. 固定表头-el-table 设置 height 固定高 (overflow:hidden)
2. 显示 level template -> span v-if="scope.row.level==='0'"

#### 17-项目-权限管理-角色列表-新建组件-配置路由

1. role.vue
2. path:'/role'

#### 18-项目-权限管理-角色列表-面包屑和添加按钮

> 自定义面包屑+添加按钮

#### 19-项目-权限管理-角色列表-获取角色列表数据

> 之前设置过头部 get('roles)

#### 20-项目-权限管理-角色列表-表格展示

> 将 user.vue 中的表格复制 修改

1. roleName
2. roleDesc
3. 操作

#### 21-项目-权限管理-角色列表-表格展示-展开行功能分析

1. el-table 支持展开 type="expand"
2. 效果 行列问题 -> v-for>v-for el-tag
3. 布局划分
   4
   4.1 最外层一行 el-col
   4.2 该行中有两列 el-colA el-colB
   4.3 第二个列 el-colB 中有一行 el-colC
   4.4 在 el-colC 中有两列 el-colC1 el-colC2

#### 22-项目-权限管理-角色列表-表格展示-展开行-一级权限

> 关键点 看懂数据结构

1. 某个角色的 children 是该角色有哪些一级权限
2. 一级权限中的 children 二级权限
3. 二级权限中的 children 三级权限

> v-for

### day-10-重点

#### 01-项目-权限管理-角色列表-表格展示-展开行-二级权限

> 在一级权限的 children 是二级权限

1. v-for 遍历 第二列中的第一行 输出的该行中第一列的 el-tag

#### 02-项目-权限管理-角色列表-表格展示-展开行-三级权限

> v-for 遍历最里层的 el-tag el-tag v-for

#### 03-项目-权限管理-角色列表-表格展示-展开行-样式调整

1. el-tag closeable X
2. el-tag 同级 i 图标
3. el-tag 颜色区分 type="warning"

#### 04-项目-权限管理-角色列表-表格展示-展开行-处理无权限的展示

> 如果最外层 children 长度是 0 显示无权限

```html
<el-row v-if="scope.row.children.length===0"> <span>未分配权限</span> </el-row>
```

#### 05-项目-权限管理-角色列表-表格展示-展开行-取消权限

1. el-tag @close="deleRight(角色 id->scope.row.id,权限 id->item1.id)"
2. methods deleRight(roleId,rightId) 发送 delete 请求
3. 删除成功 -> 更新视图
   > 删除成功 返回响应 res.data.data 指的是当前角色的剩余权限

#### 06-项目-权限管理-角色列表-表格展示-展开行-取消权限-优化

> 删除/取消权限成功 -> 刷新整个表格 -> 没必要

1. deleRight(scope.row,item.id)
2. roleId - > role.id
3. role.children = res.data.data
   > 去掉 this.getRoleList()

#### 07-项目-权限管理-角色列表-表格展示-修改权限-显示对话框

> 点击操作中的 check 按钮 传入了 scope.row -> role -> 打开对话框

#### 08-项目-权限管理-角色列表-表格展示-修改权限-树形结构-文档分析

        data->绑定的数据数组
        show-checkbox -> 选择方块
        node-key->每个节点的唯一标识
        default-expanded-keys->[要展开的节点的id值]
        default-checked-keys->[选中的节点id值]
        props="配置选项{label:绑定数据data中的数据key名,children:绑定数据data中的数据key名}"

> 每个节点状态 1 未选择 2 半选 全选

#### 09-项目-权限管理-角色列表-表格展示-修改权限-树形结构-配置数据

> 打开对话框->获取树形结构的权限数据

```html
<el-tree :data="treelist" show-checkbox node-key="id" :props="defaultProps">
</el-tree>
```

```js
 // 树形结构的权限数据
      treelist: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
```

#### 10-项目-权限管理-角色列表-表格展示-修改权限-树形结构-展开所有项

> default-expanded-all
> 可以自己实现该功能 for 嵌套

#### 11-项目-权限管理-角色列表-表格展示-修改权限-树形结构-显示角色拥有的权限

> :default-checked-keys="arrcheck"

```js
role.children.forEach(item1 => {
  // arrtemp.push(item1.id)
  item1.children.forEach(item2 => {
    // arrtemp.push(item2.id)
    item2.children.forEach(item3 => {
      arrtemp.push(item3.id)
    })
  })
})
this.arrcheck = arrtemp
```

> 只添加叶子节点(没有下一级的节点)的 id

#### 12-项目-权限管理-角色列表-表格展示-修改权限-树形结构-分配权限-功能分析

#### 13-项目-权限管理-角色列表-表格展示-修改权限-树形结构-分配权限-实现

1. 点击对话框的确定 -> setRoleRight()
2. 获取当前角色的 id currRoleId
3. 获取全选和半选的节点 id 数组
   3.1 getCheckedKeys()
   3.2 getHalfCheckedKeys()
   > 给 el-tree 设置了 ref 属性值 tree
   > 在 this.\$refs.tree.方法名()
4. let arr = [...arr1,...arr2]
5. this.\$http.post(`roles/${this.currRoleId}/rights`,{rids:arr.join(',')})
6. 关闭对话框+更新视图

```js
// 获取半选节点id的数组  getHalfCheckedKeys
let arr2 = this.$refs.tree.getHalfCheckedKeys()
// console.log(arr2)

// 获取全选节点id的数组 getCheckedKeys
let arr1 = this.$refs.tree.getCheckedKeys()
// console.log(arr1)

// ES6 展开操作运算符
let arr = [...arr1, ...arr2]
// console.log(arr)

const res = await this.$http.post(`roles/${this.currRoleId}/rights`, {
  rids: arr.join(',')
})
console.log(res)
this.dialogFormVisibleRight = false
this.getRolelist()
```

#### 14-项目-首页-侧边栏-动态导航

> home.vue 侧边栏 写死 -> 动态生成菜单
> get('menus')
> index 的值是字符串 item1.order 和 item2.path
> :index="''+item1.order"
> 之后写路由配置时 path 不能随便写

#### 15-项目-效果演示-不同角色用户登录-显示对应权限

1. 添加新用户 -> 给该用户设置角色
2. 给该角色分配/设置 的权限
3. 登录 -> 侧边栏动态显示

#### 16-项目-不同角色用户登录-显示对应权限-导航守卫

> 在 home 组件中 home 出现之前 在 beforeCreated 中判断 token
> 路由中给我们提供了 路由守卫 router.beforeEach((to,from,next)=>{})

```js
router.beforeEach((to, from, next) => {
  console.log(to, from)
  // 如果要去的是login next()
  if (to.path === '/login') {
    next()
  } else {
    // 如果去的不是login
    // 判断token token存在next()
    const token = localStorage.getItem('token')
    if (!token) {
      // this.$router -> router
      // 回到登录
      // this.$message.warning('asdasd')
      Message.warning('请先登录')
      router.push({
        name: 'login'
      })
      return
    }
    next()
  }
})
```

#### 17-项目-权限管理-合并分支-推送-新建分支

1. git add .
2. git commit -m
3. git checkout master
4. git merge dev-rights
5. git status
6. git push

#### 18-项目-商品管理-功能演示

1. 商品列表中的添加商品
2. 分类参数中
   2.1 请选择商品分类
   2.2 动态参数 表格中 el-tag 的动态编辑
3. 商品分类中表格里面的树形结构

### day-11-重点

#### 01-项目-商品管理-商品列表-准备组件

1. goods/goodslist.vue
2. 配置路由 path:'/goods'

#### 02-项目-商品管理-添加商品-新建组件配置路由

1. goods/goodsadd.vue
2. 配置路由 path:'/goodsadd'
3. 找到 goodslist.vue 中的添加商品按钮 @click="编程式导航"

#### 03-项目-商品管理-添加商品-步骤条

1. 自定义面包屑
2. 消息提示 el-alert
3. 步骤条 el-steps
   3.1 :active="2" 控制当前是第几步

#### 04-项目-商品管理-添加商品-tabs 标签

1. 引入 el-tabs left
2. 给每个能点击的 tab 设置 name 属性值 比如 name="1"
3. el-tabs->v-model 绑定='active'
4. el-steps 步骤条 :active="1\*active"
   > 注意 类型匹配

#### 05-项目-商品管理-添加商品-基本信息-表单绑定数据

1. 最外层 el-form :model="form"
2. form 数据{}来源于添加商品的接口文档
3. 第一个 el-tabs 标签中 - 基本信息中的一般表单元素
   > 注意 el-form 自动出现滚动条 overflow:auto

#### 06-项目-商品管理-添加商品-基本信息-级联选择器-文档-引入

```html
<!--
  级联选择器
      options->数据源list
      v-model->[label对应的value值]
      @change->选项发生改变 就会触发
      props->配置选项 {label:来源于list数组中label值对应的key名,value,children}
-->
<el-cascader
  expand-trigger="hover"
  :options="options"
  v-model="selectedOptions"
  @change="handleChange"
></el-cascader>
```

#### 07-项目-商品管理-添加商品-基本信息-级联选择器-获取分类数据

> selectedOptions:[] 接收三级分类的数据

```js
[
  {
    cat_deleted: false
    cat_id: 1 自己的唯一标识
    cat_level: 0 当前分类的层级
    cat_name: "大家电" 分类的名称
    cat_pid: 0 上一级分类的id
    children: Array(4) 下一级分类的数据[]
  }
]

```

#### 08-项目-商品管理-添加商品-基本信息-级联选择器-配置数据

> 给级联选择器配置属性

1. options -> 网络请求 -> get('categories?type=3') -> res.data.data
2. v-model="selectedOptions"
3. props="defaultProps" 配置 key 名
4. @change="handlechange()"

```html
<el-form-item label="商品分类">
  <el-cascader
    expand-trigger="hover"
    :options="options"
    :props="defaultProps"
    v-model="selectedOptions"
    @change="handleChange"
  ></el-cascader>
</el-form-item>
```

```js
 async getGoodsCateList(){
    const res = await this.$http.get(`categories?type=3`)
    console.log(res)
    this.options = res.data.data

  }
```

#### 09-项目-商品管理-添加商品-商品参数-获取动态参数数据

1. 点击第二个 tab 同时 要选择三级分类
   > 如果满足上述条件 就可以获取该三级分类的动态参数
   > sel=only 或者 many
   > 三级分类的 id 值 在级联选择器 v-model="selectOption"

#### 10-项目-商品管理-添加商品-商品参数-复选框组-文档-引入

> 复选框组

1. v-for el-form-item :label="item1.attr_name"
2. v-for el-checkbox :label="item2"
   > this.arrDyparams.attr_vals 字符串 -> 数组类型 trim().split(',')

```html
<el-form-item
  :label="item1.attr_name"
  v-for="(item1,i) in arrDyparams"
  :key="i"
>
  <el-checkbox-group v-model="checkList">
    <el-checkbox
      v-for="(item2,i) in item1.attr_vals"
      :key="i"
      :label="item2"
    ></el-checkbox>
  </el-checkbox-group>
</el-form-item>
```

#### 11-项目-商品管理-添加商品-商品参数-调整样式-默认全选中

1. border
2. el-checkbox-group v-model="item1.attr_vals"

#### 12-项目-商品管理-添加商品-商品属性-获取静态参数数据

1. 点击第三个 tab 同时 this.selectOption.length===3
   > 满足上述条件 发送请求 i 获取静态参数

#### 13-项目-商品管理-添加商品-商品参数-布局

1. v-for="(item,i) in arrStaticparams"
2. :label="item.attr_name"
3. el-input v-model ="item.attr_vals"

#### 14-项目-商品管理-添加商品-图片上传-文档-引入

1. el-upload
   1.1 action="url 全路径地址"
   1.2 header="{头部信息}"
   1.3 :on-success="handleSuccess()"
   1.4 :on-preview="hanldPreview(file)"
   1.5 :on-remove="handleRemove()"

#### 15-项目-商品管理-添加商品-图片上传-配置属性

1. :on-remove="handleRemove(file)"
   > file.response.data.tmp_path
2. :on_success="handleSuccess(file)"
   > file.data.tmp_path

> 此时 tmp_path 还没有使用

#### 16-项目-商品管理-添加商品-商品内容-富文本编辑器

1. Vue-Quill-Editor vue 插件 富文本编辑器
2. 局部引入

```js
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
```

3.局部注册 通过组件选项 components: {quillEditor}

> .ql-editor min-height:300px

#### 17-项目-商品管理-添加商品-表单数据分析

1. 发送 post 请求之前 需要 this.form 中的某些处理进行单独处理
   1.1 pics:[{pic:临时路径}]
   1.2 goods_cat 分类参数
   1.3 attrs 动态和静态参数值

#### 18-项目-商品管理-添加商品-表单数据处理-分类和图片

1.                  this.form.goods_cat = this.selectedOptions.join(",")
2.  this.form.pics
    2.1 form 声明 pics:[]
    2.2 在移除和上传图片时 获取图片的 tmp_path
    2.3 移除 找当前移除图片的 index this.form.pics.splice(index,1)
    2.4 上传 this.form.pics.push({pic:file.data.tmp_path})

```js
  handleRemove(file, fileList) {
            console.log(file, fileList)
            // file形参中有该图片的信息 ,比如临时路径tmp_path
            // file.response.data.tmp_path
              // 从this.form.pics数组中移除该图
              // 三个图片 A B C
              // X-> B
              // this.form.pics
              // findIndex 能遍历并且 返回符合条件的元素的索引

              let Index = this.form.pics.findIndex((item)=>{
                  return item.pic === file.response.data.tmp_path
              })

              console.log(Index)
              this.form.pics.splice(Index,1)
              console.log(this.form.pics)
        }
        handleSuccess(file) {
            console.log(file)
            // file.data.tmp_path
            this.form.pics.push({
              pic:file.data.tmp_path
            })
        },

```

### day-12-重点

#### 01-项目-商品管理-添加商品-表单数据处理-attr_vals

> 在添加商品请求发送之前 处理 this.form.attr_vals

1. attr_vals:[{attr_id:?,attr_value:?}]
2. map 方法遍历了 this.arrdyparams 和 this.arrstaticparmas
3. this.form.attrs = [...arr1,...arr2]
4. this.\$http.post()
5. 添加成功, 回到商品列表页

#### 02-项目-商品管理-添加商品-发送请求-回到商品列表页

#### 03-项目-商品管理-分类参数-新建组件-路由配置

1. goods/cateparams.vue
2. 路由配置 path:'/params'

#### 04-项目-商品管理-分类参数-动态参数-布局-配置级联选择器

1. 把 goodsadd.vue 中的级联选择器 粘贴过来 修改
2. clearable 和仅显示最后一级:show-all-levels="false"

#### 05-项目-商品管理-分类参数-动态参数-获取动态参数数据

> 在级联选择器选项发生改变时 同时是三级分类 -> 获取动态参数数据

#### 06-项目-商品管理-分类参数-动态参数-表格渲染

1. 快速布局-带展开行的表格
2. 表格:data="arrDyparams" 属性名称 prop="attr_name"

#### 07-项目-商品管理-分类参数-动态参数-动态编辑 tag-文档-引入

> tag 动态编辑
> el-tag v-for 动态参数数组中每个对象里 attr_vals 数组的长度

#### 08-项目-商品管理-分类参数-动态参数-动态编辑 tag-配置-完成

1. 配置了动态编辑 tag 的数据和方法
2. v-for scope.row.attr_vals
   > attr_vals 需要先转化为数组

```js
  handleClose(attr_vals, tag) {
      attr_vals.splice(attr_vals.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

  handleInputConfirm(attr_vals) {
      let inputValue = this.inputValue;
      if (inputValue) {
        attr_vals.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
```

#### 09-项目-商品管理-分类参数-动态参数-发送请求

1. 删除 - 更新视图 + 发送请求
   > delete categories/:id/attributes/:attrid
2. 添加 - 更新视图 + 发送请求
   > post categories/:id/attributes

#### 10-项目-商品管理-分类参数-静态参数-布局-获取数据

1. 点击第二个 tab 同时 this.selectoption.length===3
2. 发送请求获取静态参数的数据

#### 11-项目-商品管理-商品分类-准备组件-路由配置

1. goods/googscate.vue 组件
2. 路由配置 path:'/categories'

#### 12-项目-商品管理-商品分类-element-tree-grid-文档-引入

> https://www.npmjs.com/package/element-tree-grid

1. 把 el-table 组件中的单元格 扩展 -> 树形结构的单元格
2. npm i 包名
3. 导入 require import
4. 注册 (全局注册 + 局部注册)

#### 13-项目-商品管理-商品分类-element-tree-grid-配置

1. treekey = "cat_id"
2. parentKey="cat_pid"
3. levelKey="cat_level"
4. children="children"
   > 如果当前是第一级分类 cat_level 和 cat_pid 都是 0

```html
<el-tree-grid
  prop="cat_name"
  label="分类名称"
  treeKey="cat_id"
  parentKey="cat_pid"
  levelKey="cat_level"
  childKey="children"
></el-tree-grid>
```

#### 14-项目-商品管理-商品分类-添加分类-打开对话框

1. 点击添加分类按钮 打开对话框
2. 添加分类的对话框 已经准备好
   > 级联选择器的数据 还没有请求

#### 15-项目-商品管理-商品分类-添加分类-获取数据

> 打开对话框时 获取二级分类的数据 type=2

#### 16-项目-商品管理-商品分类-添加分类-发送请求

1. 确定按钮 @click="发送请求"
2. data->form:{cat_level,cat_pid,cat_name}

```js
if (this.selectedOptions.length === 0) {
  this.form.cat_level = 0

  this.form.cat_pid = 0
} else if (this.selectedOptions.length === 1) {
  this.form.cat_level = 1

  this.form.cat_pid = this.selectedOptions[0]
} else if (this.selectedOptions.length === 2) {
  this.form.cat_level = 2

  this.form.cat_pid = this.selectedOptions[1]
}
```

3. this.\$http.post(``,this.form)
4. 清空表单+更新视图+关闭对话框

#### 17-项目-合并分支-推送分支-新建分支

> dev-goods 商品管理分支
> 动态编辑 tag -> 删除 tag - >1.7.5 categories/:id/attributes/:attrId
> 1.7.3.接口 删除参数
> 合并分支 推送了代码

#### 18-项目-订单管理-订单列表-准备组件-路由配置

1. order/order.vue
   > 级联选择器的数据 还没有获取
2. 配置路由 path:"/orders"

#### 19-项目-订单管理-订单列表-省市区引入

1. 省市区数据 接口没有 .js 文件
2. import 引入 + this.catlist = catlist
   > wow.js iscroll.js zepto.js swiprer.js
   > vue-插件 比如 vue-swiper

#### 21-项目-数据统计-数据报表-Echarts-文档-引入

1. 图表 -> echarts 百度
2. npm install echarts --save
3. 提供容器 div (宽高)
4. js 实例化 echarts
5. option
6. myecharts.setOption(option)

#### 22-项目-数据统计-数据报表-Echarts-配置

1. 请求数据 'reports/type/1' -> option1
2. 来源于文档的 option2
3. let option = {...option1,...option2}
4. 使用 option

### day-13-重点

#### 01-项目-补充-加载动画
v-loading="bool"
bool如果为true  加载中
bool如果为false 加载动画停止

#### 02-项目-补充-nextTick
> 在data数据变化时 不能获取dom元素的最新内容
> this.$nextTick(()=>{获取dom元素最新值})

#### 03-项目-优化-拦截器统一处理响应
> 所有status不等于200和201的请求 都会有提示框
> 在http.js中通过响应拦截器统一处理上面的请求
```js
 axios.interceptors.response.use(function(response) {
        console.log('---------');
        console.log(response);
        let {
            meta: {
                msg,
                status
            }
        } = response.data
        if (status !== 200 && status !== 201) {
            Message.warning(msg)
        }
        // 对响应数据做点什么
        return response;
    }, function(error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });
```


#### 04-项目-优化-路由懒加载
> https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97
>  把router/index.js中的导入组件代码改写
```js
const Login = () =>
    import ('@/components/login/login.vue')
```
#### 05-项目-优化-cdn-配置
1. index.html link的href和script的src cdn引入第三方包
>去官网找  boot cdn网站
2. 在main.js和router/index.js 把Element-UI和Router-> ELEMENT和VueRouter
3. 在main.js中 不需要写 elementui的样式文件引入
4. webpack.base.config.js
```js

 // 配置cdn
    // 来源于package.json中的包名 : 该包暴露在全局内的变量名
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT',
        'axios': 'axios',
        'echarts': 'echarts',
        'moment': 'moment'
    },
```
> 结果 , cdn加载的包 的代码不会在打包文件中 文件小 -> 加载快

#### 06-项目-打包
1. 来到项目目录 npm run build
2. 在dist>(index.html+static>(js+css))
2.1 js文件夹里面
  app.xxxx.js  自己写js文件
  序号0.xxxx.js  每个组件自己的js代码
  vender.xxxx.js  第三方的js代码
3. 把dist中的文件放在上线服务器的根目录

#### 07-基础-组件通信-父子组件通信-子传父

> 把子组件的数据传递给父组件

1. 子组件中 合适的位置 this.$emit(自定义事件名xxx,要传的值num)
2. 在父组件中使用子组件 注册自定义事件@xxx="methods里面的方法fn2"
3. 在父组件methods中fn2方法的形参位置可以获取的传过来的值num

```js
// 子组件       this.$emit("xxx", this.num);
// 父组件  <child-a @xxx="fn2"></child-a>
// 父组件methods
	fn2(argv) {
      console.log(argv);
      // this.count = argv;
      console.log("fn2被触发---");
    }


```



#### 08-基础-组件通信-兄弟组件通信

> 公共的vm vm.$on绑定事件 和 vm.$emit触发事件

1. 新建eventbus.js 导出vm对象

2. 在a组件中

   1. 导入eventbus.js
   2. vm.$emit('xxx',值a)

3. b组件

   1. 导入eventbus.js
   2. vm.$on('xxx',(argv)=>{值a})



#### 09-基础-vuex-状态管理流程

1. state 写数据声明

2. actions 写ajax获取数据

3. mutations 修改数据

#### 10-基础-vuex-使用场景
> 数据复杂的项目 vuex
1. vue 状态(数据)管理 vuex
2. react 状态管理 redux
> vuex redux -> flux
> vuex把数据的流向 交给了不同的对象

#### 11-基础-vuex-state和mapState
1. npm i vuex
2. main.js 导入vuex
3. main.js Vue.use(Vuex)
4. let store = new Vuex.Store({})
5. new Vue 挂载store

> state作用: 声明数据
1. 组件的计算属性 this.$store.state.count
2. state里面数据的用法是在组件中通过计算属性去使用
3. state中的数据 可以在任意组件去使用
4. state响应式的
```js
 computed: {
    fn() {
      return "abc";
    },

    ...mapState(["count"]),
    // count(){
    //   return this.$store.state.count
    // }

    ...mapState({
      countNew: "count"
    })
  }

```
#### 12-基础-vuex-getters和mapGetters
> getters 复杂的state数据
> getters中的数据 用法和state的数据一样
> ...mapGetters(['属性名'])

#### 13-基础-vuex-mutations和mapMutations
> 同步修改数据的方法
> this.$store.commit({type:'方法名'，msg：‘参数’})

#### 14-基础-vuex-mutations异步问题

#### 15-基础-vuex-actions和mapActions

#### 16-基础-vuex-总结
