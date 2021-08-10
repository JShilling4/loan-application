<template>
    <div class="addAssets">
        <page-heading :theme="appTheme">
            Add Assets
        </page-heading>

        <transition name="fade">
            <div
                v-if="!localDataIsLoading"
                class="pageWrapper"
            >
                <span
                    v-if="tableShouldShow"
                    class="tableHeading"
                >{{ borrower.profile.firstName }}'s Assets</span>
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

        <asset-modal
            :is-showing="assetModalShowing"
            :is-posting="localDataIsPosting"
            :modal-action="modalAction"
            @close="closeAssetModal()"
            :profile="borrower.profile"
            :assets="borrower.assets"
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

const SECTION_NUMBER = 1;

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
            if (this.localAssets === null) {
                this.localAssets = [asset];
            } else {
                this.localAssets.push(asset);
            }

            this.localDataIsPosting = true;
            this.postBorrowerAssets(this.localAssets).then(() => {
                this.localAsset = asset;
                this.assetModalShowing = false;
                this.localDataIsPosting = false;
            });
        },

        removeAsset(asset) {
            console.log(asset);
            // TODO: delete address
        },

        async submitPage() {
            if (this.localDataIsPosting == false) {
                // start loader
                this.localDataIsPosting = true;
                // post data
                await this.postBorrowerAssets(this.localAssets);
                // post progress if newly completed
                if (
                    this.sectionProgress.assets === null ||
                    this.sectionProgress.assets < SECTION_NUMBER
                ) {
                    this.localSectionProgress.assets = SECTION_NUMBER;
                    this.postSectionProgress(this.localSectionProgress);
                }
                // next route
                if (this.borrower.about.hasCoborrower) {
                    this.$router.push("/assets/coborrower-add-assets");
                } else {
                    this.$router.push("/identity/declarations");
                }

            }

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
