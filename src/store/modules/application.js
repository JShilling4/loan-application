import { applicationApi } from "@/api";

export default {
	state: {
		application: {}
	},

	mutations: {
		SAVE_APPLICATION_DATA(state, payload) {
			state.application = payload;
		}
	},

	actions: {
		updateApplication({ commit }) {
			return applicationApi.fetchApplicationData().then((response) => {
                commit("SAVE_APPLICATION_DATA", response.data);
            });
		},
		postApplicationData({ commit }, payload) {
			return applicationApi.postApplicationData(payload).then(() => {
                commit("SAVE_APPLICATION_DATA", payload);
            });
		}
	},

	getters: {}
};
