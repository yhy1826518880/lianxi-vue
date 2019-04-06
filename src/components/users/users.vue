<template>
  <el-card class="box-card">
    <!-- 1:面包屑 -->
    <!-- 首页/用户管理/用户列表 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2. 搜索框 -->
    <el-row class="searchRow">
      <el-col :span="16">
        <el-input
          @click="loadUserList()"
          clearable
          placeholder="请输入用户名"
          v-model="query"
          class="searchInput"
        >
          <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <!-- 饿了么 （对话框组件） -->
        <el-button type="success" @click="showAddUserDia()">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 3. 表格 -->

    <!-- :data="tableData" -->
    <el-table :data="userlist" style="width: 100%">
      <!--
            create_time:'',
            email: '',
            id:'',
            mg_state: '',
            mobile: '',
            role_name: '',
            username: '' 
      -->
      <el-table-column type="index" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <!-- fmtdate  过滤器名字  使用-->
      <!-- <el-table-column prop="create_time" label="创建日期"></el-table-column> -->

      <!-- <el-table-column prop="create_time | fmtdate" label="创建日期"></el-table-column> -->
      <!-- <el-table-column prop="create_time" label="创建日期">{{create_time | fmtdate}}</el-table-column> -->

      <!-- 如果单元格的内容不是字符串/文本 需要给要展示的内容外层包裹一个tempalte -->

      <el-table-column prop="create_time" label="创建日期">
        <!-- 内层标签使用外层标签的数据 -->
        <!-- slot-scope 传值 userlist是外层容器绑定的数据 -->
        <template slot-scope="userlist">
          <!-- slot-scope="scope可以自定义" -->
          <!-- {{create_time | fmtdate}} -->
          <!-- userlist中的每个对象中的create_time -->
          {{userlist.row.create_time | fmtdate}}
        </template>
      </el-table-column>

      <!-- 饿了么 开关组件 -->
      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>

      <!-- 饿了么 按钮组件 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
            <!-- 饿了么 （消息提示组件）编辑对话框 操作事件 -->
          <el-button @click="showEditUserDia()" size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>

          <el-button size="mini" plain type="danger" icon="el-icon-check" circle></el-button>
          <!-- 饿了么 （消息提示组件）删除 操作事件 -->
          <el-button @click="showMegBoxDele(scope.row.id)" size="mini" plain type="success" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 4. 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名称" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>


    <!-- 编辑用户的对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名称" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      // 提供table要渲染的数据

      // tableData: [
      //     {
      //         date: '100',
      //         username: '100',
      //         address: '100'
      //     }
      // ],

      // create_time: 1486720211
      // email: "adsfad@qq.com"
      // id: 500
      // mg_state: true
      // mobile: "12345678"
      // role_name: "主管"
      // username: "admin"

      userlist: [
        {
          create_time: "",
          email: "",
          id: "",
          mg_state: "",
          mobile: "",
          role_name: "",
          username: ""
        }
      ],
      //获取用户数据请求的参数
      pagenum: 1,
      pagesize: 2,
      total: -1,

      //对话框 - 添加对话框
      dialogFormVisibleAdd: false,

      //对话框 - 编辑对话框
      dialogFormVisibleEdit: false,
      //用户表单数据
      // username	用户名称	不能为空
      // password	用户密码	不能为空
      // email	邮箱	可以为空
      // mobile	手机号	可以为空
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {

    //  编辑对话框  （表格） - 打开消息提示框（事件）
    showEditUserDia() {
        this.dialogFormVisibleEdit = true
    },
    //  删除  （表格） - 打开消息提示框（事件）
    showMegBoxDele(userId) {
        this.$confirm("是否删除用户", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 发送删除请求
          const res = await this.$http.delete(`users/${userId}`);
          // console.log(res)

          // 更新视图
          this.getUserList();

          this.$message({
            type: "success",
            message: res.data.meta.msg
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: res.data.meta.msg
          });
        });
    },
    //添加用户  -> 发送请求
    async addUser() {
        // 2.关闭对话框(无论成功还是失败都关闭对话框)
        this.dialogFormVisibleAdd = false
        //接口文档：添加用户
        // 1.发送请求
        const res = await this.$http.post("users", this.form)
        console.log(res)
        const {meta:{status,msg},data} = res.data
        
        if (status ===201) {
            
            // 3.提示成功
            this.$message.success(msg)
            // 4. 更新视图
            this.getUserList()
            // 5. 清空input
            //this.form.username = ''
            //this.form = {}
            //for in 遍历对象取值
            for (const key in this.form) {
                if (this.form.hasOwnProperty(key)) {
                    this.form[key] = ''
                }
            }
        } else {
            this.$message.warning(msg)
        }
        
        
    },
    //添加用户 - 显示对话框
    showAddUserDia() {
        //显示对话框
        this.dialogFormVisibleAdd= true
    },
    //点击input清空x时触发的方法
    loadUserList() {
      this.getUserList();
    },
    //搜索用户
    searchUser() {
      // 1. 按照query参数发送请求
      this.pagenum = 1;
      this.getUserList();
    },
    // 分页相关的方法
    // 每个条数改变
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val;
      // 重置页码pagenum
      this.pagenum = 1;
      this.getUserList();
    },
    // 当前页码改变时 pagenum=1->2
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val;
      this.getUserList();
    },

    //获取用户列表数据
    async getUserList() {
      //接口文档：需要授权的API->设置请求头 Authorization=token ->axios文档
      //设置请求头 进行授权
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      console.log(res);

      const {
        meta: { msg, status },
        data: { total, users }
      } = res.data;
      if (status === 200) {
        //提示
        // total 和 users
        this.total = total;
        this.userlist = users;
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
    }
  }
};
</script>

<style>
.box-card {
  height: 100%;
}
.searchRow {
  margin-top: 15px;
}
.searchInput {
  width: 300px;
}
</style>
