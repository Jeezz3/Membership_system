import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import "./assets/main.css"
import 'primeicons/primeicons.css'


const app = createApp(App)
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',          // CSS class prefix
            cssLayer: false
        }
    }
})
app.mount('#app')