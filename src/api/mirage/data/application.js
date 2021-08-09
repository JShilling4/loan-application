export const sectionProgress = {
    profile: 3, // 3 (new account) or 2 (existing account)
    about: 11, // 11 (w/ coborrower)
    property: 8, // 8 (w/ coborrower)
    income: 3, // 3 (w/ coborrower) or 2 (w/o coborrower)
    assets: 2, // 2 (w/ coborrower)
    identity: 4, // 4 (w/ coborrower) or 2 (w/o coborrower)
};

export const newApplication = {
    sectionProgress: {
        profile: null,
        about: null,
        property: null,
        income: null,
        assets: null,
        identity: null,
        review: null,
    },
    token: "new",
    borrowerProfile: {
        firstName: null,
        middleInitial: null,
        lastName: null,
        password: null,
        suffix: null,
        email: null,
        phone: null,
        maritalStatus: null,
        streetAddress: null,
        apartmentNumber: null,
        city: null,
        state: null,
        zipcode: null,
        referralSource: null,
        referralSourceName: null,
        loanOfficer: null,
    },

    borrowerAbout: {
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

    borrowerProperty: {
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

    borrowerIncome: {
        creditCheckAuthorized: null,
        incomeHistory: null,
        ssn: null,
        birthDate: null,
        currentWorkYears: null,
    },

    borrowerAssets: null,

    borrowerIdentity: {
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
};

export const completedProfile = {
    sectionProgress: {
        profile: 1,
        about: null,
        property: null,
        income: null,
        assets: null,
        identity: null,
        review: null,
    },
    token: "profile",
    borrowerProfile: {
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
    },

    borrowerAbout: {
        hasCoborrower: null,
        hasCoborrowerAuthorization: null,
        referralSource: null,
        referralSourceName: null,
        loanOfficer: null,
        isVeteran: null,
        loanType: null,
        hasDependents: null,
        numberOfDependents: null,
        dependentAges: null,
        payOrReceiveSupport: null,
        supportType: null,
        supportAmount: null,
    },

    borrowerProperty: {
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

    borrowerIncome: {
        creditCheckAuthorized: null,
        incomeHistory: null,
        ssn: null,
        birthDate: null,
        currentWorkYears: null,
    },

    borrowerAssets: null,

    borrowerIdentity: {
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

    coborrower: null,
};