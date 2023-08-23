import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$globalUrl = "http://localhost:5000";
// app.config.globalProperties.$globalUrl = "http://101.34.62.108:5000";

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.mount('#app')