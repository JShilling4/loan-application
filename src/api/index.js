import axios from "axios";

// ENDPOINTS
export const accountApi = {
    login(payload) {
        return axios.post("/api/login", payload);
    },
    postProfileAndLogin(payload) {
        return axios.post("/api/postProfileAndLogin", payload);
    },

    validateToken(payload) {
        return axios.post("/api/validateToken", payload);
    },
};

export const applicationApi = {
    fetchSectionProgress() {
        return axios.get("/api/sectionProgress");
    },
    postSectionProgress(payload) {
        return axios.post("/api/sectionProgress", payload);
    },
};

export const profileApi = {
    fetchBorrowerProfile() {
        // return axios.get("/api/borrowerProfile");
        // return axios.post("/api/graphql", {
        //     query: `{
        //         borrowerProfiles(queryString: "${queryString}", employees: "${employees}"){
        //         }
        //     }`,
        // });
    },
    fetchCoborrowerProfile() {
        return axios.get("/api/coborrowerProfile");
    },
    postBorrowerProfile(payload) {
        return axios.post("/api/borrowerProfile", payload);
    },
    postCoborrowerProfile(payload) {
        return axios.post("/api/coborrowerProfile", payload);
    },
};

export const aboutApi = {
    fetchBorrowerAbout() {
        return axios.get("/api/borrowerAbout");
    },
    fetchCoborrowerAbout() {
        return axios.get("/api/coborrowerAbout");
    },
    postBorrowerAbout(payload) {
        return axios.post("/api/borrowerAbout", payload);
    },
    postCoborrowerAbout(payload) {
        return axios.post("/api/coborrowerAbout", payload);
    },
};

export const propertyApi = {
    fetchBorrowerProperty() {
        return axios.get("/api/borrowerProperty");
    },
    fetchCoborrowerProperty() {
        return axios.get("/api/coborrowerProperty");
    },
    postBorrowerProperty(payload) {
        return axios.post("/api/borrowerProperty", payload);
    },
    postCoborrowerProperty(payload) {
        return axios.post("/api/coborrowerProperty", payload);
    },
};

export const incomeApi = {
    fetchBorrowerIncome() {
        return axios.get("/api/borrowerIncome");
    },
    fetchCoborrowerIncome() {
        return axios.get("/api/coborrowerIncome");
    },
    postBorrowerIncome(payload) {
        return axios.post("/api/borrowerIncome", payload);
    },
    postCoborrowerIncome(payload) {
        return axios.post("/api/coborrowerIncome", payload);
    },
};

export const assetsApi = {
    fetchBorrowerAssets() {
        return axios.get("/api/borrowerAssets");
    },
    fetchCoborrowerAssets() {
        return axios.get("/api/coborrowerAssets");
    },
    postBorrowerAssets(payload) {
        return axios.post("/api/borrowerAssets", payload);
    },
    postCoborrowerAssets(payload) {
        return axios.post("/api/coborrowerAssets", payload);
    },
};

export const identityApi = {
    fetchBorrowerIdentity() {
        return axios.get("/api/borrowerIdentity");
    },
    fetchCoborrowerIdentity() {
        return axios.get("/api/coborrowerIdentity");
    },
    postBorrowerIdentity(payload) {
        return axios.post("/api/borrowerIdentity", payload);
    },
    postCoborrowerIdentity(payload) {
        return axios.post("/api/coborrowerIdentity", payload);
    },
};
