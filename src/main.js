import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import GlobalComponents from "./includes/_globals";
import { makeServer } from "@/api/mock/server";
//* FONT AWESOME
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheck, faAngleDown, faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle, faEdit, faFileTimes } from "@fortawesome/pro-light-svg-icons";
import { faDollarSign } from "@fortawesome/pro-regular-svg-icons";
//* Custom Components
import AppLabel from "@/components/shared/AppLabel.vue";
import ViewControls from "@/components/layout/ViewControls.vue";
import vSelect from "vue-select";
import LoadingIndicator from "@/components/shared/LoadingIndicator.vue";

// Initiate mock API
// if (process.env.NODE_ENV === "development") {
makeServer();
// }

//* font awesome pro library adds
library.add(
    faCheck,
    faAngleDown,
    faAngleRight,
    faAngleLeft,
    faPlusCircle,
    faDollarSign,
    faEdit,
    faFileTimes
);

// Create Vue instance
const app = createApp(App);

//* Custom v- directives
app.directive("click-outside", {
    bind: function(el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
            // here I check that click was outside the el and his children
            if (!(el == event.target || el.contains(event.target))) {
                // and if it did, call method provided in attribute value
                vnode.context[binding.expression](event);
            }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
    },
    unbind: function(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
    },
});

app.use(store);
app.use(router);
app.use(GlobalComponents);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("app-label", AppLabel);
app.component("view-controls", ViewControls);
app.component("v-select", vSelect);
app.component("loading-indicator", LoadingIndicator);

// Mount Vue instance
app.mount("#app");
