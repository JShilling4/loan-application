<template>
    <div class="creditCheck">
        <h1 class="appHeading">Credit Check</h1>
        <form class="pageForm">
            <p class="pageCopy">
                To qualify for a mortgage, we will have to check your credit.
                This information is required for all mortgage transactions.
                Don't worry, we have taken steps to ensure your personal
                information stays private.
            </p>

            <div class="learnMore-container">
                <learn-more-link
                    @click="vimeoModalShowing = true"
                    class-list="dark"
                />
            </div>

            <!-- Borrower Inputs -->
            <p class="formCopy">
                {{ borrowerData.profile.firstName }}, please provide your social
                security number and date of birth.
            </p>

            <fieldset class="inline-form-group">
                <!-- SSN -->
                <div class="input-group">
                    <app-label
                        for="ssn"
                        class-list="dark"
                    >
                        Social Security Number
                    </app-label>
                    <text-field
                        type="text"
                        id="ssn"
                        class-list="dark"
                        v-model="localIncome.ssn"
                        placeholder="###-##-####"
                    />
                </div>
                <!-- DOB -->
                <div class="input-group">
                    <app-label
                        for="dob"
                        class-list="dark"
                    >
                        Date of Birth
                    </app-label>
                    <text-field
                        type="text"
                        id="dob"
                        class-list="dark"
                        v-model="localIncome.birthDate"
                        placeholder="MM/DD/YYYY"
                    />
                </div>
            </fieldset>

            <!-- Coborrower Inputs -->
            <p class="formCopy">
                {{ coborrowerData.profile.firstName }}, please provide your
                social security number and date of birth.
            </p>

            <fieldset class="inline-form-group">
                <!-- SSN -->
                <div class="input-group">
                    <app-label
                        for="ssn"
                        class-list="dark"
                    >
                        Social Security Number
                    </app-label>
                    <text-field
                        type="text"
                        id="ssn"
                        class-list="dark"
                        v-model="localCoborrowerIncome.ssn"
                        placeholder="###-##-####"
                    />
                </div>
                <!-- DOB -->
                <div class="input-group">
                    <app-label
                        for="dob"
                        class-list="dark"
                    >Date of Birth</app-label>
                    <text-field
                        type="text"
                        id="dob"
                        v-model="localCoborrowerIncome.birthDate"
                        placeholder="MM/DD/YYYY"
                    />
                </div>
            </fieldset>

            <div class="auth-container">
                <check-box
                    label="I authorize Ruoff Mortgage to verify the
						credit, employment and income history of all borrowers in this mortgage
						application. After completing this application, you will be able to view
						your current credit scores from the three major credit bureaus, as well
						as view the information about your employment including an income
						history."
                    v-model:checked="localIncome.creditCheckAuthorized"
                    id="creditCheckAuth"
                />
            </div>

            <view-controls @next-view="submitPage()" />
        </form>

        <app-modal
            ref="vimeoModal"
            width="70rem"
            :show="vimeoModalShowing"
            :show-close-button="true"
            :clickaway="true"
            background-color="transparent"
            @close="vimeoModalShowing = false"
        >
            <template v-slot:body>
                <vimeo-player
                    ref="player"
                    video-url="https://player.vimeo.com/video/424804739"
                    height="500"
                    @ready="onReady"
                    :events-to-emit="['play', 'pause']"
                ></vimeo-player>
            </template>
        </app-modal>
    </div>
</template>

<script>
import income from "@/includes/mixins/application/income";
import { vueVimeoPlayer } from "vue-vimeo-player";
import LearnMoreLink from "@/components/LearnMoreLink.vue";

export default {
    name: "CreditCheck",
    mixins: [income],
    components: {
        "learn-more-link": LearnMoreLink,
        "vimeo-player": vueVimeoPlayer,
    },
    data() {
        return {
            vimeoModalShowing: false,
        };
    },
    methods: {
        onReady() {
            this.playerReady = true;
        },
        play() {
            this.$refs.player.play();
        },
        pause() {
            this.$refs.player.pause();
        },
        submitPage() {
            if (this.borrowerData.about.hasCoborrower === true) {
                this.editSectionProgress(3);
            } else {
                this.editSectionProgress(2);
            }
            this.$router.push("/assets/entry-options");
        },
    },
};
</script>

<style lang="scss" scoped>
.creditCheck {
    .learnMore-container {
        margin: 2rem 0 4rem;
        text-align: center;
    }

    fieldset {
        max-width: 40rem;
        margin: 0 auto 3rem;
    }

    .formCopy {
        margin-bottom: 2rem;
        text-align: center;
        color: #fff;
    }

    .auth-container {
        color: #fff;
    }
}
</style>
