/* eslint-disable no-unused-vars */
import { createServer } from "miragejs";

import {
    sectionProgress,
    newApplication,
    completedProfile,
    completedAbout,
} from "./data/application";
import borrowerAbout from "./data/borrowerAbout";
import coborrowerAbout from "./data/coborrowerAbout";
import borrowerProperty from "./data/borrowerProperty";
import coborrowerProperty from "./data/coborrowerProperty";
import borrowerIncome from "./data/borrowerIncome";
import coborrowerIncome from "./data/coborrowerIncome";
import borrowerAssets from "./data/borrowerAssets";
import coborrowerAssets from "./data/coborrowerAssets";
import borrowerIdentity from "./data/borrowerIdentity";
import coborrowerIdentity from "./data/coborrowerIdentity";

// export function makeServer({ environment = "development" } = {}) {
export function makeServer() {
    let timing = 80;

    let server = new createServer({
        // environment,

        seeds(server) {
            server.db.loadData({
                sectionProgress: sectionProgress,
                borrowerAbout: borrowerAbout,
                coborrowerAbout: coborrowerAbout,
                borrowerProperty: borrowerProperty,
                coborrowerProperty: coborrowerProperty,
                borrowerIncome: borrowerIncome,
                coborrowerIncome: coborrowerIncome,
                borrowerAssets: borrowerAssets,
                coborrowerAssets: coborrowerAssets,
                borrowerIdentity: borrowerIdentity,
                coborrowerIdentity: coborrowerIdentity,
                newApplication: newApplication,
                completedProfile: completedProfile,
                completedAbout: completedAbout,
            });
        },

        routes() {
            this.namespace = "api";
            let activeApplication = "new";

            //************************** ACCOUNT **************************
            this.post(
                "/login",
                (schema, request) => {
                    const data = JSON.parse(request.requestBody);
                    const { email, password } = data;
                    switch (password) {
                        case "profile": {
                            activeApplication = "profile";
                            return schema.db.completedProfile[0];
                        }
                        case "about": {
                            activeApplication = "about";
                            return schema.db.completedAbout[0];
                        }
                        case "error400": {
                            return new Response(
                                400,
                                { some: "header" },
                                { errors: ["Bad Request"] }
                            );
                        }
                        default: {
                            return schema.db.data;
                        }
                    }
                },
                { timing }
            );

            this.post(
                "/postProfileAndLogin",
                (schema, request) => {
                    const data = JSON.parse(request.requestBody);
                    const { email, password, profile } = data;
                    schema.db.newApplication.update(1, { borrowerProfile: profile });
                    return schema.db.newApplication[0];
                },
                { timing }
            );

            this.post(
                "/validateToken",
                (schema, request) => {
                    const { token, returnData } = JSON.parse(request.requestBody);
                    switch (token) {
                        case "profile": {
                            if (returnData) {
                                activeApplication = "profile";
                                return schema.db.completedProfile[0];
                            }
                            return "OK";
                        }
                        case "about": {
                            if (returnData) {
                                activeApplication = "about";
                                return schema.db.completedAbout[0];
                            }
                            return "OK";
                        }
                        case "error400": {
                            return new Response(
                                400,
                                { some: "header" },
                                { errors: ["Bad Request"] }
                            );
                        }
                        default: {
                            return schema.db.newApplication[0];
                        }
                    }
                },
                { timing }
            );

            //********************** APPLICATION DATA *********************
            // this.get(
            //     "/sectionProgress",
            //     (schema) => {
            //         return schema.db.activeApplication[0].sectionProgress;
            //     },
            //     { timing }
            // );

            this.post(
                "/sectionProgress",
                (schema, request) => {
                    const data = JSON.parse(request.requestBody);
                    switch (activeApplication) {
                        case "profile": {
                            schema.db.completedProfile.update(1, {
                                sectionProgress: data,
                            });
                            return schema.db.completedProfile[0].sectionProgress;
                        }
                        case "about": {
                            schema.db.completedAbout.update(1, {
                                sectionProgress: data,
                            });
                            return schema.db.completedAbout[0].sectionProgress;
                        }
                        default: {
                            schema.db.newApplication.update(1, { sectionProgress: data });
                            return schema.db.newApplication[0].sectionProgress;
                        }
                    }
                },
                { timing }
            );

            //********************** BORROWER PROFILE *********************
            // this.get(
            //     "/borrowerProfile",
            //     (schema) => {
            //          return schema.db.activeApplication[0].borrowerProfile;
            //     },
            //     { timing }
            // );

            this.post(
                "/borrowerProfile",
                (schema, request) => {
                    const data = JSON.parse(request.requestBody);
                    switch (activeApplication) {
                        case "profile": {
                            schema.db.completedProfile.update(1, {
                                borrowerProfile: data,
                            });
                            return data;
                        }
                        case "about": {
                            schema.db.completedAbout.update(1, {
                                borrowerProfile: data,
                            });
                            return data;
                        }
                        default: {
                            schema.db.newApplication.update(1, { borrowerProfile: data });
                            return data;
                        }
                    }
                },
                { timing }
            );

            //********************** COBORROWER PROFILE *********************
            // this.get(
            //     "/coborrowerProfile",
            //     (schema) => {
            //         return schema.db.coborrowerProfile[0];
            //     },
            //     { timing }
            // );

            this.post(
                "/coborrowerProfile",
                (schema, request) => {
                    const data = JSON.parse(request.requestBody);
                    switch (activeApplication) {
                        case "profile": {
                            schema.db.completedProfile.update(1, {
                                coborrowerProfile: data,
                            });
                            return data;
                        }
                        case "about": {
                            schema.db.completedAbout.update(1, {
                                coborrowerProfile: data,
                            });
                            return data;
                        }
                        default: {
                            schema.db.newApplication.update(1, { coborrowerProfile: data });
                            return data;
                        }
                    }
                },
                { timing }
            );

            //********************** BORROWER ABOUT *********************
            // this.get(
            //     "/borrowerAbout",
            //     (schema) => {
            //         return schema.db.borrowerAbout[0];
            //     },
            //     { timing }
            // );

            this.post(
                "/borrowerAbout",
                (schema, request) => {
                    const data = JSON.parse(request.requestBody);
                    switch (activeApplication) {
                        case "profile": {
                            schema.db.completedProfile.update(1, {
                                borrowerAbout: data,
                            });
                            return data;
                        }
                        case "about": {
                            schema.db.completedAbout.update(1, {
                                borrowerAbout: data,
                            });
                            return data;
                        }
                        default: {
                            schema.db.newApplication.update(1, { borrowerAbout: data });
                            return data;
                        }
                    }
                },
                { timing }
            );

            //*********************** COBORROWER ABOUT *************************
            // this.get(
            //     "/coborrowerAbout",
            //     (schema) => {
            //         return schema.db.coborrowerAbout[0];
            //     },
            //     { timing }
            // );

            this.post(
                "/coborrowerAbout",
                (schema, request) => {
                    const data = JSON.parse(request.requestBody);
                    switch (activeApplication) {
                        case "profile": {
                            schema.db.completedProfile.update(1, {
                                coborrowerAbout: data,
                            });
                            return data;
                        }
                        case "about": {
                            schema.db.completedAbout.update(1, {
                                coborrowerAbout: data,
                            });
                            return data;
                        }
                        default: {
                            schema.db.newApplication.update(1, { coborrowerAbout: data });
                            return data;
                        }
                    }
                },
                { timing }
            );

            //*********************** BORROWER PROPERTY *********************************
            // this.get(
            //     "/borrowerProperty",
            //     (schema) => {
            //         return schema.db.borrowerProperty[0];
            //     },
            //     { timing }
            // );

            this.post(
                "/borrowerProperty",
                (schema, request) => {
                    const data = JSON.parse(request.requestBody);
                    switch (activeApplication) {
                        case "profile": {
                            schema.db.completedProfile.update(1, {
                                borrowerProperty: data,
                            });
                            return data;
                        }
                        case "about": {
                            schema.db.completedAbout.update(1, {
                                borrowerProperty: data,
                            });
                            return data;
                        }
                        default: {
                            schema.db.newApplication.update(1, { borrowerProperty: data });
                            return data;
                        }
                    }
                },
                { timing }
            );

            //*********************** COBORROWER PROPERTY *********************************
            // this.get(
            //     "/coborrowerProperty",
            //     (schema) => {
            //         return schema.db.coborrowerProperty[0];
            //     },
            //     { timing }
            // );

            this.post(
                "/coborrowerProperty",
                (schema, request) => {
                    const data = JSON.parse(request.requestBody);
                    switch (activeApplication) {
                        case "profile": {
                            schema.db.completedProfile.update(1, {
                                coborrowerProperty: data,
                            });
                            return data;
                        }
                        case "about": {
                            schema.db.completedAbout.update(1, {
                                coborrowerProperty: data,
                            });
                            return data;
                        }
                        default: {
                            schema.db.newApplication.update(1, { coborrowerProperty: data });
                            return data;
                        }
                    }
                },
                { timing }
            );

            //*********************** BORROWER INCOME *********************************
            this.get(
                "/borrowerIncome",
                (schema) => {
                    return schema.db.borrowerIncome[0];
                },
                { timing }
            );

            this.post(
                "/borrowerIncome",
                (schema, request) => {
                    const data = JSON.parse(request.requestBody);
                    return schema.db.borrowerIncome.update(1, data);
                },
                { timing }
            );

            //*********************** COBORROWER INCOME *********************************
            this.get(
                "/coborrowerIncome",
                (schema) => {
                    return schema.db.coborrowerIncome[0];
                },
                { timing }
            );

            this.post(
                "/coborrowerIncome",
                (schema, request) => {
                    const data = JSON.parse(request.requestBody);
                    return schema.db.coborrowerIncome.update(1, data);
                },
                { timing }
            );

            //*********************** BORROWER ASSETS *********************************
            this.get(
                "/borrowerAssets",
                (schema) => {
                    return schema.db.borrowerAssets;
                },
                { timing }
            );

            this.post(
                "/borrowerAssets",
                (schema, request) => {
                    const data = JSON.parse(request.requestBody);
                    return schema.db.borrowerAssets.update(1, data);
                },
                { timing }
            );

            //*********************** COBORROWER ASSETS *********************************
            this.get(
                "/coborrowerAssets",
                (schema) => {
                    return schema.db.coborrowerAssets[0];
                },
                { timing }
            );

            this.post(
                "/coborrowerAssets",
                (schema, request) => {
                    const data = JSON.parse(request.requestBody);
                    return schema.db.coborrowerAssets.update(1, data);
                },
                { timing }
            );

            //*********************** BORROWER IDENTITY *********************************
            this.get(
                "/borrowerIdentity",
                (schema) => {
                    return schema.db.borrowerIdentity[0];
                },
                { timing }
            );

            this.post(
                "/borrowerIdentity",
                (schema, request) => {
                    const data = JSON.parse(request.requestBody);
                    return schema.db.borrowerIdentity.update(1, data);
                },
                { timing }
            );

            //*********************** COBORROWER IDENTITY *********************************
            this.get(
                "/coborrowerIdentity",
                (schema) => {
                    return schema.db.coborrowerIdentity[0];
                },
                { timing }
            );

            this.post(
                "/coborrowerIdentity",
                (schema, request) => {
                    const data = JSON.parse(request.requestBody);
                    return schema.db.coborrowerIdentity.update(1, data);
                },
                { timing }
            );

            // these allow non mirage API requests through in dev
            this.passthrough();
            this.passthrough("https://vimeo.com/**");
        },
    });

    return server;
}
