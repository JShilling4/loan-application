import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheck, faAngleDown, faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle, faEdit, faFileTimes } from "@fortawesome/pro-light-svg-icons";
import { faDollarSign } from "@fortawesome/pro-regular-svg-icons";

export default {
    install(app) {
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

        app.component("font-awesome-icon", FontAwesomeIcon);
    }
}

