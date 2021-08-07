import _ from "lodash";
import HSpacer from "../components/layout/HSpacer.vue";
import VSpacer from "../components/layout/VSpacer.vue";
import AppColumn from "../components/layout/AppColumn.vue";
import Multiselect from "@vueform/multiselect";
import FontAwesome from "../includes/fontAwesome";
import VueApollo from "../includes/apollo";
import { clickOutside } from "../includes/directives";

export const globalComponents = {
    install(app) {
        // globally register any components placed in the global folder
        const baseComponents = require.context(
            "../components/global/",
            false,
            /[A-Za-z0-9-_,\s]+\.vue$/i
        );

        baseComponents.keys().forEach((fileName) => {
            const componentConfig = baseComponents(fileName);
            const componentName = _.upperFirst(
                _.camelCase(fileName.replace(/^\.\//, "").replace(/\.\w+$/, ""))
            );

            // export default
            app.component(`${componentName}`, componentConfig.default || componentConfig);
        });

        // register components globally from other any folder
        app.component("h-spacer", HSpacer);
        app.component("v-spacer", VSpacer);
        app.component("app-column", AppColumn);
        app.component("multi-select", Multiselect);
        app.use(FontAwesome);
        app.use(VueApollo);
    },
};

export const globalDirectives = {
    install(app) {
        app.directive("click-outside", clickOutside);
    }
}
