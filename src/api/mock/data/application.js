export const sectionProgress = {
    profile: 5, // 5 (new account) or 4 (existing account)
    about: 9, // 9 (w/ coborrower)
    property: 8, // 8 (w/ coborrower)
    income: 3, // 3 (w/ coborrower) or 2 (w/o coborrower)
    assets: 2, // 2 (w/ coborrower)
    identity: 4, // 4 (w/ coborrower) or 2 (w/o coborrower)
    review: null,
};

export const completedProfile = {
    sectionProgress: {
        profile: 5,
        about: null,
        property: null,
        income: null,
        assets: null,
        identity: null,
        review: null,
    },
    token: "profile",
    borrower: {
        profile: {
            firstName: "Johnny",
            middleInitial: "C",
            lastName: "Lately",
            suffix: null,
            email: "johnnyC@email.com",
            phone: "5555555555",
            maritalStatus: "Single",
            streetAddress: "401 E First St",
            streetAddress2: null,
            apartmentNumber: null,
            apartmentNumber2: null,
            city: "South Whitley",
            city2: null,
            state: "IN",
            state2: null,
            zipcode: "43537",
            zipcode2: null,
            referralSource: "Radio",
            referralSourceName: null,
            loanOfficer: "clintmorgan",
        },

        about: {
            hasCoborrower: null,
            hasCoborrowerAuthorization: null,
            isVeteran: null,
            loanType: null,
            hasDependents: null,
            numberOfDependents: null,
            dependentAges: null,
            payOrReceiveSupport: null,
            supportType: null,
            supportAmount: null,
        },

        property: {
            loanType: null,
            currentAddressInfo: {
                moveInDate: null,
                moveOutDate: "Present",
                propertyOwner: null,
                propertyPlan: null,
                propertyValue: null,
                monthlyRent: null,
            },
            addressHistory: null,
            hasOtherProperties: null,
            otherProperties: null,
            foundHome: null,
            propertyPlan: null,
            cashOut: null,
            includeTaxesAndInsurance: null,
            propertyLocationCity: null,
            propertyLocationState: null,
            whereLookingCity: null,
            whereLookingState: null,
            propertyUse: null,
            hasRealEstateAgent: null,
            realEstateAgentName: null,
            purchasePrice: null,
            downPaymentAmount: null,
        },

        income: {
            creditCheckAuthorized: null,
            incomeHistory: null,
            ssn: null,
            birthDate: null,
            currentWorkYears: null,
        },

        assets: null,

        identity: {
            declarations: {
                citizenshipStatus: null,
                primaryResidence: null,
                hadOwnershipInterest: null,
                propertyType: null,
                howTitleHeld: null,
                hasRelationToSeller: null,
                isBorrowingMoney: null,
                borrowedAmount: null,
                hasUndisclosedAdditionalLoan: null,
                hasUndisclosedNewCredit: null,
                hasadditionalLien: null,
                hasUndisclosedDebt: null,
                outstandingJudgements: null,
                hasDelinquentDebt: null,
                hasLawsuitLiability: null,
                hasConveyedTitle: null,
                hadPreforeclosureOrShortsale: null,
                hadRecentForeclosure: null,
                hasDeclaredBankruptcy: null,
                bankruptciesFiled: null,
            },
            demographics: {
                isOptingOut: null,
                ethnicity: null,
                gender: null,
                race: null,
            },
        },
    },
};
