<template>
    <div class="review">
        <h1 class="appHeading">Let's review your application!</h1>
        <div class="pageWrapper">

            <div class="review-box">
                <div
                    :class="['section-container', { active: profileIsExpanded}]"
                    @click="profileIsExpanded = !profileIsExpanded"
                >
                    <span class="sectionName">Profile</span>
                    <font-awesome-icon
                        :icon="['fal', 'plus']"
                        class="sectionIcon"
                    />

                    <transition name="data-fade">
                        <div
                            v-if="profileIsExpanded"
                            class="data-view"
                        >
                            <h3 class="dataHeading">Profile</h3>
                        </div>
                    </transition>
                </div>
                <div class="section-container">
                    <span class="sectionName">Address</span>
                    <font-awesome-icon
                        :icon="['fal', 'plus']"
                        class="sectionIcon"
                    />
                </div>
                <div class="section-container">
                    <span class="sectionName">Property</span>
                    <font-awesome-icon
                        :icon="['fal', 'plus']"
                        class="sectionIcon"
                    />
                </div>
                <div class="section-container">
                    <span class="sectionName">Income</span>
                    <font-awesome-icon
                        :icon="['fal', 'plus']"
                        class="sectionIcon"
                    />
                </div>
                <div class="section-container">
                    <span class="sectionName">Assets</span>
                    <font-awesome-icon
                        :icon="['fal', 'plus']"
                        class="sectionIcon"
                    />
                </div>
                <div class="section-container">
                    <span class="sectionName">Declarations</span>
                    <font-awesome-icon
                        :icon="['fal', 'plus']"
                        class="sectionIcon"
                    />
                </div>
                <div class="section-container">
                    <span class="sectionName">Notes</span>
                    <font-awesome-icon
                        :icon="['fal', 'plus']"
                        class="sectionIcon"
                    />
                </div>
            </div>

            <view-controls
                @advance-app="$router.push('/application-completed')"
                @retreat-app="$router.go(-1)"
                :include-back="false"
                next-text="Finish Application"
            />
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Review",
    data() {
        return {
            profileIsExpanded: false,
        };
    },
    computed: {
        ...mapState(["borrower", "coborrower"]),
    },
};
</script>

<style lang="scss" scoped>
.review {
    @include app-background;
}
.pageWrapper {
    width: 600px;
    margin: 0 auto;
}

.review-box {
    position: relative;
    border: 2px solid #fff;
    border-radius: var(--app-border-radius);
}
.section-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    transition: background-color 0.3s;
    cursor: pointer;
    &:not(:last-child) {
        border-bottom: 2px solid #fff;
    }
    &:hover {
        background-color: var(--orange);
    }
    &.active {
        background-color: var(--orange);
    }
    .sectionName {
        color: #fff;
    }
    .sectionIcon {
        color: #fff;
        font-size: 2.5rem;
    }
    .data-view {
        position: absolute;
        background-color: #fff;
        top: 0;
        left: 15rem;
        height: 100%;
        width: calc(100% - 15rem);
        padding: 1rem 2rem;
        .dataHeading {
            color: var(--blue-green);
            text-align: left;
        }
    }
}

.data-fade-enter-active,
.data-fade-leave-active {
    transition-duration: 1s;
    transition-property: opacity;
    transition-timing-function: ease;
}

.data-fade-enter-from,
.data-fade-leave-active {
    opacity: 0 !important;
}
</style>
