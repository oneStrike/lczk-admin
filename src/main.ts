import App from './App.vue'
import routes from './routes'
import store from './store'
import 'normalize.css'
import '@/assets/styles/index.scss'
import directives from '@/directives'

createApp(App).use(routes).use(store).use(directives).mount('#app')
