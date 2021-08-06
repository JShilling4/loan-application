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
        borrowerData() {
            return this.borrower.borrower;
        },
        coborrowerData() {
            return this.coborrower.coborrower;
        },
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
            this.localIdentity = this.deepClone(this.borrowerData.identity);
            this.localCoborrowerIdentity = this.deepClone(this.coborrowerData.identity);
            this.localSectionProgress = this.deepClone(this.sectionProgress);
        },

        editSectionProgress(part, config = { force: false }) {
            const { force } = config;
            if (part === 1) {
                if (this.sectionProgress.identity === null) {
                    this.localSectionProgress.identity = 1;
                    this.postSectionProgress(this.localSectionProgress);
                }
            } else if (force === true) {
                this.localSectionProgress.identity = part;
                this.postSectionProgress(this.localSectionProgress);
            } else if (
                this.sectionProgress.identity == null ||
                this.sectionProgress.identity < part
            ) {
                this.localSectionProgress.identity = part;
                this.postSectionProgress(this.localSectionProgress);
            }
        },
    },
    mounted() {
        // this.syncProfileWithStore(); // load data immediately if present in store
        Promise.all([this.updateBorrowerIdentity(), this.updateCoborrowerIdentity()]).then(() => {
            this.syncProfileWithStore(); // async load data to hydrate
            this.localDataIsLoading = false;
        });
    },
};
