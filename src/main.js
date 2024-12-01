import './assets/main.css';
import 'vue-select/dist/vue-select.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vSelect from 'vue-select'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('v-select', vSelect)
app.mount('#app')
