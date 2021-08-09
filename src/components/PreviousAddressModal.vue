<template>
    <app-modal
        width="60rem"
        :show="isShowing"
        :show-close-button="true"
        :clickaway="true"
        background-color="#fff"
        @close="$emit('close')"
    >
        <template v-slot:body>
            <span class="heading">
                {{ profile.firstName }}'s Previous Address
            </span>

            <div class="previousAddress">
                <!-- Move In / Move Out Date -->
                <div class="inline-form-group">
                    <!-- Move In Date -->
                    <div class="input-group">
                        <app-label theme="light">
                            Move In Date
                        </app-label>
                        <text-field theme="light" v-model="localPreviousAddress.moveInDate" />
                    </div>

                    <!-- Move Out Date -->
                    <div class="input-group">
                        <app-label theme="light">
                            Move Out Date
                        </app-label>
                        <text-field theme="light" v-model="localPreviousAddress.moveOutDate" />
                    </div>
                </div>

                <!-- Streed Address / Unit Number -->
                <div class="inline-form-group">
                    <!-- Street Address -->
                    <app-column :c-assign="3.5" :c-total="4">
                        <app-label theme="light">
                            Street Address
                        </app-label>
                        <text-field theme="light" v-model="localPreviousAddress.streetAddress" />
                    </app-column>

                    <h-spacer width="2rem" />

                    <!-- Unit/Apt -->
                    <app-column :c-assign="0.75" :c-total="4">
                        <app-label theme="light">
                            Unit / Apt
                        </app-label>
                        <text-field theme="light" v-model="localPreviousAddress.apartmentNumber" />
                    </app-column>
                </div>

                <!-- City / State / Zipcode -->
                <div class="inline-form-group">
                    <!-- City -->
                    <app-column :c-assign="1.75" :c-total="4">
                        <app-label theme="light">
                            City
                        </app-label>
                        <text-field theme="light" v-model="localPreviousAddress.city" />
                    </app-column>

                    <h-spacer width="2rem" />

                    <!-- State -->
                    <app-column :c-assign="1.5" :c-total="4">
                        <app-label theme="light">
                            State
                        </app-label>
                        <multi-select
                            :options="states"
                            :can-clear="false"
                            class="light"
                            v-model="localPreviousAddress.state"
                        />
                    </app-column>

                    <h-spacer width="2rem" />

                    <!-- Zip Code -->
                    <app-column :c-assign="0.75" :c-total="4">
                        <app-label theme="light">
                            Zipcode
                        </app-label>
                        <text-field theme="light" v-model="localPreviousAddress.zipcode" />
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
                            value="Yes"
                            name="propertyOwner"
                            class-list="light"
                            v-model="localPreviousAddress.propertyOwner"
                        />
                    </div>

                    <div class="radioButton-container">
                        <radio-button
                            label="No"
                            value="No"
                            name="propertyOwner"
                            class-list="light"
                            v-model="localPreviousAddress.propertyOwner"
                        />
                    </div>
                </div>
            </div>

            <div class="button-wrapper">
                <app-button
                    :is-posting="isPosting"
                    indicator-type="button"
                    @click="saveLocalData()"
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
    name: "PreviousAddressModal",
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
        previousAddress: {
            type: Object,
        },
    },
    data() {
        return {
            localPreviousAddress: {},
        };
    },
    computed: {
        ...mapState(["states"]),
    },
    watch: {
        previousAddress() {
            this.localPreviousAddress = this.deepClone(this.previousAddress);
        },
    },
    methods: {
        saveLocalData() {
            this.$emit("save-address", this.localPreviousAddress);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/design/scss/_modalContent.scss";

.previousAddress {
    margin-bottom: 3rem;
    .inline-form-group {
        margin-bottom: 2rem;
    }
}
</style>
