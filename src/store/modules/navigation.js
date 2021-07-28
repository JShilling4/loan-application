export default {
	state: {
		navigationItems: [
			{
				id: "profile",
				label: "Profile",
				destinationUrl: "/profile",
				sectionCount: 3,
				status: "active"
			},
			{
				id: "about",
				label: "About",
				sectionCount: 11,
				destinationUrl: "/about/referral",
				status: ""
			},
			{
				id: "property",
				label: "Property",
				sectionCount: 8,
				destinationUrl: "/property/loan-type",
				status: ""
			},
			{
				id: "income",
				label: "Income",
				sectionCount: 3,
				destinationUrl: "/income/income-history",
				status: ""
			},
			{
				id: "assets",
				label: "Assets",
				sectionCount: 2,
				destinationUrl: "/assets",
				status: ""
			},
			{
				id: "identity",
				label: "Identity",
				sectionCount: 3,
				destinationUrl: "/identity/declarations",
				status: ""
			},
			{
				id: "review",
				label: "Review",
				sectionCount: 3,
				destinationUrl: "/review",
				status: ""
			}
		]
	},

	mutations: {
		SAVE_SECTION_COUNT(state, payload) {
			const { section, count } = payload;
			state.navigationItems.find(
				navItem => navItem.id == section
			).sectionCount = count;
		}
	},

	actions: {
		editNavigationSectionCount({ commit }, payload) {
			commit("SAVE_SECTION_COUNT", payload);
		}
	},

	getters: {}
};
