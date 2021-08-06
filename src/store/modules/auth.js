import { accountApi } from "@/api";

export default {
    state: {
        isAuthorized: false,
        token: localStorage.getItem("lb") || null,
    },

    mutations: {
        AUTH_SUCCESS(state) {
            state.isAuthorized = true;
        },
        SAVE_TOKEN(state, token) {
            localStorage.setItem("lb", token);
            state.token = token;
        }
    },

    actions: {
        logIn({ commit }, credentials) {
            return accountApi
                .login(credentials)
                .then((response) => {
                    commit("SAVE_BORROWER_DATA", response.data.borrower);
                    commit("SAVE_SECTION_PROGRESS", response.data.sectionProgress);
                    commit("SAVE_TOKEN", response.data.token);
                    commit("AUTH_SUCCESS");
                    return response.data;
                })
                .catch((error) => {
                    return error;
                });
        },
        validateToken(token) {
            return accountApi.validateToken(token).then((response) => {
                console.log(response.data);
            });
        },
    },

    getters: {},
};
