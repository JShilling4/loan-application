// standard response

export default {
	creditCheckAuthorized: true,
	incomeHistory: [
		{
			incomeType: "employed",
            employerName: "TestEmployer1",
            description: "TestEmployer1 - Office Administrator",
            jobTitle: "Office Administrator",
            employerAddress: "401 E 1st St",
            employerCity: "South Whitley",
            employerState: "IN",
            employerZipcode: "43174",
            employerPhone: "555-555-5555",
            currentOrPriorEmployer: "Current",
			startDate: "01/2016",
			endDate: "Present",
            compensationType: ['salary','commission'],
            monthlySalary: "4500",
            monthlyCommission: "400",
		}
	],
	ssn: "XXX-XX-0000",
	birthDate: "12/12/1980",
    currentWorkYears: "8",
};

// not completed response

// export default {
// 	creditCheckAuthorized: null,
// 	incomeHistory: null,
// 	ssn: null,
// 	birthDate: null,
//     currentWorkYears: null,
// };
