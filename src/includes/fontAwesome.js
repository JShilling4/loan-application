import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheck, faAngleDown, faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import {
    faPlusCircle,
    faEdit,
    faFileTimes,
    faComment,
    faPercentage,
} from "@fortawesome/pro-light-svg-icons";
import { faDollarSign, faSearch } from "@fortawesome/pro-regular-svg-icons";

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
            faFileTimes,
            faSearch,
            faComment,
            faPercentage
        );

        app.component("font-awesome-icon", FontAwesomeIcon);
    }
}

