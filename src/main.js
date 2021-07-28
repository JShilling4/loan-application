import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { makeServer } from "@/api/mock/server";
import GlobalComponents from "./includes/_globals";
import FontAwesome from  "./includes/fontAwesome";
import { clickOutside } from "./includes/directives";

// Initiate mock API
// if (process.env.NODE_ENV === "development") {
makeServer();
// }

const app = createApp(App);

app.directive("click-outside", clickOutside);

app.use(store);
app.use(router);
app.use(GlobalComponents);
app.use(FontAwesome);

app.mount("#app");
