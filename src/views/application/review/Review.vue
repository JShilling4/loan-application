<template>
    <div class="review">
        <page-heading :theme="appTheme">
            Let's review your application!
        </page-heading>

        <div class="pageWrapper">

            <div class="review-box">
                <review-section
                    v-for="(section, index) in sections"
                    :is-expanded="section.isExpanded"
                    :title="section.title"
                    :key="section.name"
                    @click="toggleSection(section)"
                    :class="{ last: index === sections.length - 1 }"
                />

                <transition name="data-fade">
                    <review-section-data
                        :show="dataIsShowing"
                        :activeSection="activeSection"
                        :data="dataViewObject"
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
            dataIsShowing: false,
            sections: [
                {
                    title: "Profile",
                    isExpanded: false,
                    editUrl: "/profile"
                },
                {
                    title: "Addresses",
                    isExpanded: false,
                    editUrl: "/property/address-history"
                },
                {
                    title: "Property",
                    isExpanded: false,
                    editUrl: "/property"
                },
                {
                    title: "Income",
                    isExpanded: false,
                    editUrl: "/income/income-history"
                },
                {
                    title: "Assets",
                    isExpanded: false,
                    editUrl: "/assets/add-assets"
                },
                {
                    title: "Demographics",
                    isExpanded: false,
                    editUrl: "/identity/demographics"
                },
                {
                    title: "Notes",
                    isExpanded: false,
                    editUrl: null,
                },
            ],
        };
    },

    computed: {
        ...mapState(["borrower", "coborrower", "appTheme"]),

        activeSection() {
            return this.sections.find((sec) => sec.isExpanded);
        },

        dataViewObject() {
            const { profile, income, about, property, assets, identity } = this.borrower;
            switch (this.activeSection?.title) {
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
                                ${profile.streetAddress} ${profile.city}, ${profile.state} ${profile.zipcode}
                            </p>
                        </div>
                        ${
                            property.addressHistory.map((address) => {
                                return `
                                    <div class="line">
                                        <span class="key">Previous Address</span>
                                        <p class="value">
                                            ${address.streetAddress} ${profile.city}, ${profile.state} ${profile.zipcode}
                                        </p>
                                    </div>
                                `
                            }).join("")
                        }
                    `;
                }
                case "Property": {
                    return `
                        <div class="line">
                            <span class="key">Homeownership Goal</span>:
                            <span class="value loanType">${property.loanType}</span>
                        </div>
                        <div class="line">
                            <span class="key">Primary Residence</span>:
                            <span class="value">${property.propertyUse === 'primary' ? 'Yes' : 'No'}</span>
                        </div>
                        <div class="line">
                            <span class="key">Property Location</span>:
                            <span class="value">
                                ${property.propertyLocationCity}, ${property.propertyLocationState}
                            </span>
                        </div>
                        ${
                            property.realEstateAgentName != null
                                ?
                                    `
                                        <div class="line">
                                            <span class="key">Real Estate Agent</span>:
                                            <span class="value">${property.realEstateAgentName}</span>
                                        </div>
                                    `
                                :   ""
                        }

                        <div class="line">
                            <span class="key">Purchase Price</span>:
                            <span class="value">$${property.purchasePrice}</span>
                        </div>
                        <div class="line">
                            <span class="key">Down Payment</span>:
                            <span class="value">$${property.downPaymentAmount}</span>
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
                                ${
                                    income.incomeHistory.map((incomeObj) => {
                                        return `
                                            <tr>
                                                <td>${incomeObj.incomeType}</td>
                                                <td>${incomeObj.employerName || "N/A"}</td>
                                                <td class="amount">$${incomeObj.monthlyIncome || incomeObj.monthlySalary}</td>
                                            </tr>
                                        `
                                    }).join("")
                                }
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
                                ${
                                    assets.map((asset) => {
                                        return `
                                            <tr>
                                                <td>${asset.institutionName}</td>
                                                <td>${asset.assetType}</td>
                                            </tr>
                                        `
                                    }).join("")
                                }
                            </tbody>
                        </table>
                    `;
                }
                case "Demographics": {
                    return `
                        <div class="line">
                            <span class="key">Ethnicity</span>:
                            <span class="value">${identity.demographics.ethnicity}</span>
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
                                ${
                                    identity.demographics.race.map((race, index) => {
                                        return `${race}${index < identity.demographics.race.length-1 ? ", " : ""}`
                                    }).join("")
                                }
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
    },

    methods: {
        toggleSection(clickedSection) {
            this.sections.forEach((sec) => {
                sec.isExpanded = false;
            });
            clickedSection.isExpanded = !clickedSection.isExpanded;
            if (clickedSection.isExpanded) {
                this.dataIsShowing = true;
            } else {
                this.dataIsShowing = false;
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

.review-box {
    position: relative;
    border: 2px solid #fff;
    border-radius: var(--app-border-radius);
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
