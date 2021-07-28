/* eslint-disable no-unused-vars */
import { createServer } from "miragejs";
import borrowerProfile from "./data/borrowerProfile";
import coborrowerProfile from "./data/coborrowerProfile";
import applicationData from "./data/application";
import borrowerAbout from "./data/borrowerAbout";
import coborrowerAbout from "./data/coborrowerAbout";
import borrowerProperty from "./data/borrowerProperty";
import coborrowerProperty from "./data/coborrowerProperty";
import borrowerIncome from "./data/borrowerIncome";
import coborrowerIncome from "./data/coborrowerIncome";
import borrowerAssets from "./data/borrowerAssets";
import coborrowerAssets from "./data/coborrowerAssets";

// export function makeServer({ environment = "development" } = {}) {
export function makeServer() {
	let timing = 700;
	let server = new createServer({
		// environment,

		seeds(server) {
			server.db.loadData({
				applicationData: applicationData,
				borrowerProfile: borrowerProfile,
				coborrowerProfile: coborrowerProfile,
				borrowerAbout: borrowerAbout,
				coborrowerAbout: coborrowerAbout,
				borrowerProperty: borrowerProperty,
				coborrowerProperty: coborrowerProperty,
				borrowerIncome: borrowerIncome,
				coborrowerIncome: coborrowerIncome,
				borrowerAssets: borrowerAssets,
				coborrowerAssets: coborrowerAssets
			});
		},

		routes() {
			this.namespace = "api";

			//********************** APPLICATION DATA *********************
			this.get(
				"/applicationData",
				schema => {
					return schema.db.applicationData[0];
				},
				{ timing }
			);

			this.post(
				"/applicationData",
				(schema, request) => {
					const data = JSON.parse(request.requestBody);
					return schema.db.applicationData.update(1, data);
				},
				{ timing }
			);

			//********************** BORROWER PROFILE *********************
			this.get(
				"/borrowerProfile",
				schema => {
					return schema.db.borrowerProfile[0];
				},
				{ timing }
			);

			this.post(
				"/borrowerProfile",
				(schema, request) => {
					const data = JSON.parse(request.requestBody);
					return schema.db.borrowerProfile.update(1, data);
				},
				{ timing }
			);

			//********************** COBORROWER PROFILE *********************
			this.get(
				"/coborrowerProfile",
				schema => {
					return schema.db.coborrowerProfile[0];
				},
				{ timing }
			);

			this.post(
				"/coborrowerProfile",
				(schema, request) => {
					const data = JSON.parse(request.requestBody);
					return schema.db.coborrowerProfile.update(1, data);
				},
				{ timing }
			);

			//********************** BORROWER ABOUT *********************
			this.get(
				"/borrowerAbout",
				schema => {
					return schema.db.borrowerAbout[0];
				},
				{ timing }
			);

			this.post(
				"/borrowerAbout",
				(schema, request) => {
					const data = JSON.parse(request.requestBody);
					return schema.db.borrowerAbout.update(1, data);
				},
				{ timing }
			);

			//*********************** COBORROWER ABOUT *************************
			this.get(
				"/coborrowerAbout",
				schema => {
					return schema.db.coborrowerAbout[0];
				},
				{ timing }
			);

			this.post(
				"/coborrowerAbout",
				(schema, request) => {
					const data = JSON.parse(request.requestBody);
					return schema.db.coborrowerAbout.update(1, data);
				},
				{ timing }
			);

			//*********************** BORROWER PROPERTY *********************************
			this.get(
				"/borrowerProperty",
				schema => {
					return schema.db.borrowerProperty[0];
				},
				{ timing }
			);

			this.post(
				"/borrowerProperty",
				(schema, request) => {
					const data = JSON.parse(request.requestBody);
					return schema.db.borrowerProperty.update(1, data);
				},
				{ timing }
			);

			//*********************** COBORROWER PROPERTY *********************************
			this.get(
				"/coborrowerProperty",
				schema => {
					return schema.db.coborrowerProperty[0];
				},
				{ timing }
			);

			this.post(
				"/coborrowerProperty",
				(schema, request) => {
					const data = JSON.parse(request.requestBody);
					return schema.db.coborrowerProperty.update(1, data);
				},
				{ timing }
			);

			//*********************** BORROWER INCOME *********************************
			this.get(
				"/borrowerIncome",
				schema => {
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
				schema => {
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
				schema => {
					return schema.db.borrowerAssets[0];
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
				schema => {
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

			// these allow non mirage API requests through in dev
			this.passthrough();
			this.passthrough("https://vimeo.com/**");
		}
	});

	return server;
}
