<template>
    <header>
        <div class="topBar">
            <div class="logo-container">
                <img
                    class="logo"
                    :src="computedLogo"
                    alt="ruoff logo"
                />

            </div>

            <div class="header-controls">
                <font-awesome-icon
                    :icon="['fal', appTheme === 'light' ? 'moon' : 'sun']"
                    :class="['headerIcon', appTheme]"
                    @click="changeTheme()"
                />

                <div
                    v-if="auth.loggedIn"
                    class="menu-container"
                >
                    <font-awesome-icon
                        :icon="['fal', 'user-circle']"
                        :class="['headerIcon', appTheme]"
                        @click.stop="userMenuShowing = !userMenuShowing"
                    />

                    <transition name="slide-down">
                        <user-menu
                            v-if="userMenuShowing"
                            @close="userMenuShowing = false"
                            :theme="appTheme"
                            @logout="onLogOut()"
                        />
                    </transition>
                </div>

                <loan-officer-info
                    v-if="loAvatarShouldShow"
                    avatar-url="https://a.ruoff.com/image/E48AF1FFD48BFECE7B48326C40DC40E7/size/75/type/ShortcutIcon"
                    name="Clint Morgan"
                    nmls="543452"
                />
            </div>
        </div>
    </header>
</template>

<script>
import { mapActions, mapState } from "vuex";
import LoanOfficerInfo from "@/components/LoanOfficerInfo.vue";
import UserMenu from "@/components/layout/UserMenu.vue";

export default {
    name: "ApplicationHeader",
    components: {
        "loan-officer-info": LoanOfficerInfo,
        "user-menu": UserMenu,
    },

    props: {
        currentView: {
            type: String,
        },
    },

    data() {
        return {
            userMenuShowing: false,
        };
    },

    computed: {
        ...mapState(["appTheme", "auth", "borrower"]),

        loAvatarShouldShow() {
            if (
                this.currentView == "application" ||
                this.currentView == "portal"
            ) {
                if (this.borrower.about.loanOfficer != null) {
                    return true;
                }
            }
            return false;
        },
        computedLogo() {
            if (this.appTheme === "light") {
                return "https://webresources.ruoff.com/logo-horizontal-color-nmls/png/160/0";
            }
            return "https://webresources.ruoff.com/logo-horizontal-white-nmls/png/160/0";
        },
    },
    methods: {
        ...mapActions(["toggleTheme", "logOut"]),

        changeTheme() {
            this.toggleTheme();
        },

        onLogOut() {
            this.userMenuShowing = false;
            this.logOut();
            this.$router.push("/login");
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
    .topBar {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        width: 100%;
    }

    .headerIcon,
    .logoutTrigger {
        margin-left: 2rem;
        cursor: pointer;
        transition: color 0.3s;
        &:hover {
            color: var(--orange);
        }
        &.light {
            color: var(--blue-green);
            &:hover {
                color: var(--orange);
            }
        }
    }

    .menu-container {
        position: relative;
    }

    .headerIcon {
        font-size: 3rem;
        &.fa-sun {
            font-size: 2.6rem;
        }
        &.fa-moon {
            font-size: 2.2rem;
        }
    }

    .header-controls {
        display: flex;
        align-items: center;
        color: #fff;
        .logoutTrigger {
            margin-right: 2rem;
            cursor: pointer;
        }
    }
}
</style>
