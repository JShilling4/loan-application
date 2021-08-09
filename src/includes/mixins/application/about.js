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
        ...mapState([
            "borrower",
            "coborrower",
            "application",
            "navigation",
            "suffixes",
            "states",
            "appTheme",
            "navigation"
        ]),
        sectionProgress() {
            return this.application.sectionProgress;
        },
        navSection() {
            return this.navigation.navigationItems.find((navItem) => navItem.id === "about");
        },
        sectionCount() {
            return this.navSection.sectionCount;
        },
        coborrowerSectionCount() {
            return this.navSection.coborrowerSections
        }
    },
    watch: {
        coborrower() {
            this.localCoborrowerProfile = this.deepClone(this.coborrower.profile);
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
            this.localCoborrowerProfile = this.deepClone(this.coborrower.profile);
            this.localCoborrowerAbout = this.deepClone(this.coborrower.about);
            this.localSectionProgress = this.deepClone(this.sectionProgress);
        },
    },
    mounted() {
        this.syncProfileWithStore(); // load data immediately if present in store
        // Promise.all([this.fetchBorrowerAbout(), this.updateCoborrowerAbout()]).then(() => {
        //     this.syncProfileWithStore(); // async load data to hydrate
        // });
    },
};
