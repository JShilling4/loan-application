<template>
    <div class="coborrowerAddressHistory">
        <page-heading :theme="appTheme">
            Coborrower Address History
        </page-heading>

        <transition name="fade">
            <div
                v-if="!localDataIsLoading"
                class="page-wrapper"
            >
                <p class="pageCopy">
                    {{ coborrower.profile.firstName }}, once you have
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
							coborrower.property.currentAddressInfo
								.moveInDate == null
								? 'Add Current Address Info'
								: 'Add Previous Address'"
                        @click="
							coborrower.property.currentAddressInfo
								.moveInDate == null
								? loadAddressModal()
								: loadAddressModal()"
                    />
                </div>

                <view-controls @advance-app="submitPage()" @retreat-app="$router.go(-1)" />
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

        <!-- Current Address Modal -->
        <current-address-modal
            :is-showing="currentAddressModalShowing"
            :is-posting="localDataIsPosting"
            :modal-action="modalAction"
            @close="closeCurrentAddressModal()"
            :profile="coborrower.profile"
            :property="coborrower.property"
            @save-property="saveCurrentAddress"
        />

        <!-- Previous Address Modal -->
        <previous-address-modal
            :is-showing="previousAddressModalShowing"
            :is-posting="localDataIsPosting"
            :modal-action="modalAction"
            @close="closePreviousAddressModal()"
            :profile="coborrower.profile"
            :property="coborrower.property"
            :previous-address="selectedPreviousAddress"
            @save-address="savePreviousAddress"
        />
    </div>
</template>

<script>
// mixins
import property from "@/includes/mixins/application/property";
import addressHistory from "@/includes/mixins/application/addressHistory";
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
                this.coborrower.property?.currentAddressInfo?.moveInDate !==
                null
            ) {
                const currentAddressObj = {
                    streetAddress:
                        this.coborrower.profile.streetAddress2 !== null
                            ? this.coborrower.profile.streetAddress2
                            : this.coborrower.profile.streetAddress,
                    apartmentNumber:
                        this.coborrower.profile.aprtmentNumber2 !== null
                            ? this.coborrower.profile.apartmentNumber2
                            : this.coborrower.profile.apartmentNumber,
                    city:
                        this.coborrower.profile.city2 !== null
                            ? this.coborrower.profile.city2
                            : this.coborrower.profile.city,
                    state:
                        this.coborrower.profile.state2 !== null
                            ? this.coborrower.profile.state2
                            : this.coborrower.profile.state,
                    zipcode:
                        this.coborrower.profile.zipcode2 !== null
                            ? this.coborrower.profile.zipcode2
                            : this.coborrower.profile.zipcode,
                    moveInDate:
                        this.coborrower.property?.currentAddressInfo
                            ?.moveInDate,
                    moveOutDate:
                        this.coborrower.property?.currentAddressInfo
                            ?.moveOutDate,
                };
                addresses.push(currentAddressObj);
            }

            if (
                this.coborrower.property.addressHistory &&
                this.coborrower.property?.addressHistory !== null
            ) {
                this.coborrower.property.addressHistory.forEach(
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
                    this.coborrower.property.currentAddressInfo
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
