import { mapState, mapActions } from "vuex";
import { deepClone } from "@/includes/mixins/helpers";

export default {
    mixins: [deepClone],
	data() {
		return {
            localIncome: {},
            localCoborrowerIncome: {},
            localApplicationData: {},
            localDataIsLoading: true,
            localDataIsPosting: false,
        };
	},
	computed: {
		...mapState(["borrower", "coborrower", "application", "states"]),

		applicationData() {
			return this.application.application;
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
			"updateBorrowerIncome",
			"updateCoborrowerIncome",
			"updateBorrowerAbout",
			"postBorrowerIncome",
			"postCoborrowerIncome",
			"postApplicationData",
			"editNavigationSectionCount"
		]),
		syncProfileWithStore() {
			this.localIncome = this.deepClone(this.borrowerData.income);
			this.localCoborrowerIncome = this.deepClone(this.coborrowerData.income);
			this.localApplicationData = this.deepClone(this.applicationData);
		},

		editSectionProgress(part, config = { force: false }) {
			const { force } = config;
			if (part === 1) {
				if (this.applicationData.progress.income === null) {
					this.localApplicationData.progress.income = 1;
					this.postApplicationData(this.localApplicationData);
				}
			} else if (force === true) {
				this.localApplicationData.progress.income = part;
				this.postApplicationData(this.localApplicationData);
			} else if (
				this.applicationData.progress.income !== null &&
				this.applicationData.progress.income < part
			) {
				this.localApplicationData.progress.income = part;
				this.postApplicationData(this.localApplicationData);
			}
		}
	},
	mounted() {
		// this.syncProfileWithStore(); // load data immediately if present in store
		Promise.all([
			this.updateBorrowerAbout(),
			this.updateBorrowerIncome(),
			this.updateCoborrowerIncome()
		]).then(() => {
			this.syncProfileWithStore(); // async load data to hydrate
            this.localDataIsLoading = false;
		});
	}
};
