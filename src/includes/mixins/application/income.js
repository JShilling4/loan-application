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
        ...mapState(["borrower", "coborrower", "application", "states"]),

        sectionProgress() {
            return this.application.sectionProgress;
        },
        borrowerData() {
            return this.borrower.borrower;
        },
        coborrowerData() {
            return this.coborrower.coborrower;
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
            this.localIncome = this.deepClone(this.borrowerData.income);
            this.localCoborrowerIncome = this.deepClone(this.coborrowerData.income);
            this.localSectionProgress = this.deepClone(this.sectionProgress);
        },

        editSectionProgress(part, config = { force: false }) {
            const { force } = config;
            if (part === 1) {
                if (this.sectionProgress.income === null) {
                    this.localSectionProgress.income = 1;
                    this.postSectionProgress(this.localSectionProgress);
                }
            } else if (force === true) {
                this.localSectionProgress.income = part;
                this.postSectionProgress(this.localSectionProgress);
            } else if (this.sectionProgress.income !== null && this.sectionProgress.income < part) {
                this.localSectionProgress.income = part;
                this.postSectionProgress(this.localSectionProgress);
            }
        },
    },
    mounted() {
        // this.syncProfileWithStore(); // load data immediately if present in store
        Promise.all([
            this.fetchBorrowerAbout(),
            this.updateBorrowerIncome(),
            this.updateCoborrowerIncome(),
        ]).then(() => {
            this.syncProfileWithStore(); // async load data to hydrate
            this.localDataIsLoading = false;
        });
    },
};
