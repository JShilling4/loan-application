import { mapState, mapActions } from "vuex";
import { deepClone } from "../helpers";

export default {
    mixins: [deepClone],
    data() {
        return {
            localAbout: {},
            localCoborrowerProfile: {},
            localCoborrowerAbout: {},
            localSectionProgress: {},
            localDataIsPosting: false,
        };
    },
    computed: {
        ...mapState(["borrower", "coborrower", "application", "navigation", "suffixes", "states", "appTheme"]),
        sectionProgress() {
            return this.application.sectionProgress;
        },
        coborrowerData() {
            return this.coborrower.coborrower;
        },
        coborrowerProfile() {
            return this.coborrowerData.profile;
        },
    },
    watch: {
        coborrowerProfile() {
            this.localCoborrowerProfile = this.deepClone(this.coborrowerProfile);
        },
    },
    methods: {
        ...mapActions([
            "fetchBorrowerAbout",
            "updateCoborrowerAbout",
            "postBorrowerAbout",
            "postSectionProgress",
            "postCoborrowerProfile",
            "postCoborrowerAbout",
            "editNavigationSectionCount",
        ]),

        syncProfileWithStore() {
            this.localAbout = this.deepClone(this.borrower.about);
            this.localCoborrowerProfile = this.deepClone(this.coborrowerData.profile);
            this.localCoborrowerAbout = this.deepClone(this.coborrowerData.about);
            this.localSectionProgress = this.deepClone(this.sectionProgress);
        },

        editSectionProgress(part, config = { force: false }) {
            const { force } = config;
            if (part === 1) {
                if (this.sectionProgress.about === null) {
                    this.localSectionProgress.about = 1;
                    this.postSectionProgress(this.sectionProgress);
                }
            } else if (force === true) {
                this.localSectionProgress.about = part;
                this.postSectionProgress(this.sectionProgress);
            } else if (this.sectionProgress.about !== null && this.sectionProgress.about < part) {
                this.localSectionProgress.about = part;
                this.postSectionProgress(this.sectionProgress);
            }
        },
    },
    mounted() {
        this.syncProfileWithStore(); // load data immediately if present in store
        // Promise.all([this.fetchBorrowerAbout(), this.updateCoborrowerAbout()]).then(() => {
        //     this.syncProfileWithStore(); // async load data to hydrate
        // });
    },
};
