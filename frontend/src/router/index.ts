import { createRouter,Router,createWebHistory,RouteRecordRaw } from "vue-router"
const routes:RouteRecordRaw[]=[{
    path:'/',
    redirect:'/shouye'
},{
    path:'/shouye',
    component:()=>import('@/components/shouye/shouye.vue')
},{
    path:'/introduction',
    component:()=>import('@/components/introduction.vue')
},{
    path:'/quanlan',
    component:()=>import('@/components/quanlan/quanlan.vue')
},{
    path:'/quanlan/shijing',
    component:()=>import('@/components/quanlan/shijing.vue')
},{
    path:'/quanlan/guangyun',
    component:()=>import('@/components/quanlan/guangyun.vue')
},{
    path:'/quanlan/zhongyuan',
    component:()=>import('@/components/quanlan/zhongyuan.vue')
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
},{
    path:'/test',
    component:()=>import('@/components/test.vue')
}]
const router:Router = createRouter({
    history: createWebHistory(),
    routes: routes
})
export default router