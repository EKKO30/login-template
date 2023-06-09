import { createRouter, createWebHistory } from 'vue-router'
import {useCounterStore} from "@/stores/counter";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('@/views/WelcomeView.vue'),
      children: [{
        path:'',
        name: 'welcome-login',
        component: () => import('@/components/welcome/login.vue')
      },{
        path:'/register',
        name: 'welcome-register',
        component: () => import('@/components/welcome/register.vue')
      },{
        path:'/forget',
        name: 'welcome-forget',
        component: () => import('@/components/welcome/forget.vue')
      }]
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/IndexView.vue')
    }
  ]
})

router.beforeEach((to, from, next)=>{
  const store=useCounterStore()
    if(store.auth.user !=null && to.name.startsWith("welcome-")){
      next("/index")
    }else if(store.auth.user == null && to.fullPath.startsWith("/index")){
      next("/")
    }else if(to.matched.length === 0){
      next("index")
    }else {
      next()
    }
})


export default router
