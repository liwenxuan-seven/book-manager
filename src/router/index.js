import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/components/Layout.vue";
import Login from "@/views/login/index.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
