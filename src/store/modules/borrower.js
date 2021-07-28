import api from "@/api";

export default {
	state: {
		borrower: {
			profile: {},
			about: {},
			property: {},
			income: {},
			assets: {},
			declarations: {
				citizenshipStatus: null,
				propertyIsPrimary: null,
				hasOwnershipInterest: null,
				typeOfPropertyOwned: null,
				timeHoldingTitle: null,
				relationshipWithSeller: null,
				hasUndisclosedBorrowedMoney: null,
				hasUndisclosedMortgageApplication: null,
				hasUndisclosedCredit: null,
				hasPriorityLien: null,
				isUndisclosedCosigner: null,
				hasOutstandingJudgments: null,
				isDelinquentOnFederalDebt: null,
				hasLawsuitWithFinancialResponsibility: null,
				conveyedTitle: null,
				hadPreforeclosureOrShortSale: null,
				hasOwnedForeclosedProperty: null,
				hasDeclaredBankruptcy: null,
				bankruptcyTypesFiled: null
			},
			demographics: {
				willProvideInformation: null,
				gender: null,
				ethnicity: null,
				race: null
			}
		}
	},

	mutations: {
		SAVE_BORROWER_PROFILE(state, payload) {
			state.borrower.profile = { ...state.borrower.profile, ...payload };
		},

		SAVE_BORROWER_ABOUT(state, payload) {
			state.borrower.about = { ...state.borrower.about, ...payload };
		},

		SAVE_BORROWER_PROPERTY(state, payload) {
			state.borrower.property = {
				...state.borrower.property,
				...payload
			};
		},

		SAVE_BORROWER_INCOME(state, payload) {
			state.borrower.income = {
				...state.borrower.income,
				...payload
			};
		},

		SAVE_BORROWER_ASSETS(state, payload) {
			state.borrower.assets = {
				...state.borrower.assets,
				...payload
			};
		}
	},

	actions: {
		// PROFILE
		updateBorrowerProfile({ commit }) {
			return api.profile.fetchBorrowerProfile().then(response => {
				commit("SAVE_BORROWER_PROFILE", response.data);
			});
		},

		postBorrowerProfile({ commit }, payload) {
			return api.profile.postBorrowerProfile(payload).then(response => {
				commit("SAVE_BORROWER_PROFILE", response.data);
			});
		},

		// ABOUT
		updateBorrowerAbout({ commit }) {
			return api.about.fetchBorrowerAbout().then(response => {
				commit("SAVE_BORROWER_ABOUT", response.data);
			});
		},

		postBorrowerAbout({ commit }, payload) {
			return api.about.postBorrowerAbout(payload).then(response => {
				commit("SAVE_BORROWER_ABOUT", response.data);
			});
		},

		// PROPERTY
		updateBorrowerProperty({ commit }) {
			return api.property.fetchBorrowerProperty().then(response => {
				commit("SAVE_BORROWER_PROPERTY", response.data);
			});
		},

		postBorrowerProperty({ commit }, payload) {
			return api.property.postBorrowerProperty(payload).then(response => {
				commit("SAVE_BORROWER_PROPERTY", response.data);
			});
		},

		// INCOME
		updateBorrowerIncome({ commit }) {
			return api.income.fetchBorrowerIncome().then(response => {
				commit("SAVE_BORROWER_INCOME", response.data);
			});
		},

		postBorrowerIncome({ commit }, payload) {
			return api.income.postBorrowerIncome(payload).then(response => {
				commit("SAVE_BORROWER_INCOME", response.data);
			});
		},

		// INCOME
		updateBorrowerAssets({ commit }) {
			return api.assets.fetchBorrowerAssets().then(response => {
				commit("SAVE_BORROWER_ASSETS", response.data);
			});
		},

		postBorrowerAssets({ commit }, payload) {
			return api.assets.postBorrowerAssets(payload).then(response => {
				commit("SAVE_BORROWER_ASSETS", response.data);
			});
		}
	},

	getters: {}
};
