import { mapState, mapActions } from "vuex";
import { deepClone } from "@/includes/mixins/helpers";

export default {
    mixins: [deepClone],
    data() {
        return {
            localAssets: [],
            localCoborrowerAssets: [],
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
            "updateBorrowerAssets",
            "updateCoborrowerAssets",
            "fetchBorrowerAbout",
            "postBorrowerAssets",
            "postCoborrowerAssets",
            "postSectionProgress",
            "editNavigationSectionCount",
        ]),

        syncProfileWithStore() {
            this.localAssets = this.borrower.assets;
            this.localCoborrowerAssets = this.deepClone(this.coborrower.assets);
            this.localSectionProgress = this.deepClone(this.sectionProgress);
        },

        editSectionProgress(part, config = { force: false }) {
            const { force } = config;
            if (part === 1) {
                if (this.sectionProgress.assets === null) {
                    this.localSectionProgress.assets = 1;
                    this.postSectionProgress(this.localSectionProgress);
                }
            } else if (force === true) {
                this.localSectionProgress.assets = part;
                this.postSectionProgress(this.localSectionProgress);
            } else if (this.sectionProgress.assets == null || this.sectionProgress.assets < part) {
                this.localSectionProgress.assets = part;
                this.postSectionProgress(this.sectionProgress);
            }
        },
    },
    mounted() {
        // this.syncProfileWithStore(); // load data immediately if present in store
        Promise.all([
            this.fetchBorrowerAbout(),
            this.updateBorrowerAssets(),
            this.updateCoborrowerAssets(),
        ]).then(() => {
            this.syncProfileWithStore(); // async load data to hydrate
            this.localDataIsLoading = false;
            if (this.$route.name === "assetEntryOptions") {
                if (this.borrower.assets.length > 0) {
                    this.$router.replace("/assets/add-assets");
                } else {
                    this.holdPageLoad = false;
                }
            }
        });
    },
};
