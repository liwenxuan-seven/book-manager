<template>
<div id="login-container">
  <el-form :rules="rules" ref="form" :model="form" label-width="80px" class="login-form">
    <h2 class="login-title" style="font-weight: normal">桃木信息管理系统</h2>
    <el-form-item prop="username" label="用户名">
      <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
    </el-form-item>
    <el-form-item class="button-flex">
      <el-button type="primary" @click="submitForm(form)">登录</el-button>
      <el-button>注册</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import {login,getUserInfo} from '@/api/login'
export default {
  name: "index",
  data() {
    return{
      form:{
          username: '',
          password: ''
        },
      rules:{
        username:[{required:true,message:'请输入用户名',trigger:'blur'}],
        password: [{required:true,message:'请输入密码',trigger:'blur'},
          {min:6,max:12,message: '密码长度在6-12位',trigger: ['blur','change']},
          ]
      }
    }
  },
  methods:{
   submitForm(form) {
     this.$refs.form.validate(valid => {
       //如果验证通过
       if(valid){
         login(this.form.username,this.form.password).then(response => {
           const resp = response.data
           // console.log(resp,resp.flag,resp.code)
           //el-form内置的rules验证成功
           if(resp.flag){
             //如果服务器返回结果验证成功
             getUserInfo(resp.data.token).then(response => {
               const respUser = response.data
               if(respUser.flag){

                 localStorage.setItem('maho-manager-name',JSON.stringify(respUser.data))
                 localStorage.setItem('maho-manager-token',resp.data.token)
                 this.$router.push('/')
               }
             })
           }else {
             //el-form内置的rules验证失败
             /* console.log('error')
              return false*/
             this.$message({
               message:resp.message,
               type:'warning'
             })
           }
         })
       }else {
         this.$message(
             {
               message:'error submit!',
               type: 'warning'
             }
         )
       }
     })
   },

  },


}
</script>

<style scoped>
#login-container{
  position: absolute;
  width:100%;
  height: 100%;
  background-image: url('../../assets/ddly.png');
}
.login-form{
  width:350px;
  background-color: #fff;
  /* margin:160px auto; */
  padding:15px;
  border-radius: 20px;
  height: 250px;
  left:50%;
  top:50%;
  margin-left:-175px;
  margin-top:-125px;
  position: absolute;
}
.login-title{
  text-align: center;
  color: #606266;
  margin-top: 10px;
  margin-bottom: 20px;
}
.button-flex {
  display: flex;
  justify-content: center;

}
</style>
