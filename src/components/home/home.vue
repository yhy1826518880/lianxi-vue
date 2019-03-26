<template>
  <!-- <div>home------</div> -->
  <el-container class="container">
    <el-aside class="aside" width="200px">
     
    </el-aside>
    <el-container>
      <el-header class="header">
           <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
              <img src="../../assets/logo.png" alt="">
          </div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light">
              <h3>电商后台管理系统</h3>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple">
              <a href="#" class="loginout">退出</a>
          </div>
        </el-col>
      </el-row>
      </el-header>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style>
.container {
  height: 100%;
}
.aside {
  background-color: #b3c0d1;
}
.header {
  background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
  height: 100%;
}
/* 头部样式调整 */
.bg-purple-light {
    text-align: center;
}
.loginout {
    text-decoration: none;
    line-height: 60px;
}
</style>
