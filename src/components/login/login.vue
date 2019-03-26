<template>
  <!-- <div>登陆组件</div> -->
  <div class="login-wrap">
    <el-form label-position="top" label-width="80px" :model="formdata" class="login-form">
      <h3>用户登录</h3>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handleLogin()" type="primary" class="login-btn">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    //登录请求
        // handleLogin() {
        //   this.$http.post("login", this.formdata).then(res => {
        //     console.log(res);
        //     const {
        //       meta: { status, msg },
        //       data
        //     } = res.data;
        //     if (status === 200) {
        //       // 1. 跳转到首页home
        //       this.$router.push({name:'home'})
        //       // 2. 提示登录成功
        //       this.$message.success(msg)
        //     }else {
        //         // 3. 如果失败 -> 提示用户
        //         this.$message.error(msg)
        //     }
        //   });
        // }
          //目的: 不想在异步操作ajax .then方法的内部获取异步操作的结果
        async handleLogin() {
            const res = await this.$http.post('login', this.formdata)
            console.log(res)
            const {meta:{msg,status},data} = res.data
            if (status===200) {
                //0. 保存用户token值 //将来在home组件渲染之前，先判断token有没有
                const token = localStorage.setItem('token', data.token)
                // 1. 跳转到首页home
                this.$router.push({name:'home'})
                 // 2. 提示登录成功
                this.$message.success(msg)
            }else {
                // 3. 如果失败 -> 提示用户
                this.$message.error(msg)
            }
        }
  }
};
</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
}
.login-btn {
  width: 100%;
}
</style>
