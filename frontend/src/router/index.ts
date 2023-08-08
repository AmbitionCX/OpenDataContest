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
    path:'/yunbu',
    component:()=>import('@/components/yunbu/yunbu.vue')
},{
    path:'/yunbu2',
    component:()=>import('@/components/yunbu/yunbu2.vue')
},{
    path:'/yunbu3',
    component:()=>import('@/components/yunbu/yunbu3.vue')
},{
    path:'/yunbu/guangyun/:index',
    name: 'YunbuGuangyun',
    component:()=>import('@/components/yunbu/guangyun.vue'),
    props: true
},{
    path:'/yunbu/zhongyuan/:index',
    name: 'YunbuZhongyuan',
    component:()=>import('@/components/yunbu/zhongyuan.vue'),
    props: true
},{
    path:'/yunbu/shijing/:index',
    name: 'YunbuShijing',
    component:()=>import('@/components/yunbu/shijing.vue'),
    props: true
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
},{
    path:'/cloud',
    component:()=>import('@/components/cloud.vue')
}]
const router:Router = createRouter({
    history: createWebHistory(),
    routes: routes
})
export default router