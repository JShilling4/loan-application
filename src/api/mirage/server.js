/* eslint-disable no-unused-vars */
import { createServer } from "miragejs";

import {
    newApplication,
    completedProfile,
    completedAbout,
    completedProperty,
    completedAbout_cob,
} from "./data/application";


// export function makeServer({ environment = "development" } = {}) {
export function makeServer() {
    let timing = 80;

    let server = new createServer({
        // environment,

        seeds(server) {
            server.db.loadData({
                newApplication: newApplication,
                completedProfile: completedProfile,
                completedAbout: completedAbout,
                completedAbout_coborrrower: completedAbout_cob,
                completedProperty: completedProperty,
            });
        },

        routes() {
            this.namespace = "api";
            let activeApplication = "new";

            //************************** ACCOUNT **************************
            // login
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
                        case "about_cob": {
                            activeApplication = "about_cob";
                            return schema.db.completedAbout_cob[0];
                        }
                        case "property": {
                            activeApplication = "property";
                            return schema.db.completedProperty[0];
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

            // post profile & login
            this.post(
                "/postProfileAndLogin",
                (schema, request) => {
                    const data = JSON.parse(request.requestBody);
                    const { email, password, profile, sectionProgress } = data;
                    schema.db.newApplication.update(1, { borrowerProfile: profile });
                    schema.db.newApplication.update(1, { sectionProgress: sectionProgress });
                    return schema.db.newApplication[0];
                },
                { timing }
            );

            // validate token
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
                        case "about_cob": {
                            if (returnData) {
                                activeApplication = "about_cob";
                                return schema.db.completedAbout_cob[0];
                            }
                            return "OK";
                        }
                        case "property": {
                            if (returnData) {
                                activeApplication = "property";
                                return schema.db.completedProperty[0];
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

            // post section progress
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
                        case "about_cob": {
                            schema.db.completedAbout_cob.update(1, {
                                sectionProgress: data,
                            });
                            return schema.db.completedAbout_cob[0].sectionProgress;
                        }
                        case "property": {
                            schema.db.completedProperty.update(1, {
                                sectionProgress: data,
                            });
                            return schema.db.completedProperty[0].sectionProgress;
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
                        case "about_cob": {
                            schema.db.completedAbout_cob.update(1, {
                                borrowerProfile: data,
                            });
                            return data;
                        }
                        case "property": {
                            schema.db.completedProperty.update(1, {
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
                        case "about_cob": {
                            schema.db.completedAbout_cob.update(1, {
                                coborrowerProfile: data,
                            });
                            return data;
                        }
                        case "property": {
                            schema.db.completedProperty.update(1, {
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
                        case "about_cob": {
                            schema.db.completedAbout_cob.update(1, {
                                borrowerAbout: data,
                            });
                            return data;
                        }
                        case "property": {
                            schema.db.completedProperty.update(1, {
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
                        case "about_cob": {
                            schema.db.completedAbout_cob.update(1, {
                                coborrowerAbout: data,
                            });
                            return data;
                        }
                        case "property": {
                            schema.db.completedProperty.update(1, {
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
                        case "about_cob": {
                            schema.db.completedAbout_cob.update(1, {
                                borrowerProperty: data,
                            });
                            return data;
                        }
                        case "property": {
                            schema.db.completedProperty.update(1, {
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
                        case "about_cob": {
                            schema.db.completedAbout_cob.update(1, {
                                coborrowerProperty: data,
                            });
                            return data;
                        }
                        case "property": {
                            schema.db.completedProperty.update(1, {
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
            // this.get(
            //     "/borrowerIncome",
            //     (schema) => {
            //         return schema.db.borrowerIncome[0];
            //     },
            //     { timing }
            // );

            this.post(
                "/borrowerIncome",
                (schema, request) => {
                    const data = JSON.parse(request.requestBody);
                    switch (activeApplication) {
                        case "profile": {
                            schema.db.completedProfile.update(1, {
                                borrowerIncome: data,
                            });
                            return data;
                        }
                        case "about": {
                            schema.db.completedAbout.update(1, {
                                borrowerIncome: data,
                            });
                            return data;
                        }
                        case "about_cob": {
                            schema.db.completedAbout_cob.update(1, {
                                borrowerIncome: data,
                            });
                            return data;
                        }
                        case "property": {
                            schema.db.completedProperty.update(1, {
                                borrowerIncome: data,
                            });
                            return data;
                        }
                        default: {
                            schema.db.newApplication.update(1, { borrowerIncome: data });
                            return data;
                        }
                    }
                },
                { timing }
            );

            //*********************** COBORROWER INCOME *********************************
            // this.get(
            //     "/coborrowerIncome",
            //     (schema) => {
            //         return schema.db.coborrowerIncome[0];
            //     },
            //     { timing }
            // );

            this.post(
                "/coborrowerIncome",
                (schema, request) => {
                    const data = JSON.parse(request.requestBody);
                    switch (activeApplication) {
                        case "profile": {
                            schema.db.completedProfile.update(1, {
                                coborrowerIncome: data,
                            });
                            return data;
                        }
                        case "about": {
                            schema.db.completedAbout.update(1, {
                                coborrowerIncome: data,
                            });
                            return data;
                        }
                        case "about_cob": {
                            schema.db.completedAbout_cob.update(1, {
                                coborrowerIncome: data,
                            });
                            return data;
                        }
                        case "property": {
                            schema.db.completedProperty.update(1, {
                                coborrowerIncome: data,
                            });
                            return data;
                        }
                        default: {
                            schema.db.newApplication.update(1, { coborrowerIncome: data });
                            return data;
                        }
                    }
                },
                { timing }
            );

            //*********************** BORROWER ASSETS *********************************
            // this.get(
            //     "/borrowerAssets",
            //     (schema) => {
            //         return schema.db.borrowerAssets;
            //     },
            //     { timing }
            // );

            this.post(
                "/borrowerAssets",
                (schema, request) => {
                    const data = JSON.parse(request.requestBody);
                    switch (activeApplication) {
                        case "profile": {
                            schema.db.completedProfile.update(1, {
                                borrowerAssets: data,
                            });
                            return data;
                        }
                        case "about": {
                            schema.db.completedAbout.update(1, {
                                borrowerAssets: data,
                            });
                            return data;
                        }
                        case "about_cob": {
                            schema.db.completedAbout_cob.update(1, {
                                borrowerAssets: data,
                            });
                            return data;
                        }
                        case "property": {
                            schema.db.completedProperty.update(1, {
                                borrowerAssets: data,
                            });
                            return data;
                        }
                        default: {
                            schema.db.newApplication.update(1, { borrowerAssets: data });
                            return data;
                        }
                    }
                },
                { timing }
            );

            //*********************** COBORROWER ASSETS *********************************
            // this.get(
            //     "/coborrowerAssets",
            //     (schema) => {
            //         return schema.db.coborrowerAssets[0];
            //     },
            //     { timing }
            // );

            this.post(
                "/coborrowerAssets",
                (schema, request) => {
                    const data = JSON.parse(request.requestBody);
                    switch (activeApplication) {
                        case "profile": {
                            schema.db.completedProfile.update(1, {
                                coborrowerAssets: data,
                            });
                            return data;
                        }
                        case "about": {
                            schema.db.completedAbout.update(1, {
                                coborrowerAssets: data,
                            });
                            return data;
                        }
                        case "about_cob": {
                            schema.db.completedAbout_cob.update(1, {
                                coborrowerAssets: data,
                            });
                            return data;
                        }
                        case "property": {
                            schema.db.completedProperty.update(1, {
                                coborrowerAssets: data,
                            });
                            return data;
                        }
                        default: {
                            schema.db.newApplication.update(1, { coborrowerAssets: data });
                            return data;
                        }
                    }
                },
                { timing }
            );

            //*********************** BORROWER IDENTITY *********************************
            // this.get(
            //     "/borrowerIdentity",
            //     (schema) => {
            //         return schema.db.borrowerIdentity[0];
            //     },
            //     { timing }
            // );

            this.post(
                "/borrowerIdentity",
                (schema, request) => {
                    const data = JSON.parse(request.requestBody);
                    switch (activeApplication) {
                        case "profile": {
                            schema.db.completedProfile.update(1, {
                                borrowerIdentity: data,
                            });
                            return data;
                        }
                        case "about": {
                            schema.db.completedAbout.update(1, {
                                borrowerIdentity: data,
                            });
                            return data;
                        }
                        case "about_cob": {
                            schema.db.completedAbout_cob.update(1, {
                                borrowerIdentity: data,
                            });
                            return data;
                        }
                        case "property": {
                            schema.db.completedProperty.update(1, {
                                borrowerIdentity: data,
                            });
                            return data;
                        }
                        default: {
                            schema.db.newApplication.update(1, { borrowerIdentity: data });
                            return data;
                        }
                    }
                },
                { timing }
            );

            //*********************** COBORROWER IDENTITY *********************************
            // this.get(
            //     "/coborrowerIdentity",
            //     (schema) => {
            //         return schema.db.coborrowerIdentity[0];
            //     },
            //     { timing }
            // );

            this.post(
                "/coborrowerIdentity",
                (schema, request) => {
                    const data = JSON.parse(request.requestBody);
                    switch (activeApplication) {
                        case "profile": {
                            schema.db.completedProfile.update(1, {
                                coborrowerIdentity: data,
                            });
                            return data;
                        }
                        case "about": {
                            schema.db.completedAbout.update(1, {
                                coborrowerIdentity: data,
                            });
                            return data;
                        }
                        case "about_cob": {
                            schema.db.completedAbout_cob.update(1, {
                                coborrowerIdentity: data,
                            });
                            return data;
                        }
                        case "property": {
                            schema.db.completedProperty.update(1, {
                                coborrowerIdentity: data,
                            });
                            return data;
                        }
                        default: {
                            schema.db.newApplication.update(1, { coborrowerIdentity: data });
                            return data;
                        }
                    }
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
