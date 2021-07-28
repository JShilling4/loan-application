<template>
    <app-modal
        width="65rem"
        :show="isShowing"
        :show-close-button="true"
        :clickaway="true"
        background-color="#fff"
        @close="$emit('close')"
    >
        <template v-slot:body>
            <span class="heading">
                {{ profile.firstName }}'s Current Address
            </span>

            <!-- Current Address & Move-in date -->
            <div class="inline-form-group">
                <div class="block col1">
                    <p class="label">Your Current Address:</p>
                    <div class="currentAddress">
                        <p>{{ profile.streetAddress }}</p>
                        <p>
                            {{ profile.city }},
                            {{ profile.state }}
                            {{ profile.zipcode }}
                        </p>
                    </div>
                </div>

                <div class="input-group moveInDate col2">
                    <app-label for="moveInDate">Move In Date</app-label>
                    <text-field
                        type="text"
                        id="moveInDate"
                        placeholder="MM/YYYY"
                        maxlength="7"
                        name="moveInDate"
                        v-model="localProperty.currentAddressInfo.moveInDate"
                    />
                </div>
            </div>

            <!-- Different Mailing Address -->
            <check-box
                label="My mailing address is different than my current address"
                id="hasDifferentMailingAddress"
                class-list="light"
                v-model:checked="hasDifferentMailingAddress"
            />

            <!-- Mailing Address -->
            <div
                v-if="hasDifferentMailingAddress == true"
                class="mailingAddress"
            >
                <div class="inline-form-group">
                    <!-- Street Address -->
                    <div class="col col3_5-4">
                        <app-label theme="light">
                            Street Address
                        </app-label>
                        <text-field v-model="localProfile.streetAddress2" />
                    </div>

                    <div class="gutter-20"></div>

                    <!-- Unit/Apt -->
                    <div class="col col1-4">
                        <app-label theme="light">
                            Unit / Apt
                        </app-label>
                        <text-field v-model="localProfile.apartmentNumber2" />
                    </div>
                </div>

                <div class="inline-form-group">
                    <!-- City -->
                    <div class="col col2-4">
                        <app-label theme="light">
                            City
                        </app-label>
                        <text-field v-model="localProfile.city2" />
                    </div>

                    <div class="gutter-20"></div>

                    <!-- State -->
                    <div class="col col1_5-4">
                        <app-label theme="light">
                            State
                        </app-label>
                        <!-- <v-select
							:options="states"
							:clearable="false"
							class="light"
							:append-to-body="true"
							:reduce="state2 => state2.value"
							v-model="localProfile.state2"
						/> -->
                    </div>

                    <div class="gutter-20"></div>

                    <!-- Zip Code -->
                    <div class="col col1-4">
                        <app-label theme="light">
                            Zipcode
                        </app-label>
                        <text-field v-model="localProfile.zipcode2" />
                    </div>
                </div>
            </div>

            <!-- Property Owner -->
            <div class="inline-form-group ownProperty">
                <p class="label inline col1">
                    Are you the owner of the property?
                </p>

                <div class="radio-group-wrapper col2">
                    <div class="radioButton-container">
                        <radio-button
                            label="Yes"
                            name="propertyOwner"
                            class-list="light"
                            width="100%"
                            v-model="localProperty.currentAddressInfo.propertyOwner"
                        />
                    </div>

                    <div class="radioButton-container">
                        <radio-button
                            label="No"
                            name="propertyOwner"
                            class-list="light"
                            width="100%"
                            v-model="localProperty.currentAddressInfo.propertyOwner"
                        />
                    </div>
                </div>
            </div>

            <!-- Property Plan / Approx value -->
            <div v-if="localProperty.currentAddressInfo.propertyOwner == 'Yes'">
                <!-- Property Plan -->
                <div class="inline-form-group">
                    <div class="label-container col1">
                        <app-label class-list="light">
                            Plan for property after this transaction?
                        </app-label>
                    </div>

                    <div class="inline-input-container col2">
                        <!-- <v-select
							:options="[
								{
									value: 'primary',
									label: 'Primary Property'
								},
								{
									value: 'secondary',
									label: 'Second Home'
								},
								{
									value: 'investment',
									label: 'Investment Property'
								},
								{
									value: 'sell',
									label: 'Sell'
								},
								{
									value: 'move',
									label: 'Move Out'
								}
							]"
							:clearable="false"
							class="light"
							:reduce="propertyPlan => propertyPlan.value"
							v-model="
								localProperty.currentAddressInfo.propertyPlan
							"
						/> -->
                    </div>
                </div>

                <!-- Approx Value -->
                <div class="inline-form-group">
                    <div class="label-container col1">
                        <app-label class-list="light">
                            Approximate property value?
                        </app-label>
                    </div>

                    <div class="col2">
                        <text-field
                            :is-currency="true"
                            theme="light"
                            v-model="localProperty.currentAddressInfo.propertyValue"
                        />
                    </div>
                </div>
            </div>

            <!-- Monthly Rent -->
            <div
                v-if="localProperty.currentAddressInfo.propertyOwner == 'No'"
                class="inline-form-group"
            >
                <div class="label-container col1">
                    <app-label class-list="light">
                        What is your monthly rent amount?
                    </app-label>
                </div>

                <div class="col2">
                    <text-field
                        :is-currency="true"
                        theme="light"
                        v-model="localProperty.currentAddressInfo.monthlyRent"
                    />
                </div>
            </div>

            <div class="button-wrapper">
                <app-button
                    @click="saveLocalData()"
                    :is-posting="isPosting"
                    indicator-type="button"
                >
                    {{ modalAction }}
                </app-button>
            </div>
        </template>
    </app-modal>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "CurrentAddressModal",
    components: {},
    props: {
        isShowing: {
            type: Boolean,
        },
        isPosting: {
            type: Boolean,
        },
        modalAction: {
            type: String,
        },
        profile: {
            type: Object,
        },
        property: {
            type: Object,
        },
    },
    data() {
        return {
            hasDifferentMailingAddress: false,
            localProperty: {},
            localProfile: {},
        };
    },
    computed: {
        ...mapState(["states"]),
    },
    watch: {
        property() {
            this.localProperty = JSON.parse(
                JSON.stringify({ ...this.property })
            );
        },
        profile() {
            this.localProfile = JSON.parse(JSON.stringify({ ...this.profile }));
        },
    },
    methods: {
        saveLocalData() {
            this.$emit("save-profile", this.localProfile);
            this.$emit("save-property", this.localProperty);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/design/scss/_modalContent.scss";

.checkbox-container {
    align-items: center;
}
</style>
