export default {
    state: {
        navigationItems: [
            {
                id: "profile",
                label: "Profile",
                destinationUrl: "/profile",
                sectionCount: 1,
                borrowerSections: 1,
                coborrowerSections: 0,
                status: "active",
            },
            {
                id: "about",
                label: "About",
                sectionCount: 6,
                borrowerSections: 6,
                coborrowerSections: 5,
                destinationUrl: "/about/referral",
                status: "",
            },
            {
                id: "property",
                label: "Property",
                sectionCount: 5,
                borrowerSections: 5,
                coborrowerSections: 2,
                destinationUrl: "/property/loan-type",
                status: "",
            },
            {
                id: "income",
                label: "Income",
                sectionCount: 2,
                borrowerSections: 2,
                coborrowerSections: 1,
                destinationUrl: "/income/income-history",
                status: "",
            },
            {
                id: "assets",
                label: "Assets",
                sectionCount: 1,
                borrowerSections: 1,
                coborrowerSections: 1,
                destinationUrl: "/assets",
                status: "",
            },
            {
                id: "identity",
                label: "Identity",
                sectionCount: 2,
                borrowerSections: 2,
                coborrowerSections: 2,
                destinationUrl: "/identity/declarations",
                status: "",
            },
            {
                id: "review",
                label: "Review",
                sectionCount: 1,
                borrowerSections: 1,
                coborrowerSections: 0,
                destinationUrl: "/review",
                status: "",
            },
        ],
    },

    mutations: {
        SAVE_SECTION_COUNT(state, payload) {
            const { section, count } = payload;
            state.navigationItems.find((navItem) => navItem.id == section).sectionCount = count;
        },
        SET_APP_LOAD_SECTION_COUNTS(state, hasCoborrower) {
            if (hasCoborrower === true) {
                state.navigationItems.forEach((navItem) => {
                    navItem.sectionCount = navItem.borrowerSections + navItem.coborrowerSections;
                });
            }
        },
        RESET_SECTION_COUNTS(state) {
            state.navigationItems.forEach((navItem) => {
                navItem.sectionCount = navItem.borrowerSections;
            });
        },
    },

    actions: {
        editNavigationSectionCount({ commit }, payload) {
            commit("SAVE_SECTION_COUNT", payload);
        },
    },

    getters: {},
};
