<template>
    <div class="addressHistory">
        <h1 class="appHeading">Address History</h1>

        <transition name="fade">
            <div
                v-if="!localDataIsLoading"
                class="page-wrapper"
            >
                <p class="pageCopy">
                    Once you have entered at least two years of residence
                    history you will be able to move on to the next section of
                    the application.
                </p>

                <!-- Table -->
                <transition name="fade">
                    <app-table
                        v-if="tableShouldShow"
                        :columns="tableColumns"
                        :rows="computedAddressHistory"
                        @edit="loadAddressModal"
                        @delete="removeAddress"
                    />
                </transition>

                <!-- Add New Button -->
                <div class="addButton-container">
                    <add-button
                        :text="
							borrowerData.property.currentAddressInfo.moveInDate == null
								? 'Add Current Address Info'
								: 'Add Previous Address'"
                        @click="
							borrowerData.property.currentAddressInfo
								.moveInDate == null
								? loadAddressModal()
								: loadAddressModal()"
                    />
                </div>

                <view-controls @next-view="submitPage()" />
            </div>
        </transition>

        <transition name="fadeIn">
            <div
                v-if="localDataIsLoading"
                class="loading-wrapper"
            >
                <loading-indicator />
            </div>
        </transition>

        <!-- Current Address Modal -->
        <current-address-modal
            :is-showing="currentAddressModalShowing"
            :is-posting="localDataIsPosting"
            :modal-action="modalAction"
            @close="closeCurrentAddressModal()"
            :profile="borrowerData.profile"
            :property="borrowerData.property"
            @save-property="saveCurrentAddress"
        />

        <!-- Previous Address Modal -->
        <previous-address-modal
            :is-showing="previousAddressModalShowing"
            :is-posting="localDataIsPosting"
            :modal-action="modalAction"
            @close="closePreviousAddressModal()"
            :profile="borrowerData.profile"
            :property="borrowerData.property"
            :previous-address="selectedPreviousAddress"
            @save-address="savePreviousAddress"
        />
    </div>
</template>

<script>
import property from "@/includes/mixins/application/property";
import addressHistory from "@/includes/mixins/application/addressHistory";
import AppTable from "@/components/AppTable.vue";
import AddButton from "@/components/AddButton.vue";
import CurrentAddressModal from "@/components/CurrentAddressModal.vue";
import PreviousAddressModal from "@/components/PreviousAddressModal.vue";

