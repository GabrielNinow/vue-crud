import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEnvelope, faUser, faPhone, faComment } from '@fortawesome/free-solid-svg-icons';
import 'bulma/css/bulma.css';

const app = createApp(App)

library.add(faEnvelope, faUser, faPhone, faComment);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia())
app.use(router)

app.mount('#app')
