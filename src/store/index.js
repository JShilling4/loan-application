import { createStore } from "vuex";
import application from "./modules/application";
import borrower from "./modules/borrower";
import coborrower from "./modules/coborrower";
import navigation from "./modules/navigation";
import portal from "./modules/portal";

export default createStore({
    state() {
        return {
            suffixes: [
                {
                    value: "II",
                    label: "II",
                },
                {
                    value: "III",
                    label: "III",
                },
                {
                    value: "IV",
                    label: "IV",
                },
                {
                    value: "V",
                    label: "V",
                },
                {
                    value: "VI",
                    label: "VI",
                },
                {
                    value: "VII",
                    label: "VII",
                },
                {
                    value: "CPA",
                    label: "CPA",
                },
                {
                    value: "DDS",
                    label: "DDS",
                },
                {
                    value: "DO",
                    label: "DO",
                },
                {
                    value: "Esq",
                    label: "Esq",
                },
                {
                    value: "JD",
                    label: "JD",
                },
                {
                    value: "Jr",
                    label: "Jr",
                },
                {
                    value: "LLD",
                    label: "LLD",
                },
                {
                    value: "MD",
                    label: "MD",
                },
                {
                    value: "PhD",
                    label: "PhD",
                },
                {
                    value: "Ret",
                    label: "Ret",
                },
                {
                    value: "RN",
                    label: "RN",
                },
                {
                    value: "Sr",
                    label: "Sr",
                },
            ],
            states: [
                {
                    value: "AK",
                    label: "Alaska",
                },
                {
                    value: "AL",
                    label: "Alabama",
                },
                {
                    value: "AZ",
                    label: "Arizona",
                },
                {
                    value: "AR",
                    label: "Arkansas",
                },
                {
                    value: "CA",
                    label: "California",
                },
                {
                    value: "CO",
                    label: "Colorado",
                },
                {
                    value: "CT",
                    label: "Connecticut",
                },
                {
                    value: "DE",
                    label: "Delaware",
                },
                {
                    value: "DC",
                    label: "District of Columbia",
                },
                {
                    value: "FL",
                    label: "Florida",
                },
                {
                    value: "GA",
                    label: "Georgia",
                },
                {
                    value: "HI",
                    label: "Hawaii",
                },
                {
                    value: "ID",
                    label: "Idaho",
                },
                {
                    value: "IL",
                    label: "Illinois",
                },
                {
                    value: "IN",
                    label: "Indiana",
                },
                {
                    value: "IA",
                    label: "Iowa",
                },
                {
                    value: "KS",
                    label: "Kansas",
                },
                {
                    value: "KY",
                    label: "Kentucky",
                },
                {
                    value: "LA",
                    label: "Louisiana",
                },
                {
                    value: "ME",
                    label: "Maine",
                },
                {
                    value: "MD",
                    label: "Maryland",
                },
                {
                    value: "MA",
                    label: "Massachusetts",
                },
                {
                    value: "MI",
                    label: "Michigan",
                },
                {
                    value: "MN",
                    label: "Minnesota",
                },
                {
                    value: "MS",
                    label: "Mississippi",
                },
                {
                    value: "MO",
                    label: "Missouri",
                },
                {
                    value: "MT",
                    label: "Montana",
                },
                {
                    value: "NE",
                    label: "Nebraska",
                },
                {
                    value: "NV",
                    label: "Nevada",
                },
                {
                    value: "NH",
                    label: "New Hampshire",
                },
                {
                    value: "NJ",
                    label: "New Jersey",
                },
                {
                    value: "NM",
                    label: "New Mexico",
                },
                {
                    value: "NY",
                    label: "New York",
                },
                {
                    value: "NC",
                    label: "North Carolina",
                },
                {
                    value: "ND",
                    label: "North Dakota",
                },
                {
                    value: "OH",
                    label: "Ohio",
                },
                {
                    value: "OK",
                    label: "Oklahoma",
                },
                {
                    value: "OR",
                    label: "Oregon",
                },
                {
                    value: "PA",
                    label: "Pennsylvania",
                },
                {
                    value: "RI",
                    label: "Rhode Island",
                },
                {
                    value: "SC",
                    label: "South Carolina",
                },
                {
                    value: "SD",
                    label: "South Dakota",
                },
                {
                    value: "TN",
                    label: "Tennessee",
                },
                {
                    value: "TX",
                    label: "Texas",
                },
                {
                    value: "UT",
                    label: "Utah",
                },
                {
                    value: "VT",
                    label: "Vermont",
                },
                {
                    value: "VA",
                    label: "Virginia",
                },
                {
                    value: "WA",
                    label: "Washington",
                },
                {
                    value: "WV",
                    label: "West Virginia",
                },
                {
                    value: "WI",
                    label: "Wisconsin",
                },
                {
                    value: "WY",
                    label: "Wyoming",
                },
            ],
            selectedLanguage: "English",
            appTheme: "dark",
        };
    },
    mutations: {
        CHANGE_LANGUAGE(state, language) {
            state.selectedLanguage = language;
        },
        TOGGLE_THEME(state) {
            state.appTheme = state.appTheme === "light" ? "dark" : "light";
        },
    },
    actions: {
        changeLanguage({ commit }, language) {
            commit("CHANGE_LANGUAGE", language);
        },
        toggleTheme({commit}) {
            commit("TOGGLE_THEME");
        }
    },
    modules: {
        application,
        borrower,
        coborrower,
        navigation,
        portal
    },
});
