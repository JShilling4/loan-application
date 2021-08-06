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
		...mapState(["borrower", "coborrower", "application", "states"]),

		sectionProgress() {
			return this.application.sectionProgress;
		},
		borrowerData() {
			return this.borrower.borrower;
		},
		coborrowerData() {
			return this.coborrower.coborrower;
		}
	},
	methods: {
		...mapActions([
			"updateBorrowerProperty",
			"updateBorrowerAbout",
			"updateCoborrowerProperty",
			"postBorrowerProperty",
			"postBorrowerProfile",
			"postCoborrowerProfile",
			"postCoborrowerProperty",
			"postSectionProgress",
			"editNavigationSectionCount"
		]),
		syncProfileWithStore() {
			this.localProperty = this.deepClone(this.borrowerData.property);
			this.localProfile = this.deepClone(this.borrowerData.profile);
			this.localCoborrowerProfile = this.deepClone(this.coborrowerData.profile);
			this.localCoborrowerProperty = this.deepClone(this.coborrowerData.property);
			this.localSectionProgress = this.deepClone(this.sectionProgress);
		},

		editSectionProgress(part, config = { force: false }) {
			const { force } = config;
			if (part === 1) {
				if (this.sectionProgress.property === null) {
					this.localSectionProgress.property = 1;
					this.postSectionProgress(this.localSectionProgress);
				}
			} else if (force === true) {
				this.localSectionProgress.property = part;
				this.postSectionProgress(this.localSectionProgress);
			} else if (
				this.sectionProgress.property !== null &&
				this.sectionProgress.property < part
			) {
				this.localSectionProgress.property = part;
				this.postSectionProgress(this.sectionProgress);
			}
		}
	},
	mounted() {
		this.syncProfileWithStore(); // load data immediately if present in store
		Promise.all([
			this.updateBorrowerProperty(),
			this.updateBorrowerAbout(),
			this.updateCoborrowerProperty()
		]).then(() => {
			this.syncProfileWithStore(); // async load data to hydrate
			this.localDataIsLoading = false;
		});
	}
};
