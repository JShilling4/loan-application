import { mapState } from "vuex";
import { deepClone } from "@/includes/mixins/helpers";

export default {
    mixins: [deepClone],

    computed: {
        ...mapState(["appTheme"])
    }
}