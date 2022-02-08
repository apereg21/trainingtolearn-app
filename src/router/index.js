import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import UserCreation from "@/views/UserCreation";
import TransactionCreation from "@/views/TransactionCreation";
import RewardCreation from "@/views/RewardCreation";
import MyProfile from "@/views/MyProfile";
import UserProfile from "@/views/UserProfile";
import UserWallet from "@/views/UserWallet";

Vue.use(VueRouter)

const routes = [{
    path: "/",
    name: "Home",
    component: Home,
    props: true
}, {
    path: "/userCreation",
    name: "UserCreation",
    component: UserCreation,
    props: true
}, {
    path: "/transacCreation",
    name: "TransactionCreation",
    component: TransactionCreation,
    props: true
}, {
    path: "/RewardCreation",
    name: "RewardCreation",
    component: RewardCreation,
    props: true
}, {
    path: "/MyProfile",
    name: "MyProfile",
    component: MyProfile,
    props: true
}, {
    path: "/UserProfile",
    name: "UserProfile",
    component: UserProfile,
    props: true
}, {
    path: "/UserWallet",
    name: "UserWallet",
    component: UserWallet,
    props: true
}];

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;