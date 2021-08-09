import {
    accountApi,
    profileApi,
    aboutApi,
    propertyApi,
    incomeApi,
    assetsApi,
    identityApi,
} from "@/api";

export default {
    state: {
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

    mutations: {
        SAVE_BORROWER_DATA(state, payload) {
            state.profile = payload.borrowerProfile;
            state.about = payload.borrowerAbout;
            state.property = payload.borrowerProperty;
            state.income = payload.borrowerIncome;
            state.assets = payload.borrowerAssets;
            state.identity = payload.borrowerIdentity;
        },

        SAVE_BORROWER_PROFILE(state, payload) {
            state.profile = { ...state.profile, ...payload };
        },

        SAVE_BORROWER_ABOUT(state, payload) {
            state.about = { ...state.about, ...payload };
        },

        SAVE_BORROWER_PROPERTY(state, payload) {
            state.property = {
                ...state.property,
                ...payload,
            };
        },

        SAVE_BORROWER_INCOME(state, payload) {
            state.income = {
                ...state.income,
                ...payload,
            };
        },

        SAVE_BORROWER_ASSETS(state, payload) {
            state.assets = payload;
        },

        SAVE_BORROWER_IDENTITY(state, payload) {
            state.identity = {
                ...state.identity,
                ...payload,
            };
        },

        RESET_BORROWER_DATA(state) {
            state.profile = {};
            state.about = {};
            state.property = {};
            state.income = {};
            state.assets = [];
            state.identity = {
                declarations: {},
                demographics: {
                    willProvideInformation: null,
                    gender: null,
                    ethnicity: null,
                    race: null,
                },
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
            return profileApi.postBorrowerProfile(payload).then(() => {
                commit("SAVE_BORROWER_PROFILE", payload);
            });
        },

        postProfileAndLogin({ commit }, payload) {
            return accountApi.postProfileAndLogin(payload).then((response) => {
                commit("SAVE_BORROWER_PROFILE", response.data.borrowerProfile);
                commit("SAVE_TOKEN", response.data.token);
                commit("SET_LOGGED_IN", true);
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
