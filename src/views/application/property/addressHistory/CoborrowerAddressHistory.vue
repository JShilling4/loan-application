<template>
    <div class="coborrowerAddressHistory">
        <h1 class="appHeading">Co-borrower Address History</h1>

        <transition name="fade">
            <div
                v-if="!localDataIsLoading"
                class="page-wrapper"
            >
                <p class="pageCopy">
                    {{ coborrowerData.profile.firstName }}, once you have
                    entered at least two years of residence history you will be
                    able to move on to the next section of the application.
                </p>

                <!-- Address History Table -->
                <transition name="fade">
                    <app-table
                        v-if="tableShouldShow"
                        :columns="tableColumns"
                        :rows="computedAddressHistory"
                        @edit="loadAddressModal"
                    />
                </transition>

                <!-- Add New Button -->
                <div class="addButton-container">
                    <add-button
                        :text="
							coborrowerData.property.currentAddressInfo
								.moveInDate == null
								? 'Add Current Address Info'
								: 'Add Previous Address'
						"
                        @click="
							coborrowerData.property.currentAddressInfo
								.moveInDate == null
								? loadAddressModal()
								: loadAddressModal()
						"
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
            :profile="coborrowerData.profile"
            :property="coborrowerData.property"
            @save-property="saveCurrentAddress"
        />

        <!-- Previous Address Modal -->
        <previous-address-modal
            :is-showing="previousAddressModalShowing"
            :is-posting="localDataIsPosting"
            :modal-action="modalAction"
            @close="closePreviousAddressModal()"
            :profile="coborrowerData.profile"
            :property="coborrowerData.property"
            :previous-address="selectedPreviousAddress"
            @save-address="savePreviousAddress"
        />
    </div>
</template>

<script>
// mixins
import property from "@/includes/applicationMixins/property";
import addressHistory from "@/includes/applicationMixins/addressHistory";
import AppTable from "@/components/AppTable.vue";
import AddButton from "@/components/AddButton.vue";
import CurrentAddressModal from "@/components/CurrentAddressModal.vue";
import PreviousAddressModal from "@/components/PreviousAddressModal.vue";

export default {
    name: "CoborrowerAddressHistory",
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
                this.coborrowerData.property?.currentAddressInfo?.moveInDate !==
                null
            ) {
                const currentAddressObj = {
                    streetAddress:
                        this.coborrowerData.profile.streetAddress2 !== null
                            ? this.coborrowerData.profile.streetAddress2
                            : this.coborrowerData.profile.streetAddress,
                    apartmentNumber:
                        this.coborrowerData.profile.aprtmentNumber2 !== null
                            ? this.coborrowerData.profile.apartmentNumber2
                            : this.coborrowerData.profile.apartmentNumber,
                    city:
                        this.coborrowerData.profile.city2 !== null
                            ? this.coborrowerData.profile.city2
                            : this.coborrowerData.profile.city,
                    state:
                        this.coborrowerData.profile.state2 !== null
                            ? this.coborrowerData.profile.state2
                            : this.coborrowerData.profile.state,
                    zipcode:
                        this.coborrowerData.profile.zipcode2 !== null
                            ? this.coborrowerData.profile.zipcode2
                            : this.coborrowerData.profile.zipcode,
                    moveInDate:
                        this.coborrowerData.property?.currentAddressInfo
                            ?.moveInDate,
                    moveOutDate:
                        this.coborrowerData.property?.currentAddressInfo
                            ?.moveOutDate,
                };
                addresses.push(currentAddressObj);
            }

            if (
                this.coborrowerData.property.addressHistory &&
                this.coborrowerData.property?.addressHistory !== null
            ) {
                this.coborrowerData.property.addressHistory.forEach(
                    (address) => {
                        addresses.push(address);
                    }
                );
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
                    this.coborrowerData.property.currentAddressInfo
                        .moveInDate == null
                ) {
                    this.openCurrentAddressModal();
                } else {
                    this.openPreviousAddressModal();
                }
            }
        },

        saveCurrentAddress(address) {
            this.localDataIsPosting = true;
            this.postCoborrowerProperty(address).then(() => {
                this.currentAddressModalShowing = false;
                this.localDataIsPosting = false;
            });
        },

        savePreviousAddress(address) {
            this.localDataIsPosting = true;
            this.postCoborrowerProperty(address).then(() => {
                this.previousAddressModalShowing = false;
                this.localDataIsPosting = false;
            });
        },

        submitPage() {
            this.editSectionProgress(3);
            this.$router.push("/property/other-properties");
        },
    },
};
</script>

<style lang="scss" scoped>
.coborrowerAddressHistory {
    .page-wrapper {
        max-width: 700px;
        margin: 0 auto;
    }
    .pageCopy {
        width: 80%;
        margin: 0 auto 3rem;
    }
}
</style>
