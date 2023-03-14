import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/components/Layout.vue";
import Login from "@/views/login/index.vue";
import Rukusearch from "@/views/bookstore/rukusearch.vue";
import Booktype from "@/views/book/booktype.vue";
import Bookinfo from "@/views/book/bookinfo.vue";
import Kucunsearch from "@/views/bookstore/kucunsearch.vue";
import User from "@/views/user/user.vue";
import Chukusearch from "@/views/bookstore/chukusearch.vue";
import Home from "@/views/home/index.vue";

Vue.use(VueRouter)



const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path:'/',
    name:"layout",
    redirect:'/home',
    component:Layout,
    children:[
      {
        path:'/home',
        name:'主页',
        component:Home
      },
      {
        path:'/booktype',
        component:Booktype,
        name:'图书类别管理',
        meta:{title:'图书类别管理'}
      },
      {
        path:'/bookinfo',
        component:Bookinfo,
        name:'图书信息管理',
        meta:{title:'图书信息管理'}
      },
      {
        path:'/kucunsearch',
        component:Kucunsearch,
        meta:{title:'库存查询'}
      },
      {
        path:'/chukusearch',
        component:Chukusearch,
        meta:{title:'出库查询'}
      },
      {
        path:'/rukusearch',
        component:Rukusearch,
        meta:{title:'入库查询'}
      },
      {
        path:'/user',
        component:User,
        meta:{title:'用户管理'}
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
