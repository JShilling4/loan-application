import { applicationApi } from "@/api";

export default {
    state: {
        sectionProgress: {},
    },

    mutations: {
        SAVE_SECTION_PROGRESS(state, payload) {
            state.sectionProgress = payload;
        },
    },

    actions: {
        fetchSectionProgress({ commit }) {
            return applicationApi.fetchSectionProgress().then((response) => {
                commit("SAVE_SECTION_PROGRESS", response.data);
            });
        },
        postSectionProgress({ commit }, payload) {
            return applicationApi.postSectionProgress(payload).then(() => {
                commit("SAVE_SECTION_PROGRESS", payload);
            });
        },
    },

    getters: {},
};
