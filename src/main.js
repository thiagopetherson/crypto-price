// Vue
import { createApp } from 'vue'
import App from './App.vue'
// Vue Router
import router from './router'
// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// Styles (Sass)
import "./assets/sass/styles.sass"

const app = createApp(App)

let baseUrl = 'https://api.coingecko.com/api/v3'
app.config.globalProperties.baseUrl = baseUrl

app.use(router)
app.use(VueAxios, axios)
app.mount('#app')
