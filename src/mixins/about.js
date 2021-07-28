import { mapState, mapActions } from "vuex";

export default {
	data() {
		return {
			localAbout: {},
			localCoborrowerProfile: {},
			localCoborrowerAbout: {},
			localApplicationData: {},
			localDataIsPosting: false
		};
	},
	computed: {
		...mapState([
			"borrower",
			"coborrower",
			"application",
			"navigation",
			"suffixes",
			"states"
		]),
		applicationData() {
			return this.application.application;
		},
		borrowerData() {
			return this.borrower.borrower;
		},
		coborrowerData() {
			return this.coborrower.coborrower;
		},
		coborrowerProfile() {
			return this.coborrowerData.profile;
		}
	},
	watch: {
		coborrowerProfile() {
			this.localCoborrowerProfile = JSON.parse(
				JSON.stringify({ ...this.coborrowerProfile })
			);
		}
	},
	methods: {
		...mapActions([
			"updateBorrowerAbout",
			"updateCoborrowerAbout",
			"postBorrowerAbout",
			"postApplicationData",
			"postCoborrowerProfile",
			"postCoborrowerAbout",
			"editNavigationSectionCount"
		]),

		syncProfileWithStore() {
			this.localAbout = JSON.parse(
				JSON.stringify({ ...this.borrowerData.about })
			);
			this.localCoborrowerProfile = JSON.parse(
				JSON.stringify({ ...this.coborrowerData.profile })
			);
			this.localCoborrowerAbout = JSON.parse(
				JSON.stringify({ ...this.coborrowerData.about })
			);
			this.localApplicationData = JSON.parse(
				JSON.stringify({ ...this.applicationData })
			);
		},

		editSectionProgress(part, config = { force: false }) {
			const { force } = config;
			if (part === 1) {
				if (this.applicationData.progress.about === null) {
					this.localApplicationData.progress.about = 1;
					this.postApplicationData(this.localApplicationData);
				}
			} else if (force === true) {
				this.localApplicationData.progress.about = part;
				this.postApplicationData(this.localApplicationData);
			} else if (
				this.applicationData.progress.about !== null &&
				this.applicationData.progress.about < part
			) {
				this.localApplicationData.progress.about = part;
				this.postApplicationData(this.localApplicationData);
			}
		}
	},
	mounted() {
		this.syncProfileWithStore(); // load data immediately if present in store
		Promise.all([
			this.updateBorrowerAbout(),
			this.updateCoborrowerAbout()
		]).then(() => {
			this.syncProfileWithStore(); // async load data to hydrate
		});
	}
};
