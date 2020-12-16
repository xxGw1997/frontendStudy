import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from '../vue-router/index'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
    children:[
      {
        path:'a',
        component:{
          render() {
            return <h1>about a</h1>
          },
        }
      },
      {
        path:'b',
        component:{
          render() {
            return <h1>about b</h1>
          },
        }
      }
    ]
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.matcher.addRoutes([
  {
    path:'/xxx',
    name:'xxx',
    component:{}
  }
])
export default router
