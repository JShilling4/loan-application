import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faCheck,
    faAngleDown,
    faAngleRight,
    faAngleLeft,
    faCaretDown,
    faSignOutAlt,
    faArrowRight,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
    faPlusCircle,
    faEdit,
    faFileTimes,
    faComment,
    faPercentage,
    faInfoCircle,
    faPlus,
    faCog,
    faUserCircle,
    faMoon,
    faSun,
    faPen
} from "@fortawesome/pro-light-svg-icons";
import {
    faDollarSign,
    faSearch,
    faQuestionSquare,
    faChevronRight,
    faAddressBook,
} from "@fortawesome/pro-regular-svg-icons";

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
            faInfoCircle,
            faSearch,
            faComment,
            faPercentage,
            faCaretDown,
            faQuestionSquare,
            faChevronRight,
            faAddressBook,
            faSignOutAlt,
            faArrowRight,
            faArrowLeft,
            faPlus,
            faCog,
            faUserCircle,
            faMoon,
            faSun,
            faPen
        );

        app.component("font-awesome-icon", FontAwesomeIcon);
    },
};
