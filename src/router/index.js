import Vue from "vue";
import VueRouter from "vue-router";

import Layout from "@/layout"; //布局页

Vue.use(VueRouter);

// 通用页面, 这里的配置不需要权限
export const constRouter = [{
    path: "/login",
    component: () =>
        import("@/views/login/Login"),
    hidden: true, //导航菜单忽略选项
},
{
    path: "/register",
    name: "register",
    component: () =>
        import("@/views/register/register"),
    hidden: true, //导航菜单忽略选项
},
{
    path: "",
    component: Layout, //应用布局页
    redirect: "/index",
    hidden: true,
},
{
    path: "/index",
    component: Layout, //应用布局页
    name: "index",
    meta: {
        title: "首页", //导航菜单项标题
        icon: "el-icon-s-home", //导航菜单图标
    },
    children: [{
        path: "",
        component: () =>
            import("@/views/index/index.vue"),
        name: "indexs",
        meta: {
            title: "主页",
            icon: "el-icon-s-home",
            roles: ["admin", "jerry"],
        },
    },],
},
{
    path: "/news",
    component: Layout,
    name: "news",
    meta: {
        title: "时事热点",
        icon: "el-icon-s-help",
    },
    children: [{
        path: "",
        component: () =>
            import("@/views/news/news.vue"),
        name: "news",
        meta: {
            title: "时事热点",
            icon: "el-icon-s-data",
            roles: ["admin", "jerry"],
        },
    },],
},
];


// 动态路由 communication
export const asyncRoutes = [{
    path: "/coupon",
    component: Layout,
    redirect: "/coupon/addCoupon",
    meta: {
        title: "疫情管理",
        icon: "el-icon-s-marketing",
        hidden: false,
    },
    children: [{
        path: "addCoupon",
        component: () =>
            import("@/views/coupon/AddCoupon.vue"),
        name: "addCoupon",
        meta: {
            title: "疫情类别管理",
            icon: "el-icon-tickets",
            hidden: false,
            roles: ["admin", "jerry"],
        },
    },
    {
        path: "couponlist",
        component: () =>
            import("@/views/coupon/CouponList.vue"),
        name: "couponlist",
        meta: {
            title: "疫情信息列表",
            icon: "el-icon-tickets",
            hidden: false,
            roles: ["admin", "jerry"],
        },
    },
    ],
},


{
    path: "/marketing",
    component: Layout,
    meta: {
        title: "用户管理",
        icon: "el-icon-s-help",
        hidden: false,
    },
    children: [{
        path: "marketing",
        component: () =>
            import("@/views/marketing/Spike.vue"),
        name: "",
        meta: {
            title: "用户列表",
            icon: "el-icon-message",
            hidden: false,
            roles: ["admin", "jerry"],
        },
    },],
},


];

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes: constRouter,
});

export default router;