import { mapState, mapActions } from "vuex";
import { deepClone } from "@/includes/mixins/helpers";

export default {
    mixins: [deepClone],
    data() {
        return {
            localAssets: [],
            localCoborrowerAssets: [],
            localApplicationData: {},
            localDataIsLoading: true,
            localDataIsPosting: false,
        };
    },
    computed: {
        ...mapState(["borrower", "coborrower", "application", "appTheme"]),

        applicationData() {
            return this.application.application;
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
            "updateBorrowerAssets",
            "updateCoborrowerAssets",
            "updateBorrowerAbout",
            "postBorrowerAssets",
            "postCoborrowerAssets",
            "postApplicationData",
            "editNavigationSectionCount",
        ]),

        syncProfileWithStore() {
            this.localAssets = this.deepClone(this.borrowerData.assets);
            this.localCoborrowerAssets = this.deepClone(this.coborrowerData.assets);
            this.localApplicationData = this.deepClone(this.applicationData);
        },

        editSectionProgress(part, config = { force: false }) {
            const { force } = config;
            if (part === 1) {
                if (this.applicationData.progress.assets === null) {
                    this.localApplicationData.progress.assets = 1;
                    this.postApplicationData(this.localApplicationData);
                }
            } else if (force === true) {
                this.localApplicationData.progress.assets = part;
                this.postApplicationData(this.localApplicationData);
            } else if (
                this.applicationData.progress.assets == null ||
                this.applicationData.progress.assets < part
            ) {
                this.localApplicationData.progress.assets = part;
                this.postApplicationData(this.localApplicationData);
            }
        },
    },
    mounted() {
        // this.syncProfileWithStore(); // load data immediately if present in store
        Promise.all([
            this.updateBorrowerAbout(),
            this.updateBorrowerAssets(),
            this.updateCoborrowerAssets(),
        ]).then(() => {
            this.syncProfileWithStore(); // async load data to hydrate
            this.localDataIsLoading = false;
            if (this.$route.name === "assetEntryOptions") {
                if (this.localAssets.length > 0) {
                    this.$router.replace("/assets/add-assets");
                } else {
                    this.holdPageLoad = false;
                }
            }
        });
    },
};
