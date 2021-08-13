<template>
    <header>
        <div class="topBar">
            <div class="logo-container">
                <img
                    v-if="$route.name === 'Index'"
                    class="logo"
                    src="https://webresources.ruoff.com/logo-horizontal-color-nmls/png/160/0"
                    alt="ruoff logo"
                    @click="$router.push('/')"
                />
            </div>

            <div class="languageSelector-container">
                <language-selector v-if="$route.name === 'Index'" />
            </div>
        </div>
    </header>
</template>

<script>
import LanguageSelector from "@/components/LanguageSelector.vue";

export default {
    name: "ApplicationHeader",
    components: {
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
    // background-color: var(--blue-green);
    // background: linear-gradient(90deg, var(--blue-dark), var(--blue-green));
    .topBar {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        width: 100%;
    }

    .languageSelector-container {
        margin-top: 0;
    }
}
</style>
