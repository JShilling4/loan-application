import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { makeServer } from "@/api/mock/server";
import GlobalComponents from "./includes/_globals";
import FontAwesome from  "./includes/fontAwesome";
import { clickOutside } from "./includes/directives";
import Multiselect from "@vueform/multiselect";

// Initiate mock API
// if (process.env.NODE_ENV === "development") {
makeServer();
// }

const app = createApp(App);

// Custom Vue directives
app.directive("click-outside", clickOutside);

// Third-party global components
app.component("multi-select", Multiselect);

// Plugins
app.use(store);
app.use(router);
app.use(GlobalComponents);
app.use(FontAwesome);

app.mount("#app");
