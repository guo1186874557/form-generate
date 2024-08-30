import "virtual:uno.css";
import "@/assets/css/base.scss";
import "element-plus/es/components/message/style/css";

import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
