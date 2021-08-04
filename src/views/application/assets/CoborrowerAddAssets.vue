<template>
    <div class="addAssets">
        <h1 class="appHeading">Add Assets</h1>

        <transition name="fade">
            <div
                v-if="!localDataIsLoading"
                class="pageWrapper"
            >
                <span class="tableHeading">{{ coborrowerData.profile.firstName }}'s Assets</span>
                <transition name="fade">
                    <app-table
                        v-if="tableShouldShow"
                        :columns="tableColumns"
                        :rows="computedAssets"
                        @edit="loadAssetModal"
                    />
                </transition>

                <add-button
                    text="Add Asset"
                    @click="loadAssetModal()"
                />

                <view-controls
                    @advance-app="submitPage()"
                    @retreat-app="$router.go(-1)"
                />
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

        <asset-modal
            :is-showing="assetModalShowing"
            :is-posting="localDataIsPosting"
            :modal-action="modalAction"
            @close="closeAssetModal()"
            :profile="coborrowerData.profile"
            :assets="coborrowerData.assets"
            :asset="selectedAsset"
            @save-asset="saveAsset($event)"
        />
    </div>
</template>

<script>
import assets from "@/includes/mixins/application/assets";
import addAssets from "@/includes/mixins/application/addAssets";
import AddButton from "@/components/AddButton.vue";
import AppTable from "@/components/AppTable.vue";
import AssetModal from "@/components/AssetModal.vue";

export default {
    name: "AddAssets",
    mixins: [assets, addAssets],
    components: {
        "add-button": AddButton,
        "app-table": AppTable,
        "asset-modal": AssetModal,
    },
    data() {
        return {
            tableColumns: [
                {
                    label: "Institution Name",
                    field: "institutionName",
                },
                {
                    label: "Account Type",
                    field: "assetType",
                },
                {
                    label: "Account Value",
                    field: "cashValue",
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
        computedAssets() {
            return this.localAssets !== null ? this.localAssets : null;
        },
        tableShouldShow() {
            if (!this.computedAssets) {
                return false;
            } else if (
                this.computedAssets.length > 0 &&
                !this.localDataIsLoading
            ) {
                return true;
            }
            return false;
        },
    },

    methods: {
        loadAssetModal(asset = null) {
            if (asset !== null) {
                this.modalAction = "Edit";
                this.selectedAsset = this.deepClone(asset);
                this.openAssetModal();
            }

            if (asset == null) {
                this.modalAction = "Add";
                this.selectedAsset = {};
                this.openAssetModal();
            }
        },

        async saveAsset(asset) {
            this.localDataIsPosting = true;
            this.postCoborrowerAssets(asset).then(() => {
                this.localAsset = asset;
                this.assetModalShowing = false;
                this.localDataIsPosting = false;
            });
        },

        removeAsset(asset) {
            console.log(asset);
            // TODO: delete address
        },

        submitPage() {
            this.editSectionProgress(2);
            this.$router.push("/identity/declarations");
        },
    },
};
</script>

<style lang="scss" scoped>
.pageWrapper {
    width: 700px;
    margin: 0 auto;
}
.tableHeading {
    display: block;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 0.5rem;
    text-decoration: underline;
}
</style>

