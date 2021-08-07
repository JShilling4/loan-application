import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import { makeServer } from "@/api/mirage/server";
import { globalComponents, globalDirectives } from "./includes/_globals";
import i18n from "./includes/i18n";

// Initiate mock API
// if (process.env.NODE_ENV === "development") {
// makeServer();
// }

const app = createApp(App);

// Custom Vue directives


// Plugins
app.use(store);
app.use(router);
app.use(i18n);
app.use(globalComponents);
app.use(globalDirectives);

app.mount("#app");
