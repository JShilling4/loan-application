import { mapState, mapActions } from "vuex";

export default {
	data() {
		return {
			localAssets: {},
			localCoborrowerAssets: {},
			localApplicationData: {}
		};
	},
	computed: {
		...mapState(["borrower", "coborrower", "application"]),

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
			"updateBorrowerAssets",
			"updateCoborrowerAssets",
			"updateBorrowerAbout",
			"postBorrowerAssets",
			"postCoborrowerAssets",
			"postApplicationData",
			"editNavigationSectionCount"
		]),

		syncProfileWithStore() {
			this.localAssets = JSON.parse(
				JSON.stringify({ ...this.borrowerData.assets })
			);
			this.localCoborrowerAssets = JSON.parse(
				JSON.stringify({ ...this.coborrowerData.assets })
			);
			this.localApplicationData = JSON.parse(
				JSON.stringify({ ...this.applicationData })
			);
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
		}
	},
	mounted() {
		this.syncProfileWithStore(); // load data immediately if present in store
		Promise.all([
			this.updateBorrowerAbout(),
			this.updateBorrowerAssets(),
			this.updateCoborrowerAssets()
		]).then(() => {
			this.syncProfileWithStore(); // async load data to hydrate
		});
	}
};
