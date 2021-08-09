<template>
    <div class="otherProperties">
        <section class="introSection">
            <page-heading :theme="appTheme">
                Do you own other properties?
            </page-heading>

            <div class="choice-container">
                <app-button
                    @click="selectIfHasOtherProperties('yes')"
                    :class-list="[
						localProperty.hasOtherProperties == true
							? 'teal-fill'
							: 'white-outline',
						'choice'
					]"
                >
                    Yes
                </app-button>

                <app-button
                    @click="selectIfHasOtherProperties('no')"
                    :class-list="[
						localProperty.hasOtherProperties == false
							? 'teal-fill'
							: 'white-outline',
						'choice'
					]"
                >
                    No
                </app-button>
            </div>

            <other-properties-table
                v-if="localProperty.hasOtherProperties == true"
                @save-property="saveOtherProperty($event)"
            />

            <view-controls
                @advance-app="submitPage()"
                @retreat-app="$router.go(-1)"
                :local-posting="localDataIsPosting"
                :theme="appTheme"
            />
        </section>
    </div>
</template>

<script>
// mixins
import property from "@/includes/mixins/application/property";
// components
import OtherPropertiesTable from "@/components/OtherPropertiesTable.vue";

const SECTION_NUMBER = 3;

export default {
    name: "OtherProperties",
    components: {
        "other-properties-table": OtherPropertiesTable,
    },
    mixins: [property],

    methods: {
        selectIfHasOtherProperties(choice) {
            choice == "yes"
                ? (this.localProperty.hasOtherProperties = true)
                : (this.localProperty.hasOtherProperties = false);
        },

        saveOtherProperty(otherProperty) {
            this.localDataIsPosting = true;
            if (this.localProperty.otherProperties === null) {
                this.localProperty.otherProperties = [otherProperty];
            } else {
                this.localProperty.otherProperties.push(otherProperty);
            }
            this.postBorrowerProperty(this.localProperty).then(() => {
                this.localDataIsPosting = false;
            });
        },

        async submitPage() {
            if (this.localDataIsPosting == false) {
                // start loader
                this.localDataIsPosting = true;
                // post data
                await this.postBorrowerProperty(this.localProperty);
                // post progress if newly completed
                if (
                    this.sectionProgress.property === null ||
                    this.sectionProgress.property < SECTION_NUMBER
                ) {
                    this.localSectionProgress.property = SECTION_NUMBER;
                    this.postSectionProgress(this.localSectionProgress);
                }
                // next route
                this.$router.push("/property/purchase-info");
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.otherProperties {
    .choice-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 600px;
        margin: 4rem auto 0;
        .choice {
            margin: 0 1rem 2rem;
            width: 20rem;
        }
    }

    .button-container {
        max-width: 440px;
        margin: 4rem auto 0;
    }
}
</style>
