import { createApp } from 'vue'
import 'virtual:uno.css'
import App from './App.vue'

import './style.css'

createApp(App)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
