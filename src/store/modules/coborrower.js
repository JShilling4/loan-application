import api from "@/api";

export default {
	state: {
		coborrower: {
			profile: {},
			about: {},
			property: {},
			income: {},
			assets: {}
		}
	},

	mutations: {
		SAVE_COBORROWER_PROFILE(state, payload) {
			state.coborrower.profile = {
				...state.coborrower.profile,
				...payload
			};
		},

		SAVE_COBORROWER_ABOUT(state, payload) {
			state.coborrower.about = { ...state.coborrower.about, ...payload };
		},

		SAVE_COBORROWER_PROPERTY(state, payload) {
			state.coborrower.property = {
				...state.coborrower.property,
				...payload
			};
		},

		SAVE_COBORROWER_INCOME(state, payload) {
			state.coborrower.income = {
				...state.coborrower.income,
				...payload
			};
		},

		SAVE_COBORROWER_ASSETS(state, payload) {
			state.coborrower.assets = {
				...state.coborrower.assets,
				...payload
			};
		}
	},

	actions: {
		//* COBORROWER PROFILE
		updateCoborrowerProfile({ commit }) {
			return api.profile.fetchCoborrowerProfile().then(response => {
				commit("SAVE_COBORROWER_PROFILE", response.data);
			});
		},

		updateCoborrowerAbout({ commit }) {
			return api.about.fetchCoborrowerAbout().then(response => {
				commit("SAVE_COBORROWER_ABOUT", response.data);
			});
		},

		//* COBORROWER PROPERTY
		updateCoborrowerProperty({ commit }) {
			return api.property.fetchCoborrowerProperty().then(response => {
				commit("SAVE_COBORROWER_PROPERTY", response.data);
			});
		},

		postCoborrowerProfile({ commit }, payload) {
			return api.profile.postCoborrowerProfile(payload).then(response => {
				commit("SAVE_COBORROWER_PROFILE", response.data);
			});
		},

		//* COBORROWER ABOUT
		postCoborrowerAbout({ commit }, payload) {
			return api.about.postCoborrowerAbout(payload).then(response => {
				commit("SAVE_COBORROWER_ABOUT", response.data);
			});
		},

		postCoborrowerProperty({ commit }, payload) {
			return api.property
				.postCoborrowerProperty(payload)
				.then(response => {
					commit("SAVE_COBORROWER_PROPERTY", response.data);
				});
		},

		//* COBORROWER INCOME
		updateCoborrowerIncome({ commit }) {
			return api.income.fetchCoborrowerIncome().then(response => {
				commit("SAVE_COBORROWER_INCOME", response.data);
			});
		},

		postCoborrowerIncome({ commit }, payload) {
			return api.income.postCoborrowerIncome(payload).then(response => {
				commit("SAVE_COBORROWER_INCOME", response.data);
			});
		},

		//* COBORROWER ASSETS
		updateCoborrowerAssets({ commit }) {
			return api.assets.fetchCoborrowerAssets().then(response => {
				commit("SAVE_COBORROWER_ASSETS", response.data);
			});
		},

		postCoborrowerAssets({ commit }, payload) {
			return api.assets.postCoborrowerAssets(payload).then(response => {
				commit("SAVE_COBORROWER_ASSETS", response.data);
			});
		}
	},

	getters: {}
};
