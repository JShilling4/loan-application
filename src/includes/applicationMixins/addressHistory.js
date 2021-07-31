export default {
	data() {
		return {
			currentAddressModalShowing: false,
			previousAddressModalShowing: false,
			selectedPreviousAddress: {},
			modalAction: "Add"
		};
	},
	methods: {
		openCurrentAddressModal() {
			this.currentAddressModalShowing = true;
		},

		openPreviousAddressModal() {
			this.previousAddressModalShowing = true;
		},

		closeCurrentAddressModal() {
			this.localProperty.currentAddressInfo = {};
			this.currentAddressModalShowing = false;
		},

		closePreviousAddressModal() {
			this.selectedPreviousAddress = {};
			this.previousAddressModalShowing = false;
		}
	}
};
