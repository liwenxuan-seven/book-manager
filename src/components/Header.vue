<template>
  <div class="header">
    <a href="/" style="padding-left:30px">
      <img src="@/assets/logo.png" alt="" />
      <span class="title">桃木图书信息管理系统</span>
    </a>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        您好，{{ this.user.name }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="a"
        >修改密码</el-dropdown-item
        >
        <el-dropdown-item icon="el-icon-switch-button" command="b"
        >退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { logout } from "@/api/login.js";
export default {
  data() {
    return {
      user: {
        name: "",
      },
    };
  },
  created() {
    const res = localStorage.getItem('maho-manager-name')
    this.user.name = JSON.parse(res).name
  },
  methods: {
    handleCommand: function (command) {
      switch (command) {
        case "a":
          this.$message("修改了密码");
          break;
        case "b":
          const token = localStorage.getItem("ym-manager-token");
          logout(token).then((response) => {
            const resp = response.data;
            console.log(resp)
            if (resp.flag) {
              localStorage.removeItem("maho-manager-token");
              localStorage.removeItem("maho-manager-name");
              this.$router.push("/login");
            } else {
              this.$message({
                message: "退出失败",
                method: "error",
                duration: 1000,
              });
            }
          });
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scope>
img {
  height: 50px;
  width: 50px;
}
.title {
  position: absolute;
  color: #fff;
  padding-left: 5px;
  font-size: 20px;
}
.el-dropdown {
  float: right;
  margin-right: 35px;
}
</style>
