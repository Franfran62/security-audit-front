import './assets/output.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import FlashMessage from './components/FlashMessage.vue'

const app = createApp(App)

app.use(router)
app.component('FlashMessage', FlashMessage)

app.mount('#app')
