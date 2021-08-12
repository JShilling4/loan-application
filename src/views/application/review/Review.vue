<template>
    <div class="review">
        <page-heading :theme="appTheme">
            Let's review your application!
        </page-heading>

        <div class="pageWrapper">

            <h2 class="boxHeading">{{ borrower.profile.firstName }}</h2>
            <div class="review-box">

                <review-section
                    v-for="(section, index) in borrowerSections"
                    :is-expanded="section.isExpanded"
                    :title="section.title"
                    :key="section.name"
                    @click="toggleBorrowerSection(section)"
                    :class="{ last: index === borrowerSections.length - 1 }"
                />

                <transition name="data-fade">
                    <review-section-data
                        :show="borrowerDataIsShowing"
                        :active-section="activeBorrowerSection"
                        :data="borrowerDataView"
                    />
                </transition>
            </div>

            <h2 class="boxHeading coborrower">{{ coborrower.profile.firstName }}</h2>
            <div class="review-box coborrower">
                <review-section
                    v-for="(section, index) in coborrowerSections"
                    :is-expanded="section.isExpanded"
                    :title="section.title"
                    :key="section.name"
                    @click="toggleCoborrowerSection(section)"
                    :class="{ last: index === coborrowerSections.length - 1 }"
                />

                <transition name="data-fade">
                    <review-section-data
                        :show="coborrowerDataIsShowing"
                        :active-section="activeCoborrowerSection"
                        :data="coborrowerDataView"
                        class="coborrower"
                    />
                </transition>
            </div>

            <view-controls
                @advance-app="$router.push('/application-completed')"
                @retreat-app="$router.go(-1)"
                :include-back="false"
                next-text="Finish Application"
            />
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import ReviewSection from "@/components/ReviewSection.vue";
import ReviewSectionData from "@/components/ReviewSectionData.vue";

