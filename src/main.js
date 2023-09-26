import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import '../public/index.css'

axios.defaults.baseURL ='http://localhost:3001'

createApp(App).use(Toast).use(store).use(router).mount('#app')
