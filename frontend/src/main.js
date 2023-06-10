import { createApp } from 'vue';
import './assets/styles/global.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app')

