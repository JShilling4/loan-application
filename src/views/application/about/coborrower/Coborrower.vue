<template>
    <div class="coborrower">
        <page-heading :theme="appTheme">
            Would you like to include a co-borrower?
        </page-heading>

        <div class="choice-container">
            <div class="choice-container">
                <app-button
                    @click="selectIfHasCoborrower('yes')"
                    :class-list="[
						localAbout.hasCoborrower == true
							? 'teal-fill'
							: 'white-outline',
						'choice'
					]"
                >
                    Yes
                </app-button>

                <app-button
                    @click="selectIfHasCoborrower('no')"
                    :class-list="[
						localAbout.hasCoborrower == false
							? 'teal-fill'
							: 'white-outline',
						'choice'
					]"
                >
                    No
                </app-button>
            </div>
        </div>

        <view-controls
            @advance-app="submitPage()"
            @retreat-app="$router.go(-1)"
            :local-posting="localDataIsPosting"
            :theme="appTheme"
        />
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import about from "@/includes/mixins/application/about";

const SECTION_NUMBER = 6;

export default {
    name: "Coborrower",
    mixins: [about],
    methods: {
        ...mapMutations(["SET_APP_LOAD_SECTION_COUNTS"]),

        selectIfHasCoborrower(choice) {
            choice == "yes"
                ? (this.localAbout.hasCoborrower = true)
                : (this.localAbout.hasCoborrower = false);
        },
        async submitPage() {
            if (this.localDataIsPosting == false) {
                // start loader
                this.localDataIsPosting = true;
                // post data
                await this.postBorrowerAbout(this.localAbout);
                // post progress if newly completed
                if (
                    this.sectionProgress.about === null ||
                    this.sectionProgress.about < SECTION_NUMBER
                ) {
                    this.localSectionProgress.about = SECTION_NUMBER;
                    this.postSectionProgress(this.localSectionProgress);
                }
                // next route
                if (this.localAbout.hasCoborrower === true) {
                    // coborrower exists so add coborrower questions to section totals
                    this.SET_APP_LOAD_SECTION_COUNTS(true);
                    this.$router.push("/about/coborrower/info");
                } else {
                    this.$router.push("/property/loan-type");
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.coborrower {
    .choice-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 600px;
        margin: 0 auto;
        .choice {
            margin: 0 1rem 2rem;
            width: 20rem;
        }
    }

    .button-container {
        max-width: 420px;
        margin: 4rem auto 0;
    }
}
</style>
