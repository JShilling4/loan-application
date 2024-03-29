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
            <span class="heading"> {{ modalAction }} Property </span>

            <!-- Mailing Address -->
            <div class="mailingAddress">
                <div class="inline-form-group">
                    <!-- Street Address -->
                    <app-column
                        :c-assign="3.15"
                        :c-total="4"
                    >
                        <app-label theme="light">
                            Street Address
                        </app-label>
                        <text-field
                            theme="light"
                            name="streetAddress"
                            v-model="localOtherProperty.streetAddress"
                        />
                    </app-column>

                    <h-spacer width="2rem" />

                    <!-- Unit/Apt -->
                    <app-column
                        :c-assign=".85"
                        :c-total="4"
                    >
                        <app-label theme="light">
                            Unit / Apt
                        </app-label>
                        <text-field
                            theme="light"
                            v-model="localOtherProperty.apartmentNumber"
                        />
                    </app-column>
                </div>

                <div class="inline-form-group">
                    <!-- City -->
                    <app-column
                        :c-assign="2"
                        :c-total="4"
                    >
                        <app-label theme="light">City</app-label>
                        <text-field
                            theme="light"
                            name="city"
                            v-model="localOtherProperty.city"
                        />
                    </app-column>

                    <h-spacer width="2rem" />

                    <!-- State -->
                    <app-column
                        :c-assign="1.5"
                        :c-total="4"
                    >
                        <app-label theme="light">
                            State
                        </app-label>
                        <multi-select
                            :options="states"
                            :can-clear="false"
                            class="light"
                            v-model="localOtherProperty.state"
                        />
                    </app-column>

                    <h-spacer width="2rem" />

                    <!-- Zip Code -->
                    <app-column
                        :c-assign="1"
                        :c-total="4"
                    >
                        <app-label theme="light">
                            Zipcode
                        </app-label>
                        <text-field
                            theme="light"
                            name="zipcode"
                            v-model="localOtherProperty.zipcode"
                        />
                    </app-column>
                </div>
            </div>

            <!-- Mortgage Type / Property Plan -->
            <div class="inline-form-group">
                <!-- Mortgage Type -->
                <div class="input-group">
                    <app-label theme="light">
                        Type of Mortgage
                    </app-label>

                    <multi-select
                        :options="[
							{
								value: 'Conventional',
								label: 'Conventional'
							},
							{
								value: 'FHA',
								label: 'FHA'
							},
							{
								value: 'VA',
								label: 'VA'
							},
							{
								value: 'USDA',
								label: 'USDA'
							},
							{
								value: 'None',
								label: 'None'
							}
						]"
                        :can-clear="false"
                        class="light"
                        v-model="localOtherProperty.mortgageType"
                    />
                </div>

                <!-- Property Plan -->
                <div class="input-group">
                    <app-label theme="light">
                        Plan for property
                    </app-label>

                    <multi-select
                        :options="[
							{
								value: 'Pending Sale',
								label: 'Pending Sale'
							},
							{
								value: 'Refinance',
								label: 'Refinance'
							},
							{
								value: 'Rental',
								label: 'Rental'
							},
							{
								value: 'None',
								label: 'None'
							}
						]"
                        :can-clear="false"
                        class="light"
                        v-model="localOtherProperty.propertyPlan"
                    />
                </div>
            </div>

            <!-- Current Usage / Approx Value -->
            <div class="inline-form-group">
                <!-- Current Usage -->
                <div class="input-group">
                    <app-label theme="light">
                        Current Usage
                    </app-label>

                    <multi-select
                        :options="[
							{
								value: 'Primary Residence',
								label: 'Primary Residence'
							},
							{
								value: 'Secondary Residence',
								label: 'Secondary Residence'
							},
							{
								value: 'Investment Property',
								label: 'Investment Property'
							}
						]"
                        :can-clear="false"
                        class="light"
                        v-model="localOtherProperty.currentUse"
                    />
                </div>

                <!-- Approximate Value -->
                <div class="input-group">
                    <app-label theme="light">
                        Approximate Value?
                    </app-label>

                    <text-field
                        :is-currency="true"
                        theme="light"
                        v-model="localOtherProperty.approximateValue"
                    />
                </div>
            </div>

            <div class="button-wrapper">
                <app-button @click="saveLocalData()">
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
    name: "PropertiesModal",
    mixins: [deepClone],

    props: {
        isShowing: {
            type: Boolean,
        },
        modalAction: {
            type: String,
        },
        otherProperty: {
            type: Object,
        },
    },

    data() {
        return {
            localOtherProperty: {},
        };
    },

    computed: {
        ...mapState(["states"]),
    },

    watch: {
        otherProperty() {
            this.localOtherProperty = this.deepClone(this.otherProperty);
        },
    },
    methods: {
        saveLocalData() {
            this.$emit("save-property", this.localOtherProperty);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/design/scss/_modalContent.scss";
</style>
