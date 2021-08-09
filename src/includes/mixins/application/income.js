import { mapState, mapActions } from "vuex";
import { deepClone } from "@/includes/mixins/helpers";

export default {
    mixins: [deepClone],
    data() {
        return {
            localIncome: {},
            localCoborrowerIncome: {},
            localSectionProgress: {},
            localDataIsLoading: true,
            localDataIsPosting: false,
        };
    },
    computed: {
        ...mapState(["borrower", "coborrower", "application", "states", "appTheme"]),

        sectionProgress() {
            return this.application.sectionProgress;
        },
    },
    methods: {
        ...mapActions([
            "updateBorrowerIncome",
            "updateCoborrowerIncome",
            "fetchBorrowerAbout",
            "postBorrowerIncome",
            "postCoborrowerIncome",
            "postSectionProgress",
            "editNavigationSectionCount",
        ]),
        syncProfileWithStore() {
            this.localIncome = this.deepClone(this.borrower.income);
            this.localCoborrowerIncome = this.deepClone(this.coborrower.income);
            this.localSectionProgress = this.deepClone(this.sectionProgress);
        },
    },
    mounted() {
        this.syncProfileWithStore(); // async load data to hydrate
        this.localDataIsLoading = false;
    },
};
