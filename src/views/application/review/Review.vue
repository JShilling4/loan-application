<template>
    <div class="review">
        <h1 class="appHeading">Let's review your application!</h1>
        <div class="pageWrapper">

            <div class="review-box">
                <section-container
                    v-for="(section, index) in sections"
                    :is-expanded="section.isExpanded"
                    :title="section.title"
                    :key="section.name"
                    @click="toggleSection(section)"
                    :class="{ last: index === sections.length - 1 }"
                />

                <transition name="data-fade">
                    <section-data
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
import SectionDataReview from "@/components/SectionDataReview.vue";

export default {
    name: "Review",

    components: {
        "section-container": ReviewSection,
        "section-data": SectionDataReview,
    },

    data() {
        return {
            dataIsShowing: false,
            sections: [
                {
                    title: "Profile",
                    isExpanded: false,
                },
                {
                    title: "Property",
                    isExpanded: false,
                },
                {
                    title: "Income",
                    isExpanded: false,
                },
                {
                    title: "Assets",
                    isExpanded: false,
                },
                {
                    title: "Declarations",
                    isExpanded: false,
                },
                {
                    title: "Demographics",
                    isExpanded: false,
                },
                {
                    title: "Notes",
                    isExpanded: false,
                },
            ],
        };
    },

    computed: {
        ...mapState(["borrower", "coborrower"]),

        activeSection() {
            return this.sections.find((sec) => sec.isExpanded);
        },
        borrowerData() {
            return this.borrower.borrower;
        },
        dataViewObject() {
            switch(this.activeSection?.title) {
                case "Profile": {
                    const { profile, income, about } = this.borrowerData;
                    return {
                        "Full Name": `${profile.firstName} ${profile.lastName}`,
                        "Current Address": profile.streetAddress,
                        "Email": profile.email,
                        "Telephone": profile.phone,
                        "DOB": income.birthDate,
                        "Marital Status": profile.maritalStatus,
                        "Number of Dependents": about.numberOfDependents,
                        "Dependent Ages": about.dependentAges
                    }
                }
                case "Property": {
                    return {
                        "Homeownership Goal": "",
                        "Primary Residence": "",
                        "Property Location": "",
                        "Real Estate Agent": "",
                        "Purchase Price": "",
                        "Down Payment": ""
                    }
                }
                default: return {};
            }
        }
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
