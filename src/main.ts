import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.less'
import registerIcons from './global/registerIcons'
// import ElementPlus from 'element-plus'  全局注册
// import 'element-plus/dist/index.css'

import router from './router/index'
import pinia from './store'

const app = createApp(App)
app.use(pinia)
app.use(router) //pinia与router的注册顺序很重要，动态添加路由要在pinia注册之后，因为刷新时数据要从本地存储中获取并重新存储到 store 再动态添加
app.use(registerIcons)
// app.use(ElementPlus)
app.mount('#app')