export default {
    name: "Review",

    components: {
        "review-section": ReviewSection,
        "review-section-data": ReviewSectionData,
    },

    data() {
        return {
            borrowerDataIsShowing: false,
            coborrowerDataIsShowing: false,
            borrowerSections: [
                {
                    title: "Profile",
                    isExpanded: false,
                    editUrl: "/profile",
                },
                {
                    title: "Addresses",
                    isExpanded: false,
                    editUrl: "/property/address-history",
                },
                {
                    title: "Property",
                    isExpanded: false,
                    editUrl: "/property",
                },
                {
                    title: "Income",
                    isExpanded: false,
                    editUrl: "/income/income-history",
                },
                {
                    title: "Assets",
                    isExpanded: false,
                    editUrl: "/assets/add-assets",
                },
                {
                    title: "Demographics",
                    isExpanded: false,
                    editUrl: "/identity/demographics",
                },
                {
                    title: "Notes",
                    isExpanded: false,
                    editUrl: null,
                },
            ],
            coborrowerSections: [
                {
                    title: "Profile",
                    isExpanded: false,
                    editUrl: "/about/coborrower/info",
                },
                {
                    title: "Addresses",
                    isExpanded: false,
                    editUrl: "/property/coborrower-address-history",
                },
                {
                    title: "Income",
                    isExpanded: false,
                    editUrl: "/income/coborrower-income-history",
                },
                {
                    title: "Assets",
                    isExpanded: false,
                    editUrl: "/assets/coborrower-add-assets",
                },
                {
                    title: "Demographics",
                    isExpanded: false,
                    editUrl: "/identity/coborrower-demographics",
                },
            ],
        };
    },

    computed: {
        ...mapState(["borrower", "coborrower", "appTheme"]),

        activeBorrowerSection() {
            return this.borrowerSections.find((sec) => sec.isExpanded);
        },
        activeCoborrowerSection() {
            return this.coborrowerSections.find((sec) => sec.isExpanded);
        },

        borrowerDataView() {
            const { profile, income, about, property, assets, identity } =
                this.borrower;
            switch (this.activeBorrowerSection?.title) {
                case "Profile": {
                    return `
                        <div class="line">
                            <span class="key">Full Name</span>:
                            <span class="value">${profile.firstName} ${profile.lastName}</span>
                        </div>
                        <div class="line">
                            <span class="key">Current Address</span>:
                            <span class="value">
                                ${profile.streetAddress} ${profile.city}, ${profile.state} ${profile.zipcode}
                            </span>
                        </div>
                        <div class="line">
                            <span class="key">Email</span>:
                            <span class="value">${profile.email}</span>
                        </div>
                        <div class="line">
                            <span class="key">Telephone</span>:
                            <span class="value">${profile.phone}</span>
                        </div>
                        <div class="line">
                            <span class="key">DOB</span>:
                            <span class="value">${income.birthDate}</span>
                        </div>
                        <div class="line">
                            <span class="key">Marital Status</span>:
                            <span class="value">${profile.maritalStatus}</span>
                        </div>
                        <div class="line">
                            <span class="key">Number of Dependents</span>:
                            <span class="value">${about.numberOfDependents}</span>
                        </div>
                        <div class="line">
                            <span class="key">Dependent Ages</span>:
                            <span class="value">${about.dependentAges}</span>
                        </div>
                    `;
                }
                case "Addresses": {
                    return `
                        <div class="line">
                            <span class="key">Current Address</span>:
                            <p class="value">
                                ${profile.streetAddress} ${profile.city}, ${
                        profile.state
                    } ${profile.zipcode}
                            </p>
                        </div>
                        ${property.addressHistory
                            .map((address) => {
                                return `
                                    <div class="line">
                                        <span class="key">Previous Address</span>
                                        <p class="value">
                                            ${address.streetAddress} ${profile.city}, ${profile.state} ${profile.zipcode}
                                        </p>
                                    </div>
                                `;
                            })
                            .join("")}
                    `;
                }
                case "Property": {
                    return `
                        <div class="line">
                            <span class="key">Homeownership Goal</span>:
                            <span class="value loanType">${
                                property.loanType
                            }</span>
                        </div>
                        <div class="line">
                            <span class="key">Primary Residence</span>:
                            <span class="value">${
                                property.propertyUse === "primary"
                                    ? "Yes"
                                    : "No"
                            }</span>
                        </div>
                        <div class="line">
                            <span class="key">Property Location</span>:
                            <span class="value">
                                ${property.propertyLocationCity}, ${
                        property.propertyLocationState
                    }
                            </span>
                        </div>
                        ${
                            property.realEstateAgentName != null
                                ? `
                                        <div class="line">
                                            <span class="key">Real Estate Agent</span>:
                                            <span class="value">${property.realEstateAgentName}</span>
                                        </div>
                                    `
                                : ""
                        }

                        <div class="line">
                            <span class="key">Purchase Price</span>:
                            <span class="value">$${
                                property.purchasePrice
                            }</span>
                        </div>
                        <div class="line">
                            <span class="key">Down Payment</span>:
                            <span class="value">$${
                                property.downPaymentAmount
                            }</span>
                        </div>
                    `;
                }
                case "Income": {
                    return `
                        <table>
                            <thead>
                                <tr>
                                    <th>Income Type</th>
                                    <th>Employer Name</th>
                                    <th>Monthly Income</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${income.incomeHistory
                                    .map((incomeObj) => {
                                        return `
                                            <tr>
                                                <td>${incomeObj.incomeType}</td>
                                                <td>${
                                                    incomeObj.employerName ||
                                                    "N/A"
                                                }</td>
                                                <td class="amount">$${
                                                    incomeObj.monthlyIncome ||
                                                    incomeObj.monthlySalary
                                                }</td>
                                            </tr>
                                        `;
                                    })
                                    .join("")}
                            </tbody>
                        </table>
                    `;
                }
                case "Assets": {
                    return `
                        <table>
                            <thead>
                                <tr>
                                    <th>Institution Name</th>
                                    <th>Account Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${assets
                                    .map((asset) => {
                                        return `
                                            <tr>
                                                <td>${asset.institutionName}</td>
                                                <td>${asset.assetType}</td>
                                            </tr>
                                        `;
                                    })
                                    .join("")}
                            </tbody>
                        </table>
                    `;
                }
                case "Demographics": {
                    return `
                        <div class="line">
                            <span class="key">Ethnicity</span>:
                            <span class="value">${
                                identity.demographics.ethnicity
                            }</span>
                        </div>
                        <div class="line">
                            <span class="key">Gender</span>:
                            <span class="value">
                                ${identity.demographics.gender}
                            </span>
                        </div>
                        <div class="line">
                            <span class="key">Race</span>:
                            <span class="value">
                                ${identity.demographics.race
                                    .map((race, index) => {
                                        return `${race}${
                                            index <
                                            identity.demographics.race.length -
                                                1
                                                ? ", "
                                                : ""
                                        }`;
                                    })
                                    .join("")}
                            </span>
                        </div>
                    `;
                }
                case "Notes": {
                    return `
                        <label class="notesHeading" for="appNotes">
                            What else should we know about your application?
                        </label>
                        <textarea name="appNotes" id="appNotes" class="notesTextArea"></textarea>
                    `;
                }
                default:
                    return {};
            }
        },

        coborrowerDataView() {
            const { profile, income, about, property, assets, identity } =
                this.coborrower;
            switch (this.activeCoborrowerSection?.title) {
                case "Profile": {
                    return `
                        <div class="line">
                            <span class="key">Full Name</span>:
                            <span class="value">${profile.firstName} ${profile.lastName}</span>
                        </div>
                        <div class="line">
                            <span class="key">Current Address</span>:
                            <span class="value">
                                ${profile.streetAddress} ${profile.city}, ${profile.state} ${profile.zipcode}
                            </span>
                        </div>
                        <div class="line">
                            <span class="key">Email</span>:
                            <span class="value">${profile.email}</span>
                        </div>
                        <div class="line">
                            <span class="key">Telephone</span>:
                            <span class="value">${profile.phone}</span>
                        </div>
                        <div class="line">
                            <span class="key">DOB</span>:
                            <span class="value">${income.birthDate}</span>
                        </div>
                        <div class="line">
                            <span class="key">Marital Status</span>:
                            <span class="value">${profile.maritalStatus}</span>
                        </div>
                        <div class="line">
                            <span class="key">Number of Dependents</span>:
                            <span class="value">${about.numberOfDependents}</span>
                        </div>
                        <div class="line">
                            <span class="key">Dependent Ages</span>:
                            <span class="value">${about.dependentAges}</span>
                        </div>
                    `;
                }
                case "Addresses": {
                    return `
                        <div class="line">
                            <span class="key">Current Address</span>:
                            <p class="value">
                                ${profile.streetAddress} ${profile.city}, ${
                        profile.state
                    } ${profile.zipcode}
                            </p>
                        </div>
                        ${property.addressHistory
                            .map((address) => {
                                return `
                                    <div class="line">
                                        <span class="key">Previous Address</span>
                                        <p class="value">
                                            ${address.streetAddress} ${profile.city}, ${profile.state} ${profile.zipcode}
                                        </p>
                                    </div>
                                `;
                            })
                            .join("")}
                    `;
                }
                case "Income": {
                    return `
                        <table>
                            <thead>
                                <tr>
                                    <th>Income Type</th>
                                    <th>Employer Name</th>
                                    <th>Monthly Income</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${income.incomeHistory
                                    .map((incomeObj) => {
                                        return `
                                            <tr>
                                                <td>${incomeObj.incomeType}</td>
                                                <td>${
                                                    incomeObj.employerName ||
                                                    "N/A"
                                                }</td>
                                                <td class="amount">$${
                                                    incomeObj.monthlyIncome ||
                                                    incomeObj.monthlySalary
                                                }</td>
                                            </tr>
                                        `;
                                    })
                                    .join("")}
                            </tbody>
                        </table>
                    `;
                }
                case "Assets": {
                    return `
                        <table>
                            <thead>
                                <tr>
                                    <th>Institution Name</th>
                                    <th>Account Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${assets
                                    .map((asset) => {
                                        return `
                                            <tr>
                                                <td>${asset.institutionName}</td>
                                                <td>${asset.assetType}</td>
                                            </tr>
                                        `;
                                    })
                                    .join("")}
                            </tbody>
                        </table>
                    `;
                }
                case "Demographics": {
                    return `
                        <div class="line">
                            <span class="key">Ethnicity</span>:
                            <span class="value">${
                                identity.demographics.ethnicity
                            }</span>
                        </div>
                        <div class="line">
                            <span class="key">Gender</span>:
                            <span class="value">
                                ${identity.demographics.gender}
                            </span>
                        </div>
                        <div class="line">
                            <span class="key">Race</span>:
                            <span class="value">
                                ${identity.demographics.race
                                    .map((race, index) => {
                                        return `${race}${
                                            index <
                                            identity.demographics.race.length -
                                                1
                                                ? ", "
                                                : ""
                                        }`;
                                    })
                                    .join("")}
                            </span>
                        </div>
                    `;
                }
                default:
                    return {};
            }
        },
    },

    methods: {
        toggleBorrowerSection(clickedSection) {
            this.borrowerSections.forEach((sec) => {
                sec.isExpanded = false;
            });
            clickedSection.isExpanded = !clickedSection.isExpanded;
            if (clickedSection.isExpanded) {
                this.borrowerDataIsShowing = true;
            } else {
                this.borrowerDataIsShowing = false;
            }
        },

        toggleCoborrowerSection(clickedSection) {
            this.coborrowerSections.forEach((sec) => {
                sec.isExpanded = false;
            });
            clickedSection.isExpanded = !clickedSection.isExpanded;
            if (clickedSection.isExpanded) {
                this.coborrowerDataIsShowing = true;
            } else {
                this.coborrowerDataIsShowing = false;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.review {
    @include app-background;
}
.pageWrapper {
    width: 600px;
    margin: 0 auto;
}
.boxHeading {
    text-align: left;
    margin-left: 2rem;
    &.coborrower {
        margin-top: 4rem;
    }
}
.review-box {
    position: relative;
    z-index: 99;
    border: 2px solid #fff;
    border-radius: var(--app-border-radius);
    &.coborrower {
        margin-bottom: 14rem;
    }
}

.data-fade-enter-active,
.data-fade-leave-active {
    transition-duration: 1s;
    transition-property: opacity;
    transition-timing-function: ease;
}

.data-fade-enter-from,
.data-fade-leave-active {
    opacity: 0 !important;
}
</style>
