import Vue from "vue";
import Router from "vue-router";
import GetWords from "@/views/GetWords.vue";
import NewWord from "@/views/NewWord.vue";
import ShowWord from "@/views/ShowWord.vue";
import EditWord from "@/views/EditWord.vue";
import TestWord from "@/views/TestWord.vue";
import AboutMe from "@/views/AboutMe.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterUser from "@/views/RegisterUser.vue";

Vue.use(Router);

/* eslint-disable */
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            redirect: '/words'
        },
        {
            path: '/words',
            name: 'words',
            component: GetWords
        },
        {
            path: '/words/new',
            name: 'new-word',
            meta: {
                requiresAuth: true,
            },
            component: NewWord
        },
        {
            path: '/words/:id',
            name: 'show',
            component: ShowWord
        },
        {
            path: '/words/:id/edit',
            name: 'edit',
            meta: {
                requiresAuth: true,
            },
            component: EditWord
        },
        {
            path: '/test',
            name: 'test',
            meta: {
                requiresAuth: true,
            },
            component: TestWord
        },
        {
            path: '/me',
            name: 'me',
            component: AboutMe
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterUser
        },
    ]
});