import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

const options: PluginOptions = {};

createApp(App)
  .use(router)
  .use(vuetify)
  .use(Toast, options)
  .mount('#app')
  
