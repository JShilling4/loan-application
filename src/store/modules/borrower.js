import { profileApi, aboutApi, propertyApi, incomeApi, assetsApi, identityApi } from "@/api";

export default {
    state: {
        borrower: {
            profile: {},
            about: {},
            property: {},
            income: {},
            assets: [],
            identity: {
                declarations: {},
                demographics: {
                    willProvideInformation: null,
                    gender: null,
                    ethnicity: null,
                    race: null,
                },
            },
        },
    },

    mutations: {
        SAVE_BORROWER_DATA(state, payload) {
            state.borrower = payload;
        },
        SAVE_BORROWER_PROFILE(state, payload) {
            state.borrower.profile = { ...state.borrower.profile, ...payload };
        },

        SAVE_BORROWER_ABOUT(state, payload) {
            state.borrower.about = { ...state.borrower.about, ...payload };
        },

        SAVE_BORROWER_PROPERTY(state, payload) {
            state.borrower.property = {
                ...state.borrower.property,
                ...payload,
            };
        },

        SAVE_BORROWER_INCOME(state, payload) {
            state.borrower.income = {
                ...state.borrower.income,
                ...payload,
            };
        },

        SAVE_BORROWER_ASSETS(state, payload) {
            state.borrower.assets = payload;
        },

        SAVE_BORROWER_IDENTITY(state, payload) {
            state.borrower.identity = {
                ...state.borrower.identity,
                ...payload,
            };
        },
    },

    actions: {
        // PROFILE
        fetchBorrowerProfile({ commit }) {
            return profileApi.fetchBorrowerProfile().then((response) => {
                commit("SAVE_BORROWER_PROFILE", response.data);
            });
        },

        postBorrowerProfile({ commit }, payload) {
            return profileApi.postBorrowerProfile(payload).then((response) => {
                commit("SAVE_BORROWER_PROFILE", response.data);
            });
        },

        // ABOUT
        fetchBorrowerAbout({ commit }) {
            return aboutApi.fetchBorrowerAbout().then((response) => {
                commit("SAVE_BORROWER_ABOUT", response.data);
            });
        },

        postBorrowerAbout({ commit }, payload) {
            return aboutApi.postBorrowerAbout(payload).then((response) => {
                commit("SAVE_BORROWER_ABOUT", response.data);
            });
        },

        // PROPERTY
        updateBorrowerProperty({ commit }) {
            return propertyApi.fetchBorrowerProperty().then((response) => {
                commit("SAVE_BORROWER_PROPERTY", response.data);
            });
        },

        postBorrowerProperty({ commit }, payload) {
            return propertyApi.postBorrowerProperty(payload).then((response) => {
                commit("SAVE_BORROWER_PROPERTY", response.data);
            });
        },

        // INCOME
        updateBorrowerIncome({ commit }) {
            return incomeApi.fetchBorrowerIncome().then((response) => {
                commit("SAVE_BORROWER_INCOME", response.data);
            });
        },

        postBorrowerIncome({ commit }, payload) {
            return incomeApi.postBorrowerIncome(payload).then((response) => {
                commit("SAVE_BORROWER_INCOME", response.data);
            });
        },

        // ASSETS
        updateBorrowerAssets({ commit }) {
            return assetsApi.fetchBorrowerAssets().then((response) => {
                commit("SAVE_BORROWER_ASSETS", response.data);
            });
        },

        postBorrowerAssets({ commit }, payload) {
            return assetsApi.postBorrowerAssets(payload).then((response) => {
                commit("SAVE_BORROWER_ASSETS", response.data);
            });
        },

        // IDENTITY
        updateBorrowerIdentity({ commit }) {
            return identityApi.fetchBorrowerIdentity().then((response) => {
                commit("SAVE_BORROWER_IDENTITY", response.data);
            });
        },

        postBorrowerIdentity({ commit }, payload) {
            return identityApi.postBorrowerIdentity(payload).then((response) => {
                commit("SAVE_BORROWER_IDENTITY", response.data);
            });
        },
    },

    getters: {},
};
