import { createApp } from 'vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import './style.css'
import App from './App.vue'
const app = createApp(App);

const toastOption = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  timeout: 5000,
  showCloseButtonOnHover: true,
}

app.use(Toast, toastOption);

app.mount('#app')
