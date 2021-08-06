import { mapState, mapActions } from "vuex";
import { deepClone } from "@/includes/mixins/helpers";

export default {
    mixins: [deepClone],
    data() {
        return {
            localProfile: {},
            localSectionProgress: {},
            localDataIsPosting: false,
        };
    },
    computed: {
        ...mapState(["suffixes", "states", "borrower", "application", "appTheme"]),
        borrowerData() {
            return this.borrower.borrower;
        },
        sectionProgress() {
            return this.application.sectionProgress;
        },
        borrowerProfile() {
            return this.borrowerData.profile;
        },
    },
    watch: {
        borrowerProfile() {
            this.localProfile = this.deepClone(this.borrowerProfile);
        },
        sectionProgress: {
            handler() {
                this.localSectionProgress = this.deepClone(this.sectionProgress);
            },
            deep: true,
        },
    },
    methods: {
        ...mapActions([
            "fetchBorrowerProfile",
            "fetchSectionProgress",
            "postBorrowerProfile",
            "postSectionProgress",
        ]),
        syncProfileWithStore() {
            this.localProfile = this.deepClone(this.borrowerData.profile);
            this.localSectionProgress = this.deepClone(this.sectionProgress);
        },
    },
    mounted() {
        this.syncProfileWithStore(); // load data immediately if present in store
        // Promise.all([this.fetchSectionProgress(), this.fetchBorrowerProfile()]).then(() => {
        //     this.syncProfileWithStore(); // async load data to hydrate
        // });
    },
};
