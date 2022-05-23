import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import UserCreation from "@/views/UserCreation";
import RewardCreation from "@/views/RewardCreation";
import MyProfile from "@/views/MyProfile";
import UserProfile from "@/views/UserProfile";
import UserWallet from "@/views/UserWallet";
import RewardUP from "@/views/RewardUP";
import UserRegistration from "@/views/UserRegistration";
import SmartContractState from "@/views/SmartContractState";

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
}, {
    path: "/RewardUP",
    name: "RewardUP",
    component: RewardUP,
    props: true
}, {
    path: "/UserRegistration",
    name: "UserRegistration",
    component: UserRegistration,
    props: true
}, {
    path: "/SmartContractState",
    name: "SmartContractState",
    component: SmartContractState,
    props: true
}];

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;