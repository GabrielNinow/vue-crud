import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEnvelope, faUser, faPhone, faComment, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import 'bulma/css/bulma.css';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen'

const app = createApp(App)

library.add(faEnvelope, faUser, faPhone, faComment, faPen, faXmarkCircle);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia())
app.use(router)

app.mount('#app')
