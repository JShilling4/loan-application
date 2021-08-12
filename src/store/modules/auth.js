import { accountApi } from "@/api";

export default {
    state: {
        loggedIn: false,
        token: localStorage.getItem("lb") || null,
    },

    mutations: {
        SET_LOGGED_IN(state, value) {
            state.loggedIn = value;
        },
        SAVE_TOKEN(state, token) {
            localStorage.setItem("lb", token);
            state.token = token;
        },
        LOG_OUT(state) {
            localStorage.removeItem("lb");
            state.token = null;
            state.loggedIn = false;
        },
    },

    actions: {
        logIn({ commit }, credentials) {
            return accountApi
                .login(credentials)
                .then((response) => {
                    commit("SAVE_BORROWER_DATA", response.data);
                    commit("SAVE_COBORROWER_DATA", response.data);
                    commit(
                        "SET_APP_LOAD_SECTION_COUNTS",
                        response.data.borrowerAbout.hasCoborrower
                    );
                    commit("SAVE_SECTION_PROGRESS", response.data.sectionProgress);
                    commit("SAVE_TOKEN", response.data.token);
                    commit("SET_LOGGED_IN", true);
                    return response.data;
                })
                .catch((error) => {
                    return error;
                });
        },

        // Logs out the current user.
        logOut({ commit }) {
            commit("LOG_OUT");
            commit("RESET_BORROWER_DATA");
            commit("RESET_SECTION_PROGRESS");
            commit("RESET_SECTION_COUNTS");
        },

        // Validates the current user's token and refreshes it
        // with new data from the API.
        validateToken({ commit, dispatch, state }) {
            if (!state.token) return Promise.resolve(null);
            const returnData = state.loggedIn ? false : true;
            // console.log(`token = ${state.token}`)
            return accountApi
                .validateToken({ token: state.token, returnData })
                .then((response) => {
                    if (response.data !== "OK") {
                        commit("SAVE_BORROWER_DATA", response.data);
                        commit("SAVE_COBORROWER_DATA", response.data);
                        commit(
                            "SET_APP_LOAD_SECTION_COUNTS",
                            response.data.borrowerAbout.hasCoborrower
                        );
                        commit("SAVE_SECTION_PROGRESS", response.data.sectionProgress);
                        commit("SET_LOGGED_IN", true);
                        return true;
                    }
                    return true;
                })
                .catch((error) => {
                    if (error.response && error.response.status === 401) {
                        commit("SET_LOGGED_IN", false);
                    } else {
                        console.warn(error);
                    }
                    return error;
                });
        },
    },

    getters: {
        // Whether the user is currently logged in.
        loggedIn(state) {
            return state.loggedIn;
        },
    },
};
