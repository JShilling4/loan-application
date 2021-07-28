<template>
    <div class="index">
        <div class="login-half">
            <div class="main-content">
                <h1 class="heading">
                    Welcome to our digital Loan Butler!
                </h1>
                <p class="copy">
                    We have incorporated speed, excellence, and a focus on
                    customer relationships into our simple and easy-to-use
                    application.
                </p>

                <learn-more-link @click="vimeoModalShowing = true" />

                <!-- Login  -->
                <div class="stacked-button-container">
                    <app-button
                        @click="$router.push('/profile')"
                        class-list="orange-fill beginButton"
                    >
                        Let's Begin
                    </app-button>

                    <app-button
                        @click="$router.push('/login')"
                        class-list="blueGreen-outline loginButton"
                    >
                        Log In
                    </app-button>
                </div>
            </div>
        </div>

        <div class="feature-half">
            <div class="feature-list">
                <div class="feature-container">
                    <img
                        class="image"
                        src="@/assets/images/speed.png"
                        alt="stopwatch icon"
                    />
                    <div class="feature-text">
                        <h3 class="heading">Quick</h3>
                        <p class="copy">
                            Our exclusive online loan technology gives you
                            access to apply for home financing with a few simple
                            clicks and keeps you in the loop along the way.
                        </p>
                    </div>
                </div>

                <div class="feature-container">
                    <img
                        class="image"
                        src="@/assets/images/convenience.png"
                        alt="document icon"
                    />
                    <div class="feature-text">
                        <h3 class="heading">Convenient</h3>
                        <p class="copy">
                            Initiate a credit check, review your scores,
                            digitally verify your employment information, and
                            seamlessly upload documents from any computer or
                            mobile device.
                        </p>
                    </div>
                </div>

                <div class="feature-container">
                    <img
                        class="image"
                        src="@/assets/images/secure.png"
                        alt="lock icon"
                    />
                    <div class="feature-text">
                        <h3 class="heading">Secure</h3>
                        <p class="copy">
                            Our custom platform is encrypted, certified, and
                            secure – which means your important information is
                            safe with us!
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <app-modal
            class="vimeoModal"
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
                    video-url="https://player.vimeo.com/video/424805015"
                    height="500"
                    @ready="onReady"
                    :events-to-emit="['play', 'pause']"
                ></vimeo-player>
            </template>
        </app-modal>
    </div>
</template>

<script>
import { vueVimeoPlayer } from "vue-vimeo-player";
import LearnMoreLink from "@/components/shared/LearnMoreLink.vue";

export default {
    name: "Index",
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
    },
};
</script>

<style lang="scss" scoped>
.index {
    display: flex;
    min-height: 100vh;
    overflow-y: hidden;
}

.login-half {
    width: 50%;
    padding: 2rem 4rem;
    background-color: #f1f1f1;
    // background-color: #fff;
    .ruoffLogo {
        display: block;
    }

    .main-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: calc(100% - 11rem);

        h1.heading {
            margin-top: 8rem;
            color: $blue-green;
        }

        p.copy {
            width: 54rem;
            margin: 3rem 0;
            font-size: 18px;
            text-align: center;
            color: $blue-green;
            line-height: 1.5;
        }

        :deep(.beginButton) {
            margin: 5rem 0 0;
        }
        :deep(.loginButton) {
            margin: 2rem 0 0;
        }
    }

    .button-container {
        width: 25rem;
        font-size: 18.7px;
    }
}

.feature-half {
    display: flex;
    align-items: center;
    width: 50%;
    padding: 2rem 4rem;
    background-image: url("~@/assets/images/externalPage_bg.jpg");
    background-size: cover;
    background-position: center;
    .feature-list {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .feature-container {
        display: flex;
        align-items: center;
        color: #fff;
        width: 55rem;
        &:not(:last-child) {
            margin-bottom: 6rem;
        }
        .image {
            margin-right: 2rem;
            width: 9rem;
        }
        h3.heading {
            font-size: 24px;
            margin-bottom: 0.5rem;
            text-align: left;
        }
        .copy {
            font-size: 18px;
        }
    }
}
</style>
