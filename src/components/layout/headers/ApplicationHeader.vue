<template>
    <header>
        <div class="topBar">
            <div class="logo-container">
                <img
                    class="logo"
                    src="https://webresources.ruoff.com/logo-horizontal-white-nmls/png/160/0"
                    alt="ruoff logo"
                    @click="$router.push('/')"
                />

                <div class="languageSelector-container">
                    <language-selector />
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
import LanguageSelector from "@/components/shared/LanguageSelector.vue";
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
        loAvatarShouldShow() {
            if (
                this.currentView == "application" ||
                this.currentView == "portal"
            ) {
                return true;
            }
            return false;
        },
    },
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
    // background-color: $blue-green;
    // background: linear-gradient(90deg, $blue-dark, $blue-green);
    .topBar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
    }
    .languageSelector-container {
        margin-top: 2rem;
    }
}
</style>
