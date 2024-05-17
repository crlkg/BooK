import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Books from '../views/Books.vue'; 
import Search from '../views/Search.vue';
import Login from '../views/Login.vue'; 

const routes = [
    {
        path: '/',
        name: 'AppHome',
        component: Home
    },
    {
        path: '/books',
        name: 'Books',
        component: Books
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
