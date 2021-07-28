import { createStore } from "vuex";
import application from "./modules/application";
import borrower from "./modules/borrower";
import coborrower from "./modules/coborrower";
import navigation from "./modules/navigation";

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        application,
        borrower,
        coborrower,
        navigation,
    },
});
