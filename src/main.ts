import { createApp } from 'vue'
import 'virtual:uno.css'
import 'normalize.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/dist/index.css'
import './styles/index.scss'
import App from './App.vue'

createApp(App)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
