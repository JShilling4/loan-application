import { mapState, mapActions } from "vuex";
import { deepClone } from "@/includes/mixins/helpers";

export default {
    mixins: [deepClone],
    data() {
        return {
            localIdentity: {},
            localCoborrowerIdentity: {},
            localSectionProgress: {},
            localDataIsLoading: true,
            localDataIsPosting: false,
        };
    },
    computed: {
        ...mapState(["borrower", "coborrower", "application", "appTheme"]),
        sectionProgress() {
            return this.application.sectionProgress;
        },
    },

    methods: {
        ...mapActions([
            "updateBorrowerIdentity",
            "updateCoborrowerIdentity",
            "postBorrowerIdentity",
            "postCoborrowerIdentity",
            "postSectionProgress",
            "editNavigationSectionCount",
        ]),

        syncProfileWithStore() {
            this.localIdentity = this.deepClone(this.borrower.identity);
            this.localCoborrowerIdentity = this.deepClone(this.coborrower.identity);
            this.localSectionProgress = this.deepClone(this.sectionProgress);
        },
    },
    mounted() {
        this.syncProfileWithStore(); // async load data to hydrate
        this.localDataIsLoading = false;
    },
};
