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
            this.localCoborrowerAssets = this.coborrower.assets;
            this.localSectionProgress = this.deepClone(this.sectionProgress);
        },
    },
    mounted() {
        this.syncProfileWithStore(); // async load data to hydrate
        this.localDataIsLoading = false;
        if (this.$route.name === "assetEntryOptions") {
            if (this.borrower.assets == null) {
                this.localAssets = [];
            }
            if (this.localAssets.length > 0) {
                this.$router.replace("/assets/add-assets");
            } else {
                this.holdPageLoad = false;
            }
        }
    },
};
