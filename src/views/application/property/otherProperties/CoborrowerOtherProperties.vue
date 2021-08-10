<template>
    <div class="coborrowerProperties">
        <page-heading :theme="appTheme">
            Coborrower Other Properties
        </page-heading>

        <div class="choice-container">
            <app-button
                @click="selectIfHasOtherProperties('yes')"
                :class-list="[
						localCoborrowerProperty.hasOtherProperties == true
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
						localCoborrowerProperty.hasOtherProperties == false
							? 'teal-fill'
							: 'white-outline',
						'choice'
					]"
            >
                No
            </app-button>
        </div>

        <other-properties-table
            v-if="localCoborrowerProperty.hasOtherProperties == true"
            :other-properties="localCoborrowerProperty.otherProperties"
            :local-data-is-loading="localDataIsLoading"
            @save-property="saveOtherProperty($event)"
        />

        <view-controls
            @advance-app="submitPage()"
            @retreat-app="$router.go(-1)"
            :local-posting="localDataIsPosting"
            :theme="appTheme"
        />
    </div>
</template>

<script>
import property from "@/includes/mixins/application/property";
import otherProperties from "@/includes/mixins/application/otherProperties";
import OtherPropertiesTable from "@/components/OtherPropertiesTable.vue";

const SECTION_NUMBER = 7;

export default {
    name: "CoborrowerOtherProperties",
    mixins: [property, otherProperties],
    components: {
        "other-properties-table": OtherPropertiesTable,
    },
    data() {
        return {
            tableColumns: [
                {
                    label: "Address",
                    field: "streetAddress",
                },
                {
                    label: "Current Use",
                    field: "currentUse",
                },
                {
                    label: "Edit",
                    field: "edit",
                },
                {
                    label: "Delete",
                    field: "delete",
                },
            ],
        };
    },
    methods: {
        selectIfHasOtherProperties(choice) {
            choice == "yes"
                ? (this.localCoborrowerProperty.hasOtherProperties = true)
                : (this.localCoborrowerProperty.hasOtherProperties = false);
        },

        saveOtherProperty(otherProperty) {
            this.localDataIsPosting = true;
            if (this.localCoborrowerProperty.otherProperties === null) {
                this.localCoborrowerProperty.otherProperties = [otherProperty];
            } else {
                this.localCoborrowerProperty.otherProperties.push(otherProperty);
            }
            this.postCoborrowerProperty(this.localCoborrowerProperty).then(() => {
                this.localDataIsPosting = false;
            });
        },

        async submitPage() {
            if (this.localDataIsPosting == false) {
                // start loader
                this.localDataIsPosting = true;
                // post data
                await this.postCoborrowerProperty(this.localCoborrowerProperty);
                // post progress if newly completed
                if (
                    this.sectionProgress.property === null ||
                    this.sectionProgress.property < SECTION_NUMBER
                ) {
                    this.localSectionProgress.property = SECTION_NUMBER;
                    this.postSectionProgress(this.localSectionProgress);
                }
                // next route
                this.$router.push("/income/income-history");
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.coborrowerProperties {
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
