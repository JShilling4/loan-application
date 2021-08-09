<template>
    <div class="addressHistory">
        <page-heading :theme="appTheme">
            Address History
        </page-heading>

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
							borrower.property.currentAddressInfo.moveInDate == null
								? 'Add Current Address Info'
								: 'Add Previous Address'"
                        @click="
							borrower.property.currentAddressInfo
								.moveInDate == null
								? loadAddressModal()
								: loadAddressModal()"
                    />
                </div>

                <view-controls
                    @advance-app="submitPage()"
                    @retreat-app="$router.go(-1)"
                    :local-posting="localDataIsPosting"
                    :theme="appTheme"
                />
            </div>
        </transition>

        <transition name="fade">
            <div
                v-if="localDataIsLoading"
                class="loading-wrapper"
            >
                <loading-indicator />
            </div>
        </transition>

        <current-address-modal
            :is-showing="currentAddressModalShowing"
            :is-posting="localDataIsPosting"
            :modal-action="modalAction"
            @close="closeCurrentAddressModal()"
            :profile="borrower.profile"
            :property="borrower.property"
            @save-property="saveCurrentAddress($event)"
        />

        <previous-address-modal
            :is-showing="previousAddressModalShowing"
            :is-posting="localDataIsPosting"
            :modal-action="modalAction"
            @close="closePreviousAddressModal()"
            :profile="borrower.profile"
            :property="borrower.property"
            :previous-address="selectedPreviousAddress"
            @save-address="savePreviousAddress($event)"
        />
    </div>
</template>

<script>
import property from "@/includes/mixins/application/property";
import addressHistory from "@/includes/mixins/application/addressHistory";
import { deepClone } from "@/includes/mixins/helpers";
import AppTable from "@/components/AppTable.vue";
import AddButton from "@/components/AddButton.vue";
import CurrentAddressModal from "@/components/CurrentAddressModal.vue";
import PreviousAddressModal from "@/components/PreviousAddressModal.vue";

const SECTION_NUMBER = 2;

export default {
    name: "AddressHistory",
    mixins: [property, addressHistory, deepClone],
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
                this.borrower.property?.currentAddressInfo?.moveInDate !==
                null
            ) {
                const currentAddressObj = {
                    streetAddress:
                        this.borrower.profile.streetAddress2 !== null
                            ? this.borrower.profile.streetAddress2
                            : this.borrower.profile.streetAddress,
                    apartmentNumber:
                        this.borrower.profile.aprtmentNumber2 !== null
                            ? this.borrower.profile.apartmentNumber2
                            : this.borrower.profile.apartmentNumber,
                    city:
                        this.borrower.profile.city2 !== null
                            ? this.borrower.profile.city2
                            : this.borrower.profile.city,
                    state:
                        this.borrower.profile.state2 !== null
                            ? this.borrower.profile.state2
                            : this.borrower.profile.state,
                    zipcode:
                        this.borrower.profile.zipcode2 !== null
                            ? this.borrower.profile.zipcode2
                            : this.borrower.profile.zipcode,
                    moveInDate:
                        this.borrower.property?.currentAddressInfo
                            ?.moveInDate,
                    moveOutDate:
                        this.borrower.property?.currentAddressInfo
                            ?.moveOutDate,
                };
                addresses.push(currentAddressObj);
            }

            if (
                this.borrower.property.addressHistory &&
                this.borrower.property?.addressHistory !== null
            ) {
                this.borrower.property.addressHistory.forEach((address) => {
                    addresses.push(address);
                });
            }

            return addresses;
        },

        tableShouldShow() {
            if (
                this.computedAddressHistory?.length > 0 &&
                !this.localDataIsLoading
            ) {
                return true;
            }
            return false;
        },
    },
    methods: {
        loadAddressModal(address = null) {
            if (address !== null) {
                this.modalAction = "Edit";
                if (address.moveOutDate === "Present") {
                    this.openCurrentAddressModal();
                } else {
                    this.selectedPreviousAddress = this.deepClone(address);
                    this.openPreviousAddressModal();
                }
            }
            if (address == null) {
                this.modalAction = "Add";

                if (
                    this.borrower.property.currentAddressInfo.moveInDate ==
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

        async submitPage() {
            if (this.localDataIsPosting == false) {
                // start loader
                this.localDataIsPosting = true;
                // post data
                await this.postBorrowerProperty(this.localAbout);
                // post progress if newly completed
                if (
                    this.sectionProgress.about === null ||
                    this.sectionProgress.about < SECTION_NUMBER
                ) {
                    this.localSectionProgress.about = SECTION_NUMBER;
                    this.postSectionProgress(this.localSectionProgress);
                }
                // next route
                this.$router.push("/property/other-properties");
            }
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
