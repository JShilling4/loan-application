<template>
    <header>
        <div class="topBar">
            <div class="logo-container">
                <img
                    class="logo"
                    :src="computedLogo"
                    alt="ruoff logo"
                    @click="$router.push('/')"
                />

                <div class="languageSelector-container">
                    <language-selector :theme="appTheme" />

                    <v-spacer height="1rem" />
                    <app-button @click="changeTheme()">Theme</app-button>
                </div>
            </div>

            <transition name="fade">
                <loan-officer-info
                    v-if="loAvatarShouldShow"
                    avatar-url="https://a.ruoff.com/image/E48AF1FFD48BFECE7B48326C40DC40E7/size/75/type/ShortcutIcon"
                    name="Clint Morgan"
                    nmls="543452"
                />
            </transition>
        </div>
    </header>
</template>

<script>
import { mapActions, mapState } from "vuex";
import LanguageSelector from "@/components/LanguageSelector.vue";
import LoanOfficerInfo from "@/components/LoanOfficerInfo.vue";

export default {
    name: "ApplicationHeader",
    components: {
        "loan-officer-info": LoanOfficerInfo,
        "language-selector": LanguageSelector,
    },
    props: {
        currentView: {
            type: String,
        },
    },
    computed: {
        ...mapState(["appTheme"]),

        loAvatarShouldShow() {
            if (
                this.currentView == "application" ||
                this.currentView == "portal"
            ) {
                return true;
            }
            return false;
        },
        computedLogo() {
            if (this.appTheme === "dark") {
                return "https://webresources.ruoff.com/logo-horizontal-white-nmls/png/160/0";
            }
            return "https://webresources.ruoff.com/logo-horizontal-color-nmls/png/160/0";
        }
    },
    methods: {
        ...mapActions(["toggleTheme"]),

        changeTheme() {
            this.toggleTheme();
        }
    }
};
</script>

<style lang="scss" scoped>
header {
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 2rem 6rem 0;
    .topBar {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        width: 100%;
    }
    .languageSelector-container {
        margin-top: 2rem;
    }
}
</style>
