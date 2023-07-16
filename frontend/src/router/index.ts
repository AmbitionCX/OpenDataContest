import { createRouter,Router,createWebHistory,RouteRecordRaw } from "vue-router"
const routes:RouteRecordRaw[]=[{
    path:'/',
    redirect:'/introduction'
},{
    path:'/introduction',
    component:()=>import('@/components/introduction.vue')
},{
    path:'/research',
    component:()=>import('@/components/research.vue')
},{
    path:'/show',
    component:()=>import('@/components/show.vue')
},{
    path:'/transition',
    component:()=>import('@/components/transition.vue')
}]
const router:Router = createRouter({
    history: createWebHistory(),
    routes: routes
})
export default router