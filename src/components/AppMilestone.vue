<template>
    <div class="ms complete">
        <div class="label-date-wrapper">
            <font-awesome-icon
                :icon="['fal', 'info-circle']"
                class="icon tooltipIcon"
                data-ms-index="--index0"
            />
            <span class="tooltip-text">
                {{ milestone.tooltipText }}
            </span>
            <div class="label-wrapper ">
                <span class="text">{{ milestone.title }}</span>
            </div>
            <span class="text-overflow">{{ milestone.title }}</span>

            <span class="date">date here</span>
        </div>
        <span class="dot">
            <font-awesome-icon
                :icon="['fas', 'check']"
                class="icon"
            />
        </span>
    </div>
</template>

<script>
export default {
    name: "Milestone",
    props: {
        milestone: {
            type: Object,
        },
    },
};
</script>

<style lang="scss" scoped>
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
        }
    }
    &:not(:last-of-type).complete .dot:after {
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
            font-size: 20px;
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