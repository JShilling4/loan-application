export default {
	data() {
		return {
			propertyModalShowing: false,
			modalAction: "Add",
			selectedOtherProperty: {}
		};
	},
	methods: {
		loadPropertyModal(property = null) {
			if (property !== null) {
				this.modalAction = "Edit";

				this.selectedOtherProperty = JSON.parse(
					JSON.stringify({ ...property })
				);
				this.openPropertyModal();
			}
			if (property == null) {
				this.modalAction = "Add";
				this.openPropertyModal();
			}
		},

		openPropertyModal() {
			this.propertyModalShowing = true;
		},

		closePropertyModal() {
			this.selectedOtherProperty = {};
			this.propertyModalShowing = false;
		},
	}
};
