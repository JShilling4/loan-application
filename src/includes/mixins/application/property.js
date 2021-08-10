import { mapState, mapActions } from "vuex";
import { deepClone } from "../helpers";

export default {
    mixins: [deepClone],
	data() {
		return {
            localDataIsLoading: true,
            localDataIsPosting: false,
            localProperty: {},
            localProfile: {},
            localCoborrowerProfile: {},
            localCoborrowerProperty: {},
            localSectionProgress: {},
        };
	},
	computed: {
		...mapState(["borrower", "coborrower", "application", "states", "appTheme"]),

		sectionProgress() {
			return this.application.sectionProgress;
		},
	},
	methods: {
		...mapActions([
			"updateBorrowerProperty",
			"fetchBorrowerAbout",
			"updateCoborrowerProperty",
			"postBorrowerProperty",
			"postBorrowerProfile",
			"postCoborrowerProfile",
			"postCoborrowerProperty",
			"postSectionProgress",
			"editNavigationSectionCount"
		]),
		syncProfileWithStore() {
			this.localProperty = this.deepClone(this.borrower.property);
			this.localProfile = this.deepClone(this.borrower.profile);
			this.localCoborrowerProfile = this.deepClone(this.coborrower.profile);
			this.localCoborrowerProperty = this.deepClone(this.coborrower.property);
			this.localSectionProgress = this.deepClone(this.sectionProgress);
		},
	},
	mounted() {
		this.syncProfileWithStore(); // load data immediately if present in store
        this.localDataIsLoading = false;
	}
};
