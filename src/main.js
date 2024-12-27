import { createPinia } from 'pinia';

import { createApp } from 'vue';
import { LoadingPlugin } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import App from './App.vue';
import './assets/main.css';
import router from './router';
import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as allComponent from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import Datepicker from 'vuejs3-datepicker';
import "./assets/fonts/index";
const vuetify = createVuetify({
    components: {
        ...allComponent,
        ...labsComponents
    },
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
})
const app = createApp(App)
app.use(vuetify)
app.use(createPinia());
app.use(router)
app.use(LoadingPlugin);
app.use(Vue3Toastify, {
    autoClose: 3000,
});
app.component('Datepicker', Datepicker)
app.component('v-select-secondary', vSelect)
app.mount('#app')
