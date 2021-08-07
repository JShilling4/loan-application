import { mapState } from "vuex";

export default {
    computed: {
        ...mapState(["appTheme", "suffixes", "states"]),
    },
};
