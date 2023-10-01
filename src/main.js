import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import '../public/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEnvelope} from '@fortawesome/free-regular-svg-icons'
import { faLock} from '@fortawesome/free-solid-svg-icons'
library.add(faEnvelope, faLock);




axios.defaults.baseURL ='http://localhost:3001'

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(Toast).use(store).use(router).mount('#app')
