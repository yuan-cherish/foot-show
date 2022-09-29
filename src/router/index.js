import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../components/Home.vue"
// import Foot from "../components/Foot.vue"
import FootCsv from "../components/footCsv.vue"
import FootTime from "../components/footTime.vue"
import MuscleShow from "../components/muscleShow.vue"
import MuscleCsv from "../components/muscleCsv.vue"
import SpinalShow from "../components/spinalShow.vue"
import SpinalCsv from "../components/spinalCsv.vue"
import Login from "../components/Login.vue"
import Register from "../components/Register.vue"
import AdminLogin from "../components/admin/loginAdmin.vue"
import AdminHome from "../components/admin/adminHome.vue"
import Users from "../components/admin/Users.vue"
import Foot from "../components/admin/Foot.vue"
import Medium from "../components/ljw/medium.vue"
import Medium2 from "../components/ljw/medium2.vue"
import Medium3 from "../components/ljw/medium3.vue"
import Medium4 from "../components/ljw/medium4.vue"
import dtest from "../components/3dtest.vue"

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login},
  { path: '/register', component: Register},
  { path: '/Home', component: Home, redirect:'/footCsv',
  children: [
    { path: '/footCsv',  component: FootCsv},
    { path: '/footTime',  component: FootTime },
    { path: '/spinalShow',  component: SpinalShow },
    { path: '/spinalCsv',  component: SpinalCsv },
    { path: '/muscleShow',  component: MuscleShow },
    { path: '/muscleCsv',  component: MuscleCsv },
    { path: '/dtest', component: dtest}
  ]
  },
  { path: '/admin', component: AdminLogin},
  { path: '/adminHome', component: AdminHome, redirect: '/users',
  children: [
    { path: '/users', component: Users},
    { path: '/foot', component: Foot}
  ]

  },
  { path: '/medium', component: Medium },
  { path: '/medium2', component: Medium2 },
  { path: '/medium3', component: Medium3 },
  { path: '/medium4', component: Medium4 },
  // { path: '/foot', component: Foot },
]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   if (to.path === '/register') return next()
//   if (to.path === '/admin') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })
export default router
