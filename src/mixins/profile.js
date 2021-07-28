import { mapState, mapActions } from "vuex";

export default {
	data() {
		return {
			localProfile: {},
			localApplicationData: {},
			localDataIsPosting: false
		};
	},
	computed: {
		...mapState(["suffixes", "states", "borrower", "application"]),
		borrowerData() {
			return this.borrower.borrower;
		},
		applicationData() {
			return this.application.application;
		},
		borrowerProfile() {
			return this.borrowerData.profile;
		}
	},
	watch: {
		borrowerProfile() {
			this.localProfile = JSON.parse(
				JSON.stringify({ ...this.borrowerProfile })
			);
		},
		applicationData: {
			handler() {
				this.localApplicationData = JSON.parse(
					JSON.stringify({ ...this.localApplicationData })
				);
			},
			deep: true
		}
	},
	methods: {
		...mapActions([
			"postBorrowerProfile",
			"postApplicationData",
			"updateApplication"
		]),
		syncProfileWithStore() {
			this.localProfile = JSON.parse(
				JSON.stringify({ ...this.borrowerData.profile })
			);
			this.localApplicationData = JSON.parse(
				JSON.stringify({ ...this.applicationData })
			);
		}
	},
	mounted() {
		this.syncProfileWithStore(); // load data immediately if present in store
		this.updateApplication().then(() => {
			this.syncProfileWithStore(); // async load data to hydrate
		});
	}
};
