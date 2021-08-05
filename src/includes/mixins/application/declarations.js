import { mapState } from "vuex";
import QuestionSlider from "@/components/QuestionSlider.vue";

export default {
    components: {
        "question-slider": QuestionSlider,
    },
    data() {
        return {
            activeSet: 1,
            setTotal: 15,
        };
    },
    computed: {
        ...mapState(["borrower", "coborrower"]),
        borrowerProfile() {
            return this.borrowerData.profile;
        },
        coborrowerProfile() {
            return this.coborrowerData.profile;
        },
    },

    methods: {
        goToPreviousPage() {
            this.$router.go(-1);
        },
        goToNextQuestion() {
            if (this.activeSet < this.setTotal) {
                this.activeSet += 1;
            }
        },
        goToPreviousQuestion() {
            if (this.activeSet > 1) {
                this.activeSet -= 1;
            }
        },
    },
};
