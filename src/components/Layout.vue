<template>
<div class="layout">
  <div class="header1">
<Header></Header>
  </div>
  <div class="navbar">
<Navbar></Navbar>
  </div>
  <div class="main">
<Main></Main>
  </div>
</div>
</template>

<script>
import testApi from '../api/test'
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";
import Main from "@/components/Main.vue";
export default {
  name: "Layout",
  components: {Main, Navbar, Header},
  created() {
    //this.fetchData()
  },
  data() {
    return {
      data:[]
    }
  },
  methods:{
    fetchData(){
      testApi.getList().then(resp => {
        this.data = resp.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.header1{
  position: absolute;
  line-height: 50px;
  top:0px;
  left:0px;
  right:0px;
  height: 50px;
  background-color: #130505;
}
.navbar{
  position: absolute;
  width:200px;
  left:0px;
  top:50px;
  bottom: 0px;
  background-color: #545c64;
  overflow-y: auto;
}
.main{
  position: absolute;
  /* background-color: #1e2020; */
  left:200px;
  right: 0px;
  bottom: 0px;
  top:50px;
  padding: 5px;
  overflow-y: auto;
}
</style>
