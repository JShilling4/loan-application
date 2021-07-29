<template>
    <header class="internal-header">
        <div class="content-wrapper">
            <img
                class="logo"
                src="@/assets/images/loanButler_logo_white.svg"
                alt="ruoff logo"
                @click="$router.push('/')"
            />

            <div class="AlertForUserBasedOnApp"></div>

            <div class="preferredLO">
                <div class="lo-avatar-container">
                    <img
                        class="avatar"
                        src="https://a.ruoff.com/image/16a3ae081bc129a09c7be451b4e1f224/size/110/type/ShortcutIcon"
                        alt="@Resources.LocalizedText.PortraitMessage"
                    />
                </div>

                <div class="tools-menu-container">
                    <p class="loName">More Tools</p>
                    <font-awesome-icon
                        :icon="['fas', 'caret-down']"
                        class="icon"
                    />

                    <div class="tools-menu">
                        <div class="lo-section">
                            <div class="avatar-wrapper">
                                <img
                                    class="avatar"
                                    src="https://a.ruoff.com/image/16a3ae081bc129a09c7be451b4e1f224/size/110/type/ShortcutIcon"
                                    alt="@Resources.LocalizedText.PortraitMessage"
                                />
                            </div>
                            <p class="loName">Grant Music</p>
                            <a
                                class="loEmail"
                                href="mailto:${loanOfficer.email}"
                            >grant.music@ruoff.com</a>
                        </div>

                        <div class="tool-items">
                            <router-link
                                to="/faq"
                                target="_blank"
                                class="item"
                            >
                                <font-awesome-icon
                                    :icon="['far', 'question-square']"
                                    class="icon"
                                />
                                <span>FAQs</span>
                                <font-awesome-icon
                                    :icon="['far', 'chevron-right']"
                                    class="icon"
                                />
                            </router-link>
                            <div class="item contactModalTrigger">
                                <font-awesome-icon
                                    :icon="['far', 'address-book']"
                                    class="icon"
                                />
                                <span>Contact</span>
                                <font-awesome-icon
                                    :icon="['far', 'chevron-right']"
                                    class="icon"
                                />
                            </div>
                            <a class="signOut item">
                                <font-awesome-icon
                                    :icon="['fas', 'sign-out-alt']"
                                    class="icon"
                                />
                                <span>Log Out</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>


export default {
    name: "PortalHeader",
    components: {},
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
.internal-header {
    position: relative;
    background: linear-gradient(
        to right,
        var(--blue-dark),
        var(--blue-green),
        var(--teal-dark)
    );
    background-image: url("~@/assets/images/header_bg.jpg");

    .content-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        max-width: 1240px;
        margin: 0 auto;
        padding: 0 2rem;
    }

    .logo {
        padding: 2rem 0 1.5rem;
        @include breakpoint(tablet-land) {
            height: 80px;
        }
        @include breakpoint(tablet-port) {
            height: 65px;
        }
    }

    .preferredLO {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: auto;
        padding: 2rem 0 1.5rem;

        @include breakpoint(mobile) {
            top: 11.5rem;
        }

        &:hover .icon.fa-caret-down {
            transform: rotate(180deg);
        }

        &:hover .tools-menu-container .tools-menu {
            transform: scale(1);
        }
        .lo-avatar-container {
            height: 50px;
            img.avatar {
                height: 50px;
                width: 50px;
                border: 2px solid var(--teal-dark);
                border-radius: 50%;
                margin-right: 0.5rem;
            }
        }

        .tools-menu-container {
            display: flex;
            align-items: center;
            margin-top: 0.5rem;
            color: #fff;
            font-weight: 500;

            p {
                cursor: default;
            }
            .icon.fa-caret-down {
                margin-left: 0.5rem;
                transition: transform 0.3s;
            }

            .tools-menu {
                position: absolute;
                right: 0;
                top: 11.2rem;
                z-index: 1000;
                border-left: 1px solid var(--container-border-color);
                border-right: 1px solid var(--container-border-color);
                border-bottom: 1px solid var(--container-border-color);
                width: 25rem;
                background-color: #fff;
                color: #333;
                box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.2);
                transform: scale(0);
                transform-origin: top right;
                transition: transform 0.3s;

                .lo-section {
                    padding: 1rem;
                    text-align: center;
                    border-bottom: 1px solid var(--container-border-color);
                    .avatar-wrapper {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 70px;
                        height: 70px;
                        margin: 0 auto;
                        border-radius: 50%;
                        background: linear-gradient(
                            to bottom,
                            var(--orange),
                            var(--blue-green)
                        );
                        img {
                            border-radius: 50%;
                            width: 60px;
                        }
                    }
                    .loName {
                        color: var(--blue-green);
                        font-weight: 700;
                    }
                    .loEmail {
                        font-size: 1.2rem;
                        color: var(--portal-gray);
                        &:hover {
                            color: var(--orange);
                        }
                    }
                }

                .tool-items {
                    .item {
                        display: flex;
                        align-items: center;
                        padding: 1rem 1rem 1rem 1.5rem;
                        cursor: pointer;
                        color: #333;
                        font-size: 1.2rem;
                        .icon {
                            color: #5c5c5c;
                            &.fa-chevron-right {
                                margin-left: auto;
                                font-size: 1.4rem;
                                transition: transform 0.3s;
                            }
                        }
                        span {
                            margin-left: 1rem;
                        }
                        &:hover {
                            background-color: #f7f7f7;
                            color: var(--orange);
                            .icon {
                                color: var(--orange);
                                &.fa-chevron-right {
                                    color: var(--teal);
                                    transform: translateX(-3px);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


</style>
