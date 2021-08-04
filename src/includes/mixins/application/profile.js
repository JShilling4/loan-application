import { mapState, mapActions } from "vuex";
import { deepClone } from "@/includes/mixins/helpers";

export default {
    mixins: [deepClone],
    data() {
        return {
            localProfile: {},
            localApplicationData: {},
            localDataIsPosting: false,
        };
    },
    computed: {
        ...mapState(["suffixes", "states", "borrower", "application", "appTheme"]),
        borrowerData() {
            return this.borrower.borrower;
        },
        applicationData() {
            return this.application.application;
        },
        borrowerProfile() {
            return this.borrowerData.profile;
        },
    },
    watch: {
        borrowerProfile() {
            this.localProfile = this.deepClone(this.borrowerProfile);
        },
        applicationData: {
            handler() {
                this.localApplicationData = this.deepClone(this.applicationData);
            },
            deep: true,
        },
    },
    methods: {
        ...mapActions([
            "fetchBorrowerProfile",
            "postBorrowerProfile",
            "postApplicationData",
            "updateApplication",
        ]),
        syncProfileWithStore() {
            this.localProfile = this.deepClone(this.borrowerData.profile);
            this.localApplicationData = this.deepClone(this.applicationData);
        },
    },
    mounted() {
        this.syncProfileWithStore(); // load data immediately if present in store
        Promise.all([this.updateApplication(), this.fetchBorrowerProfile()]).then(() => {
            this.syncProfileWithStore(); // async load data to hydrate
        });
    },
};
