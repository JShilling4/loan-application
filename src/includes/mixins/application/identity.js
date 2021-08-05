import { mapState, mapActions } from "vuex";
import { deepClone } from "@/includes/mixins/helpers";

export default {
    mixins: [deepClone],
    data() {
        return {
            localIdentity: {
                demographics: {
                    isOptingOut: false,
                },
            },
            localCoborrowerIdentity: {
                demographics: {
                    isOptingOut: false,
                },
            },
            localApplicationData: {},
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
        applicationData() {
            return this.application.application;
        },
    },

    methods: {
        ...mapActions([
            "updateBorrowerIdentity",
            "updateCoborrowerIdentity",
            "postBorrowerIdentity",
            "postCoborrowerIdentity",
            "postApplicationData",
            "editNavigationSectionCount",
        ]),

        syncProfileWithStore() {
            this.localIdentity = this.deepClone(this.borrowerData.identity);
            this.localCoborrowerIdentity = this.deepClone(this.coborrowerData.identity);
            this.localApplicationData = this.deepClone(this.applicationData);
        },

        editSectionProgress(part, config = { force: false }) {
            const { force } = config;
            if (part === 1) {
                if (this.applicationData.progress.identity === null) {
                    this.localApplicationData.progress.identity = 1;
                    this.postApplicationData(this.localApplicationData);
                }
            } else if (force === true) {
                this.localApplicationData.progress.identity = part;
                this.postApplicationData(this.localApplicationData);
            } else if (
                this.applicationData.progress.identity == null ||
                this.applicationData.progress.identity < part
            ) {
                this.localApplicationData.progress.identity = part;
                this.postApplicationData(this.localApplicationData);
            }
        },
    },
    mounted() {
        // this.syncProfileWithStore(); // load data immediately if present in store
        Promise.all([
            this.updateBorrowerIdentity(),
            this.updateCoborrowerIdentity(),
        ]).then(() => {
            this.syncProfileWithStore(); // async load data to hydrate
            this.localDataIsLoading = false;
        });
    },
};
