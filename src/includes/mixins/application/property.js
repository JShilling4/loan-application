import { mapState, mapActions } from "vuex";

export default {
	data() {
		return {
			localDataIsLoading: true,
			localDataIsPosting: false,
			localProperty: {},
			localProfile: {},
			localCoborrowerProfile: {},
			localCoborrowerProperty: {},
			localApplicationData: {}
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
			"updateBorrowerProperty",
			"updateBorrowerAbout",
			"updateCoborrowerProperty",
			"postBorrowerProperty",
			"postBorrowerProfile",
			"postCoborrowerProfile",
			"postCoborrowerProperty",
			"postApplicationData",
			"editNavigationSectionCount"
		]),
		syncProfileWithStore() {
			this.localProperty = JSON.parse(
				JSON.stringify({ ...this.borrowerData.property })
			);
			this.localProfile = JSON.parse(
				JSON.stringify({ ...this.borrowerData.profile })
			);
			this.localCoborrowerProfile = JSON.parse(
				JSON.stringify({ ...this.coborrowerData.profile })
			);
			this.localCoborrowerProperty = JSON.parse(
				JSON.stringify({ ...this.coborrowerData.property })
			);
			this.localApplicationData = JSON.parse(
				JSON.stringify({ ...this.applicationData })
			);
		},

		editSectionProgress(part, config = { force: false }) {
			const { force } = config;
			if (part === 1) {
				if (this.applicationData.progress.property === null) {
					this.localApplicationData.progress.property = 1;
					this.postApplicationData(this.localApplicationData);
				}
			} else if (force === true) {
				this.localApplicationData.progress.property = part;
				this.postApplicationData(this.localApplicationData);
			} else if (
				this.applicationData.progress.property !== null &&
				this.applicationData.progress.property < part
			) {
				this.localApplicationData.progress.property = part;
				this.postApplicationData(this.localApplicationData);
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
