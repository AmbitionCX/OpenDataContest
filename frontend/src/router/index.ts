import { createRouter,Router,createWebHistory,RouteRecordRaw } from "vue-router"
const routes:RouteRecordRaw[]=[{
    path:'/',
    redirect:'/introduction'
},{
    path:'/introduction',
    component:()=>import('@/components/introduction.vue')
},{
    path:'/quanmao',
    component:()=>import('@/components/gailan/quanmao.vue')
},{
    path:'/fenduan',
    component:()=>import('@/components/gailan/fenduan.vue')
},{
    path:'/guangyun',
    component:()=>import('@/components/yunbu/guangyun.vue')
},{
    path:'/shijing',
    component:()=>import('@/components/yunbu/shijing.vue')
},{
    path:'/zhongyuan',
    component:()=>import('@/components/yunbu/zhongyuan.vue')
},{
    path:'/danzi',
    component:()=>import('@/components/fenxi/danzi.vue')
},{
    path:'/zhengti',
    component:()=>import('@/components/fenxi/zhengti.vue')
},{
    path:'/datasource',
    component:()=>import('@/components/datasource.vue')
}]
const router:Router = createRouter({
    history: createWebHistory(),
    routes: routes
})
export default router