export default {
    name: "AddressHistory",
    mixins: [property, addressHistory],
    components: {
        "app-table": AppTable,
        "add-button": AddButton,
        "current-address-modal": CurrentAddressModal,
        "previous-address-modal": PreviousAddressModal,
    },
    data() {
        return {
            tableColumns: [
                {
                    label: "Address",
                    field: "streetAddress",
                },
                {
                    label: "Move In",
                    field: "moveInDate",
                },
                {
                    label: "Move Out",
                    field: "moveOutDate",
                },
                {
                    label: "Edit",
                    field: "edit",
                    thClass: "center",
                    tdClass: "center",
                },
                {
                    label: "Delete",
                    field: "delete",
                    thClass: "center",
                    tdClass: "center",
                },
            ],
        };
    },
    computed: {
        computedAddressHistory() {
            const addresses = [];
            if (
                this.borrowerData.property?.currentAddressInfo?.moveInDate !==
                null
            ) {
                const currentAddressObj = {
                    streetAddress:
                        this.borrowerData.profile.streetAddress2 !== null
                            ? this.borrowerData.profile.streetAddress2
                            : this.borrowerData.profile.streetAddress,
                    apartmentNumber:
                        this.borrowerData.profile.aprtmentNumber2 !== null
                            ? this.borrowerData.profile.apartmentNumber2
                            : this.borrowerData.profile.apartmentNumber,
                    city:
                        this.borrowerData.profile.city2 !== null
                            ? this.borrowerData.profile.city2
                            : this.borrowerData.profile.city,
                    state:
                        this.borrowerData.profile.state2 !== null
                            ? this.borrowerData.profile.state2
                            : this.borrowerData.profile.state,
                    zipcode:
                        this.borrowerData.profile.zipcode2 !== null
                            ? this.borrowerData.profile.zipcode2
                            : this.borrowerData.profile.zipcode,
                    moveInDate:
                        this.borrowerData.property?.currentAddressInfo
                            ?.moveInDate,
                    moveOutDate:
                        this.borrowerData.property?.currentAddressInfo
                            ?.moveOutDate,
                };
                addresses.push(currentAddressObj);
            }

            if (
                this.borrowerData.property.addressHistory &&
                this.borrowerData.property?.addressHistory !== null
            ) {
                this.borrowerData.property.addressHistory.forEach((address) => {
                    addresses.push(address);
                });
            }

            return addresses;
        },

        tableShouldShow() {
            if (
                this.computedAddressHistory.length > 0 &&
                !this.localDataIsLoading
            ) {
                return true;
            }
            return false;
        },
    },
    methods: {
        submitPage() {
            this.editSectionProgress(2);
            if (this.borrowerData.about.hasCoborrower == true) {
                this.$router.push("/property/coborrower-address-history");
            } else {
                this.$router.push("/property/other-properties");
            }
        },

        loadAddressModal(address = null) {
            if (address !== null) {
                this.modalAction = "Edit";
                if (address.moveOutDate === "Present") {
                    this.openCurrentAddressModal();
                } else {
                    this.selectedPreviousAddress = JSON.parse(
                        JSON.stringify({ ...address })
                    );
                    this.openPreviousAddressModal();
                }
            }
            if (address == null) {
                this.modalAction = "Add";

                if (
                    this.borrowerData.property.currentAddressInfo.moveInDate ==
                    null
                ) {
                    this.openCurrentAddressModal();
                } else {
                    this.selectedPreviousAddress.id = null;
                    this.openPreviousAddressModal();
                }
            }
        },

        async saveCurrentAddress(address) {
            this.localDataIsPosting = true;
            this.postBorrowerProperty(address).then(() => {
                this.localProperty = address;
                this.currentAddressModalShowing = false;
                this.localDataIsPosting = false;
            });
        },

        async savePreviousAddress(address) {
            this.localDataIsPosting = true;
            this.postBorrowerProperty(address).then(() => {
                this.localProperty = address;
                this.previousAddressModalShowing = false;
                this.localDataIsPosting = false;
            });
        },

        removeAddress(address) {
            console.log(address);
            // TODO: delete address
        },
    },
};
</script>

<style lang="scss" scoped>
.addressHistory {
    .page-wrapper {
        max-width: 700px;
        margin: 0 auto;
        padding-bottom: 6rem;
    }

    .pageCopy {
        width: 80%;
        margin: 0 auto 3rem;
    }

    .currentAddressModal,
    .previousAddressModal {
        .heading {
            margin-bottom: 4rem;
            text-align: center;
            color: var(--teal-hc);
            font-weight: 600;
            font-size: 2.2rem;
        }
        p.label {
            margin-bottom: 0.5rem;
            font-size: 15px;
            color: var(--blue-dark);

            &.inline {
                margin-bottom: 0;
            }
        }
        .inline-form-group,
        .checkbox-container {
            margin-bottom: 4rem;
            align-items: center;
        }
        .col1,
        .col2 {
            width: 50%;
        }
        .radio-group-wrapper {
            display: flex;
        }
        .currentAddress {
            color: var(--teal-hc);
            line-height: 1.5;
            margin-right: 6rem;
        }
        .mailingAddress {
            .inline-form-group:not(:last-child) {
                margin-bottom: 2rem;
            }
        }
        .col {
            &3-4 {
                width: 75%;
            }
            &3_5-4 {
                width: 87.5%;
            }
            &2-4 {
                width: 50%;
            }
            &1-4 {
                width: 25%;
            }
            &1_5-4 {
                width: 37.5%;
            }
        }
        .gutter-20 {
            width: 2rem;
        }
        .gutter-30 {
            width: 3rem;
        }
        .button-wrapper {
            margin-top: 3rem;
        }
    }
}
</style>
