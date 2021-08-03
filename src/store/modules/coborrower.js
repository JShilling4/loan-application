import { profileApi, aboutApi, propertyApi, incomeApi, assetsApi } from "@/api";

export default {
    state: {
        coborrower: {
            profile: {},
            about: {},
            property: {},
            income: {},
            assets: [],
        },
    },

    mutations: {
        SAVE_COBORROWER_PROFILE(state, payload) {
            state.coborrower.profile = {
                ...state.coborrower.profile,
                ...payload,
            };
        },

        SAVE_COBORROWER_ABOUT(state, payload) {
            state.coborrower.about = { ...state.coborrower.about, ...payload };
        },

        SAVE_COBORROWER_PROPERTY(state, payload) {
            state.coborrower.property = {
                ...state.coborrower.property,
                ...payload,
            };
        },

        SAVE_COBORROWER_INCOME(state, payload) {
            state.coborrower.income = {
                ...state.coborrower.income,
                ...payload,
            };
        },

        SAVE_COBORROWER_ASSETS(state, payload) {
            state.coborrower.assets = state.coborrower.assets.concat(payload);
        },
    },

    actions: {
        //* COBORROWER PROFILE
        updateCoborrowerProfile({ commit }) {
            return profileApi.fetchCoborrowerProfile().then((response) => {
                commit("SAVE_COBORROWER_PROFILE", response.data);
            });
        },

        updateCoborrowerAbout({ commit }) {
            return aboutApi.fetchCoborrowerAbout().then((response) => {
                commit("SAVE_COBORROWER_ABOUT", response.data);
            });
        },

        //* COBORROWER PROPERTY
        updateCoborrowerProperty({ commit }) {
            return propertyApi.fetchCoborrowerProperty().then((response) => {
                commit("SAVE_COBORROWER_PROPERTY", response.data);
            });
        },

        postCoborrowerProfile({ commit }, payload) {
            return profileApi.postCoborrowerProfile(payload).then((response) => {
                commit("SAVE_COBORROWER_PROFILE", response.data);
            });
        },

        //* COBORROWER ABOUT
        postCoborrowerAbout({ commit }, payload) {
            return aboutApi.postCoborrowerAbout(payload).then((response) => {
                commit("SAVE_COBORROWER_ABOUT", response.data);
            });
        },

        postCoborrowerProperty({ commit }, payload) {
            return propertyApi.postCoborrowerProperty(payload).then((response) => {
                commit("SAVE_COBORROWER_PROPERTY", response.data);
            });
        },

        //* COBORROWER INCOME
        updateCoborrowerIncome({ commit }) {
            return incomeApi.fetchCoborrowerIncome().then((response) => {
                commit("SAVE_COBORROWER_INCOME", response.data);
            });
        },

        postCoborrowerIncome({ commit }, payload) {
            return incomeApi.postCoborrowerIncome(payload).then((response) => {
                commit("SAVE_COBORROWER_INCOME", response.data);
            });
        },

        //* COBORROWER ASSETS
        updateCoborrowerAssets({ commit }) {
            return assetsApi.fetchCoborrowerAssets().then((response) => {
                commit("SAVE_COBORROWER_ASSETS", response.data);
            });
        },

        postCoborrowerAssets({ commit }, payload) {
            return assetsApi.postCoborrowerAssets(payload).then((response) => {
                commit("SAVE_COBORROWER_ASSETS", response.data);
            });
        },
    },

    getters: {},
};
