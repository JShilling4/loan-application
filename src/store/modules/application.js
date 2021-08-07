import { applicationApi } from "@/api";

export default {
    state: {
        sectionProgress: {},
    },

    mutations: {
        SAVE_SECTION_PROGRESS(state, payload) {
            state.sectionProgress = { ...state.sectionProgress, ...payload };
        },
        RESET_SECTION_PROGRESS(state) {
            state.sectionProgress = {};
        }
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
