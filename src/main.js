import './assets/styles/reset.css';
import './assets/styles/common.scss';
import './assets/styles/font.scss';
import './assets/styles/swiper-custom.scss';


import { createApp } from 'vue';
import App from './App.vue';
import router from './router';


createApp(App)
    .use(router)
    .mount('#app');
