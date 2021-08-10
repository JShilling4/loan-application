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
                    <app-label
                        theme="light"
                        for="moveInDate"
                    >Move In Date</app-label>
                    <text-field
                        type="text"
                        id="moveInDate"
                        theme="light"
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
                    <app-column
                        :c-assign="3.25"
                        :c-total="4"
                    >
                        <app-label
                            theme="light"
                            for="streetAddress"
                        >
                            Street Address
                        </app-label>
                        <text-field
                            theme="light"
                            v-model="localProfile.streetAddress2"
                            id="streetAddress"
                            name="streetAddress"
                        />
                    </app-column>

                    <h-spacer width="2rem" />

                    <!-- Unit/Apt -->
                    <app-column
                        :c-assign="0.75"
                        :c-total="4"
                    >
                        <app-label
                            theme="light"
                            for="unitNumber"
                        >
                            Unit / Apt
                        </app-label>
                        <text-field
                            theme="light"
                            v-model="localProfile.apartmentNumber2"
                            id="unitNumber"
                            name="unitNumber"
                        />
                    </app-column>
                </div>

                <div class="inline-form-group">
                    <!-- City -->
                    <app-column
                        :c-assign="1.86"
                        :c-total="4"
                    >
                        <app-label
                            theme="light"
                            for="city"
                        >
                            City
                        </app-label>
                        <text-field
                            theme="light"
                            v-model="localProfile.city2"
                            id="city"
                            name="city"
                        />
                    </app-column>

                    <h-spacer width="2rem" />

                    <!-- State -->
                    <app-column
                        :c-assign="1.35"
                        :c-total="4"
                    >
                        <app-label theme="light">
                            State
                        </app-label>
                        <multi-select
                            :options="states"
                            :can-clear="false"
                            class="light"
                            v-model="localProfile.state2"
                        />
                    </app-column>

                    <h-spacer width="2rem" />

                    <!-- Zip Code -->
                    <app-column
                        :c-assign="0.79"
                        :c-total="4"
                    >
                        <app-label
                            theme="light"
                            for="zipcode"
                        >
                            Zipcode
                        </app-label>
                        <text-field
                            theme="light"
                            v-model="localProfile.zipcode2"
                            id="zipcode"
                            name="zipcode"
                        />
                    </app-column>
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
                    <app-column
                        :c-assign="2"
                        :c-total="4"
                    >
                        <app-label theme="light">
                            Plan for property after this transaction?
                        </app-label>
                    </app-column>
                    <h-spacer width="2rem" />
                    <app-column
                        :c-assign="2"
                        :c-total="4"
                    >
                        <multi-select
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
                            :can-clear="false"
                            class="multiselect light"
                            v-model="localProperty.currentAddressInfo.propertyPlan"
                        />
                    </app-column>
                </div>

                <!-- Approx Value -->
                <div class="inline-form-group">
                    <app-column
                        :c-assign="2"
                        :c-total="4"
                    >
                        <app-label theme="light">
                            Approximate property value?
                        </app-label>
                    </app-column>
                    <h-spacer width="2rem" />
                    <app-column
                        :c-assign="2"
                        :c-total="4"
                    >
                        <text-field
                            :is-currency="true"
                            theme="light"
                            v-model="localProperty.currentAddressInfo.propertyValue"
                        />
                    </app-column>
                </div>
            </div>

            <!-- Monthly Rent -->
            <div
                v-if="localProperty.currentAddressInfo.propertyOwner == 'No'"
                class="inline-form-group"
            >
                <app-column
                    :c-assign="2"
                    :c-total="4"
                >
                    <app-label theme="light">
                        What is your monthly rent amount?
                    </app-label>
                </app-column>
                <app-column
                    :c-assign="2"
                    :c-total="4"
                >
                    <text-field
                        :is-currency="true"
                        theme="light"
                        v-model="localProperty.currentAddressInfo.monthlyRent"
                    />
                </app-column>
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
import { deepClone } from "@/includes/mixins/helpers";

export default {
    name: "CurrentAddressModal",
    components: {},
    mixins: [deepClone],
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
            this.localProperty = this.deepClone(this.property);
        },
        profile() {
            this.localProfile = this.deepClone(this.profile);
        },
    },
    methods: {
        saveLocalData() {
            this.$emit("save-profile", this.localProfile);
            this.$emit("save-property", this.localProperty);
        },
    },

    mounted() {
        this.localProperty = this.deepClone(this.property);
        this.localProfile = this.deepClone(this.profile);
    },
};
</script>

<style lang="scss" scoped>
@import "@/design/scss/_modalContent.scss";

.checkbox-container {
    align-items: center;
}
</style>
