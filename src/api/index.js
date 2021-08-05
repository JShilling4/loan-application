import axios from "axios";
// import Router from "@/router";

// base instance
// const rest = axios.create({
//   baseURL: process.env.VUE_APP_API_URL,
// });

// const ruoffApiWithKey = axios.create({
// 	baseURL: process.env.VUE_APP_RUOFFAPI_URL,
// 	headers: {
// 		Authorization: process.env.VUE_APP_RUOFFAPI_KEY,
// 	},
// });

// REST interceptors
// rest.interceptors.request.use(
// 	(config) => {
// 		const token = localStorage.getItem("wlv4");
// 		if (token) {
// 			config.headers.Authorization = token;
// 		}
// 		return config;
// 	},
// 	(error) => {
// 		Promise.reject(error);
// 	}
// );

// rest.interceptors.response.use(
// 	(response) => response,
// 	(error) => {
// 		if (error.response.status === 401) {
// 			Router.push("/login");
// 		}
// 		return Promise.reject(error);
// 	}
// );

// ENDPOINTS
export const applicationApi = {
    fetchApplicationData() {
        return axios.get("/api/applicationData");
    },
    postApplicationData(payload) {
        return axios.post("/api/applicationData", payload);
    },
};

export const profileApi = {
    fetchBorrowerProfile() {
        return axios.get("/api/borrowerProfile");
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
    }
}
