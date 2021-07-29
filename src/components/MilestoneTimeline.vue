<template>
    <section class="ms-timeline">
        <div class="timelineHeader">
            <h2 class="container">Your Milestone Timeline</h2>
            <i class="fas fa-angle-down"></i>
        </div>

        <div class="track-wrapper">
            <font-awesome-icon
                :icon="['fas', 'arrow-left']"
                class="scroll-arrow left --disabled"
                id="left-scroll-arrow"
            />
            <div
                class="ms-container milestone-component"
                id="ms-container"
            >
                <app-milestone v-for="milestone in milestones" :key="milestone.id" :milestone="milestone" />
            </div>
            <font-awesome-icon
                :icon="['fas', 'arrow-right']"
                class="scroll-arrow right"
                id="right-scroll-arrow"
            />
        </div>

    </section>
</template>

<script>
import { mapState } from "vuex";
import AppMilestone from "@/components/AppMilestone.vue";

export default {
    name: "MilestoneTimeline",
    components: {
        "app-milestone": AppMilestone,
    },
    computed: {
        ...mapState(["portal"]),
        milestones() {
            return this.portal.milestones;
        },
    }
};
</script>

<style lang="scss" scoped>
.ms-timeline {
    margin-top: -3.5rem;
    font-weight: 700;

    @include breakpoint(tablet-land) {
        margin-top: 2rem;
        order: 3;
    }

    .timelineHeader {
        width: var(--ms-timeline-width);
        margin: 5rem auto 0;
        @include breakpoint(tablet-land) {
            display: flex;
            justify-content: space-between;
            padding: 1rem 2rem 0;
            letter-spacing: 1px;
            cursor: pointer;
            color: var(--blue-green);
            margin-bottom: 1rem;
        }

        .container {
            font-weight: 800;
            @include breakpoint(tablet-land) {
                margin: 0;
            }
        }

        h2 {
            text-align: left;
            font-size: 1.6rem;
            color: var(--standard-font-color);
        }

        .fa-angle-down {
            display: none;

            @include breakpoint(tablet-land) {
                display: block;
            }
        }
    }
}

.track-wrapper {
    display: flex;
    position: relative;
    max-width: var(--ms-timeline-width);
    margin: -7rem auto 0;
    transform: scaleY(1);
    transform-origin: top;
    transition: transform 0.3s;

    @include breakpoint(tablet-land) {
        margin: 0;
    }

    &.timeline-placeholder {
        display: flex;
        max-width: var(--ms-timeline-width);
        margin: 0 auto;
        padding: 3rem 0;
    }

    &.--closed {
        transform: scaleY(0);
    }

    .scroll-arrow {
        position: absolute;
        font-size: 18px;
        color: #fff;
        background-color: #142f42;
        cursor: pointer;
        bottom: 0.5px;
        padding: 2px;
        z-index: 100;
        border-radius: 50%;
        transition: color 0.3s;

        @include breakpoint(tablet-land) {
            display: none;
        }
    }

    .scroll-arrow.left {
        left: -3px;

        @media screen and (-ms-high-contrast: active),
            (-ms-high-contrast: none) {
            left: 15px;
        }
    }

    .scroll-arrow.right {
        right: -3px;

        @media screen and (-ms-high-contrast: active),
            (-ms-high-contrast: none) {
            right: 15px;
        }
    }
}

.ms-container {
    position: relative;
    display: flex;
    margin: 0 auto;
    width: var(--ms-timeline-width);
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scrollbar-color: var(--blue-dark) #d3d2d2;
    scrollbar-width: auto;
    -ms-overflow-style: auto;
    line-height: 16px;
    @include breakpoint(tablet-land) {
        display: block;
        margin: 0;
        width: 100%;
        overflow-x: unset;
    }
    &::-webkit-scrollbar {
        height: 17px;
    }
    &::-webkit-scrollbar-track {
        background: #d3d2d2;
    }
    &::-webkit-scrollbar-thumb {
        background-color: var(--blue-dark);
        border-radius: 10px;
        border: 1px solid var(--portal-gray);
    }
}

