<template>
    <div
        :class="[`nav-item ${status}`, { light: theme === 'light'}]"
        @click="navigateTo(destinationUrl)"
    >
        <div class="percentageComplete">
            <span v-if="status == 'active' && percentageComplete == '100'">
                <font-awesome-icon
                    :icon="['fas', 'check']"
                    class="icon"
                />
            </span>
            <span v-else-if="status !== 'completed' && currentNavItem !== 'review'">{{
				`${percentageComplete}%`
			}}</span>
        </div>
        <div class="dot-container">
            <div class="dot">
                <font-awesome-icon
                    :icon="['fas', 'check']"
                    class="icon"
                />
            </div>
        </div>
        <span class="label">{{ $t(`global.${label.toLowerCase()}`) }}</span>
    </div>
</template>

<script>
export default {
    name: "NavItem",
    props: {
        label: {
            type: String,
            required: true,
        },
        destinationUrl: {
            type: String,
        },
        currentNavItem: {
            type: String,
        },
        progress: {
            type: Number,
        },
        sectionCount: {
            type: Number,
        },
        theme: {
            type: String,
        },
    },

    computed: {
        status() {
            if (this.currentNavItem == this.label.toLowerCase()) {
                return "active";
            }
            if (this.progress == this.sectionCount) {
                return "completed";
            }
            return "";
        },
        percentageComplete() {
            if (this.progress === null) {
                return "0";
            }
            return ((this.progress / this.sectionCount) * 100).toFixed(0);
        },
    },

    methods: {
        navigateTo(url) {
            if (this.$route.path !== url) {
                this.$router.push(url);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.nav-item {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    background-color: transparent;
    border-radius: var(--app-border-radius);
    min-width: 16rem;
    cursor: pointer;
    padding: 0.25rem 1rem 0.25rem;

    &.light {
        .percentageComplete {
            color: var(--blue-green);
            .icon {
                color: var(--teal-hc);
            }
        }

        .dot-container {
            .dot {
                border: 1px solid var(--blue-green);
                .icon {
                    color: var(--teal-dark);
                }
            }
        }

        .label {
            color: var(--blue-green);
        }

        &:hover {
            .dot {
                border-color: var(--blue-green);
            }
            .label {
                color: var(--blue-green);
            }
        }

        &.completed {
            .dot-container {
                .dot {
                    background-color: var(--teal);
                }
                .icon {
                    display: block;
                    color: #fff;
                }
            }
            .label {
                color: var(--blue-green);
                font-weight: 600;
            }
        }

        &.active {
            background-color: transparent;
            .percentageComplete {
                // margin-right: 6px;
                color: var(--blue-green);
                font-weight: 500;
            }
            .dot {
                height: 1.5rem;
                width: 1.5rem;
                background-color: var(--orange);
                border-width: 1px;
                border: 1px solid var(--blue-green);
            }
            .label {
                color: var(--orange);
                font-weight: 600;
            }
        }
    }

    .percentageComplete {
        margin: 4px 0 0 0;
        font-size: 14px;
        min-width: 27px;
        text-align: center;
        color: rgba(255, 255, 255, 0.781);
        .icon {
            color: var(--teal-hc);
        }
    }

    .dot-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 3rem;
        min-height: 3rem;
        margin-right: 1.5rem;

        .dot {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            width: 2.5rem;
            height: 2.5rem;
            border: 1px solid var(--input-border-opacity);
            // background-color: $input-background-opacity;
            transition: border-color 0.3s, background-color 0.3s;

            .icon {
                display: none;
                color: var(--teal-dark);
                font-size: 16px;
            }
        }
    }

    .label {
        color: var(--navitem-opacity);
        transition: color 0.3s;
        margin-top: 3px;
    }

    &:hover {
        .dot {
            border-color: #fff;
        }
        .label {
            color: #fff;
        }
    }

    &.completed {
        .dot-container {
            .dot {
                // background: radial-gradient(circle at 8px 8px, #ffffff, rgba(176, 175, 175, .7));
                border: none;
                height: 3rem;
                width: 3rem;
                background-color: #fff;
            }
            .icon {
                display: block;
            }
        }
        .label {
            color: #fff;
            font-weight: 600;
        }
    }

    &.active {
        background-color: #fff;
        .percentageComplete {
            // margin-right: 6px;
            color: var(--blue-green);
            font-weight: 500;
        }
        .dot {
            height: 1.5rem;
            width: 1.5rem;
            background-color: var(--orange);
            border-width: 1px;
            border: 1px solid var(--blue-green);
        }
        .label {
            color: var(--orange);
            font-weight: 600;
        }
    }
}
</style>
