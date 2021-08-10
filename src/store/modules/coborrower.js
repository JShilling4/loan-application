import { profileApi, aboutApi, propertyApi, incomeApi, assetsApi, identityApi } from "@/api";

export default {
    state: {
        profile: {},
        about: {},
        property: {},
        income: {},
        assets: [],
        identity: {
            declarations: {},
            demographics: {},
        },
    },

    mutations: {
        SAVE_BORROWER_DATA(state, payload) {
            state.profile = payload.coborrowerProfile;
            state.about = payload.coborrowerAbout;
            state.property = payload.coborrowerProperty;
            state.income = payload.coborrowerIncome;
            state.assets = payload.coborrowerAssets;
            state.identity = payload.coborrowerIdentity;
        },

        SAVE_COBORROWER_PROFILE(state, payload) {
            state.profile = {
                ...state.profile,
                ...payload,
            };
        },

        SAVE_COBORROWER_ABOUT(state, payload) {
            state.about = { ...state.about, ...payload };
        },

        SAVE_COBORROWER_PROPERTY(state, payload) {
            state.property = {
                ...state.property,
                ...payload,
            };
        },

        SAVE_COBORROWER_INCOME(state, payload) {
            state.income = {
                ...state.income,
                ...payload,
            };
        },

        SAVE_COBORROWER_ASSETS(state, payload) {
            state.assets = state.assets.concat(payload);
        },

        SAVE_COBORROWER_IDENTITY(state, payload) {
            state.coborrower.identity = {
                ...state.identity,
                ...payload,
            };
        },
    },

    actions: {
        // COBORROWER PROFILE
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

        // COBORROWER PROPERTY
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

        // COBORROWER ABOUT
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

        // COBORROWER INCOME
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

        // COBORROWER ASSETS
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

        // COBORROWER IDENTITY
        updateCoborrowerIdentity({ commit }) {
            return identityApi.fetchCoborrowerIdentity().then((response) => {
                commit("SAVE_COBORROWER_IDENTITY", response.data);
            });
        },

        postCoborrowerIdentity({ commit }, payload) {
            return identityApi.postCoborrowerIdentity(payload).then((response) => {
                commit("SAVE_COBORROWER_IDENTITY", response.data);
            });
        },
    },

    getters: {},
};
