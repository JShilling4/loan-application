export default {
    data() {
        return {
            assetModalShowing: false,
            selectedAsset: {},
            modalAction: "Add",
            localDataIsPosting: false,
        };
    },
    methods: {
        openAssetModal() {
            this.assetModalShowing = true;
        },

        closeAssetModal() {
            this.selectedAsset = {};
            this.assetModalShowing = false;
        },
    },
};