.ms {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;
    width: 17rem;
    min-width: 17rem;
    padding: 11rem 2.44rem 3rem;
    text-align: center;
    color: var(--standard-font-color);
    cursor: default;

    @include breakpoint(tablet-land) {
        width: 100%;
        height: 8rem;
        flex-direction: row;
        padding-top: 3rem;
        align-items: flex-start;
    }

    @include breakpoint(tablet-port) {
        text-align: left;
    }

    &:first-child {
        @include breakpoint(desktop) {
            margin-left: -4rem;
        }

        @include breakpoint(tablet-land) {
            margin-left: 0;
        }
    }

    .date {
        display: block;
        font-size: 13px;
        margin: 0.5rem 0;
        height: 15px;

        @include breakpoint(tablet-land) {
            text-align: left;
        }
    }

    .dot {
        width: 25px;
        min-width: 25px;
        height: 25px;
    }

    &.complete {
        .dot {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            font-size: 16px;
            border-radius: 50%;
            z-index: 1;
            background-color: var(--blue-dark);
            color: var(--teal);

            .icon:after {
                width: var(--ms-track-width);
                left: 100%;
                height: 4px;
                content: "";
                position: absolute;
                background-color: var(--teal);
                top: 44%;
                z-index: 0;

                @include breakpoint(tablet-land) {
                    height: 8rem;
                    left: 44%;
                    width: 4px;
                    content: "";
                    position: absolute;
                    background-color: #16af8c;
                    top: 25px;
                    z-index: 0;
                }
            }
        }
    }
    /* incomplete */
    &.incomplete {
        &:hover .text {
            color: var(--blue-green);
        }

        &:hover .label-wrapper .icon {
            display: flex !important;
        }

        .dot {
            position: relative;
            color: #fff;
            border: 2px solid var(--standard-font-color);
            border-radius: 50%;
            background-color: #fff;
            z-index: 1;
        }

        .label-wrapper .icon {
            display: none;
        }

        &__dot .fa-check.icon {
            display: none;
        }
    }

    &:not(:last-of-type).incomplete .dot:after {
        width: var(--ms-track-width);
        left: 100%;
        height: 2px;
        content: "";
        position: absolute;
        background-color: var(--standard-font-color);
        top: 46%;
        z-index: 0;

        @include breakpoint(tablet-land) {
            height: 8rem;
            left: 43.5%;
            width: 2px;
            content: "";
            position: absolute;
            top: 22px;
            z-index: 0;
        }
    }

    .label-date-wrapper {
        position: relative;
        max-width: 100%;

        @include breakpoint(tablet-land) {
            margin-left: 1.5rem;
            order: 2;
        }

        .tooltipIcon {
            position: absolute;
            top: -2.25rem;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--teal-dark);
            background-color: #fff;
            border-radius: 50%;
            height: 18px;
            width: 18px;
            font-size: 8px;
            border: 1px solid var(--teal-dark);
            transition: background-color 0.3s, color 0.3s;

            @include breakpoint(tablet-land) {
                right: -2rem;
            }
        }

        .tooltipIcon.showing {
            background-color: var(--teal-dark);
            color: #fff;

            + .tooltip-text {
                display: block;
            }
        }

        @media (pointer: fine) {
            .tooltipIcon:hover {
                background-color: var(--teal-dark);
                color: #fff;

                + .tooltip-text {
                    display: block;
                }
            }
        }

        .tooltip-text {
            display: none;
            position: absolute;
            width: 33rem;
            background-color: #fff;
            color: #16af8c;
            z-index: 999999;
            top: -9.5rem;
            line-height: 1.5;
            left: 13rem;
            padding: 1rem;
            border: 1px solid #16af8c;
            font-weight: 700;

            @include breakpoint(tablet-land) {
                left: 0;
                top: 0;
            }

            @include breakpoint(mobile) {
                width: 25rem;
            }

            @include breakpoint(mobile-small) {
                left: -3rem;
            }

            &.showLeft {
                left: auto;
                right: 3rem;

                @include breakpoint(tablet-land) {
                    left: 0;
                    right: unset;
                    bottom: 9rem;
                    top: unset;
                }

                @include breakpoint(mobile-small) {
                    left: -3rem;
                }
            }
        }

        .text-overflow {
            display: none;
        }
    }

    .label-wrapper {
        position: relative;
        min-height: 32px;
        height: 32px;
        overflow: hidden;

        @include breakpoint(tablet-land) {
            min-height: unset;
            height: unset;
        }

        .text {
            text-transform: capitalize;
        }
    }

    .label-wrapper.overflow {
        @media screen and (min-width: 768px) {
            position: relative;
            padding-right: 1rem;

            &:before {
                position: absolute;
                content: "...";
                bottom: 0;
                right: 0;
            }

            &:hover + .text-overflow {
                display: block;
                position: absolute;
                background-color: var(--teal-dark);
                color: white;
                z-index: 9999999;
                width: 15rem;
                padding: 1rem;
            }
        }
    }

    .icon {
        cursor: default;
    }
}
</style>