<template>
    <div id="app">
        <div
            class="appBackground"
            :class="[appBackgroundClass, appTheme]"
        ></div>

        <application-header
            v-if="currentView == 'application' || currentView == 'external'"
            :current-view="currentView"
            key="1"
        />
        <external-header
            v-else-if="currentView == 'index'"
            key="2"
        />
        <portal-header
            v-else-if="currentView == 'portal'"
            key="3"
        />

        <progress-bar v-if="applicationData && currentNavItem !== null" />

        <router-view class="child-view" v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>

        <div class="intercomIcon-container">
            <img
                src="@/assets/images/intercom_icon.png"
                alt=""
            />
            <span>Chat</span>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ApplicationHeader from "@/components/layout/ApplicationHeader.vue";
import PortalHeader from "@/components/layout/PortalHeader.vue";
import ExternalHeader from "@/components/layout/ExternalHeader.vue";
import ProgressBar from "@/components/layout/ProgressBar.vue";

export default {
    name: "App",
    components: {
        "application-header": ApplicationHeader,
        "portal-header": PortalHeader,
        "external-header": ExternalHeader,
        "progress-bar": ProgressBar,
    },

    computed: {
        ...mapState(["application", "appTheme"]),

        applicationData() {
            return this.application.application;
        },
        shouldShowAppHeader() {
            return this.$route.path != "/";
        },
        currentNavItem() {
            return this.$route.meta.navItem;
        },
        currentView() {
            if (this.$route.path == "/") {
                return "index";
            } else if (this.$route.path == "/login") {
                return "external";
            } else if (this.$route.path == "/portal") {
                return "portal";
            } else if (this.$route.path == "/create-account") {
                return "external";
            } else if (this.$route.path == "/forgot-password") {
                return "external";
            } else if (this.$route.path == "/faq") {
                return "faq";
            }
            return "application";
        },
        appBackgroundClass() {
            if (
                this.currentView == "application" ||
                this.currentView == "external" ||
                this.currentView == "index"
            ) {
                return "application";
            } else if (this.currentView == "portal") {
                return "portal";
            } else if (this.currentView == "faq") {
                return "faq";
            }
            return "";
        },
    },

    methods: {
        ...mapActions([
            "updateApplication",
            "fetchBorrowerProfile",
            "updateCoborrowerProfile",
        ]),
    },
    mounted() {
        // DATA NEEDED TO LOAD PAGE
        this.updateApplication();
        this.fetchBorrowerProfile();
        this.updateCoborrowerProfile();
    },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss">
@import "@/design/scss/_utility.scss";
@import "@/design/scss/_base.scss";
@import "@/design/scss/_typography.scss";
@import "@/design/scss/_layout.scss";
@import "@/design/scss/_buttons.scss";
@import "@/design/scss/_forms.scss";

:root {
    --ms-bg: transparent;
    --ms-radius: 5px;
    --ms-border-color: #fff;
    --ms-caret-color: #fff;
    --ms-option-font-size: 14px;
    --ms-ring-color: #16c297;
    --ms-ring-width: 0;
    --ms-tag-bg: var(--teal-dark);
    --ms-tag-py: 0.5rem;
    --ms-tag-font-size: 13px;
}

.multiselect {
    min-height: var(--input-height) !important;
    .multiselect-single-label {
        color: #fff;
        font-size: 16px;
    }
    .multiselect-dropdown {
        overflow-y: auto;
    }
    &.light {
        --ms-border-color: var(--blue-dark);
        --ms-caret-color: var(--blue-dark);
        .multiselect-single-label {
            color: var(--blue-dark);
        }
    }
    &.is-open {
        border-color: #16c297;
        box-shadow: 0 0 3px #16c297;
    }
}

body {
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        border-radius: 25px;
    }
}

a {
    // color: var(--teal-dark);
    text-decoration: none;
    transition: color 0.3s;
    &:hover {
        color: var(--orange);
    }
}

ul {
    list-style: none;
}

fieldset {
    border: none;
}

#app {
    position: relative;
    min-height: 100vh;

}

.appBackground {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    transition: background-color 1s;
    background-color: rgb(8, 72, 92);
    &.application {

        background: radial-gradient(
            circle,
            rgba(8, 72, 92, 1) 0%,
            rgba(20, 47, 66, 1) 95%
        );
    }
    &.faq {
        background: linear-gradient(to right, #0f6957, var(--blue-green));
    }

    &.light {
        background-color: rgb(230, 230, 230);
        background: none;
    }
}

.child-view {
    position: relative;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.viewWrapper {
    position: relative;
}

.appHeading {
    margin: 10rem 0 4rem;
    font-weight: 500;
    font-size: 2.4rem;
    &.light {
        color: var(--blue-green);
        font-weight: 600;
    }
}

.pageCopy {
    color: #fff;
    text-align: center;
    line-height: 1.5;
    font-size: 18px;
    font-weight: 200;
}

.pageForm {
    max-width: 72rem;
    margin: 0 auto;
}

.pageSubmit {
    display: block;
    margin: 4rem auto;
}

.intercomIcon-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    z-index: 9999;
    bottom: 5rem;
    right: 6.5rem;
    user-select: none;
    img {
        width: 50px;
        margin-bottom: 4px;
    }
    span {
        color: #fff;
        font-size: 12px;
    }
}

.loading-wrapper {
    position: absolute;
    left: 50%;
    top: 10rem;
}

// TRANSITIONS

.fade-enter-active,
.fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
}

.fade-enter-from,
.fade-leave-active {
    /* position: fixed;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%); */
    opacity: 0 !important;
}
</style>
