export default {
    data() {
        return {
            incomeDetailsModalShowing: false,
            selectedIncomeDetails: {},
            modalAction: "Add",
            localDataIsPosting: false,
        };
    },
    methods: {
        openIncomeModal() {
            this.incomeDetailsModalShowing = true;
        },

        closeIncomeModal() {
            this.selectedIncomeDetails = {};
            this.incomeDetailsModalShowing = false;
        },
    },
};
