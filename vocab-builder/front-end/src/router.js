import Vue from "vue";
import Router from "vue-router";
import GetWords from "./views/GetWords.vue";
import NewWord from "./views/NewWord.vue";
import ShowWord from "./views/ShowWord.vue";
import EditWord from "./views/EditWord.vue";
import TestWord from "./views/TestWord.vue";

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
            component: EditWord
        },
        {
            path: '/test',
            name: 'test',
            component: TestWord
        }
    ]
});