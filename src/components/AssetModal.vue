<template>
    <app-modal
        width="45rem"
        :show="isShowing"
        :show-close-button="true"
        :clickaway="true"
        background-color="#fff"
        @close="$emit('close')"
    >
        <template v-slot:body>
            <span class="heading">
                {{ profile.firstName }}'s Asset
            </span>

            <!-- Asset Type -->
            <div class="input-group">
                <app-label theme="light">
                    Asset Type
                </app-label>
                <text-field
                    theme="light"
                    v-model="localAsset.assetType"
                />
            </div>

            <v-spacer height="2rem" />

            <!-- Institution Name -->
            <div class="input-group">
                <app-label theme="light">
                    Institution Name
                </app-label>
                <text-field
                    theme="light"
                    v-model="localAsset.institutionName"
                />
            </div>

            <v-spacer height="2rem" />

            <!-- Cash Value -->
            <div class="input-group">
                <app-label theme="light">
                    Cash Value
                </app-label>
                <text-field
                    theme="light"
                    v-model="localAsset.cashValue"
                />
            </div>

            <v-spacer height="2rem" />

            <!-- Account Number -->
            <div class="input-group">
                <app-label theme="light">
                    Account Number
                </app-label>
                <text-field
                    theme="light"
                    v-model="localAsset.accountNumber"
                />
            </div>

            <v-spacer height="3rem" />

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
import { deepClone } from "@/includes/mixins/helpers";

export default {
    name: "AssetModal",
    components: {},
    emits: ["save-asset", "close"],
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
        assets: {
            type: Object,
        },
        asset: {
            type: Object,
        },
    },
    data() {
        return {
            localAssets: [],
            localAsset: {},
        };
    },
    computed: {},
    watch: {
        assets() {
            this.localAssets = this.assets;
        },
        asset() {
            this.localAsset = this.deepClone(this.asset);
        },
    },
    methods: {
        saveLocalData() {
            if (this.localAssets === null) {
                this.localAssets = [this.localAsset];
            } else {
                this.localAssets.push(this.localAsset);
            }
            this.$emit("save-asset", this.localAsset);
        },
    },

    mounted() {
        this.localAsset = this.deepClone(this.asset);
    },
};
</script>

<style lang="scss" scoped>
@import "@/design/scss/_modalContent.scss";

.inline-form-group {
    margin-bottom: 0;
}
.input-group {
    margin-bottom: 0;
}
</style>
