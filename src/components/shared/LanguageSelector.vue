<template>
    <div
        :class="['languageSelector', { light: theme === 'light', inline: isInline }]"
        v-click-outside="closeDropdown"
    >
        <span class="label">Preferred Language:</span>
        <div
            class="selected-container"
            @click="showDropdown = !showDropdown"
        >
            <span class="selected">{{ selectedLanguage }}</span>
            <font-awesome-icon
                :icon="['fas', 'angle-down']"
                class="icon"
            />
        </div>

        <div
            v-if="showDropdown"
            class="dropdown"
        >
            <span
                class="option"
                @click="toggleLanguage()"
            >
                {{ selectedLanguage == "English" ? "Spanish" : "English" }}
            </span>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    name: "LanguageSelector",
    props: {
        theme: {
            type: String,
            default: "dark",
        },
        isInline: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            showDropdown: false,
        };
    },
    computed: {
        ...mapState(["selectedLanguage"]),
    },
    methods: {
        ...mapActions(["changeLanguage"]),
        toggleLanguage() {
            if (this.selectedLanguage == "English") {
                this.changeLanguage("Spanish");
                this.$i18n.locale = "es";
            } else {
                this.changeLanguage("English");
                this.$i18n.locale = "en";
            }
            this.showDropdown = false;
        },
        closeDropdown() {
            this.showDropdown = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.languageSelector {
    position: relative;
    min-width: 12rem;
    font-size: 14px;
    .label {
        display: inline-block;
        margin-bottom: 3px;
        color: #fff;
    }
    &.light {
        .label {
            color: var(--blue-green);
            font-weight: 600;
        }
        .selected-container {
            border-color: var(--blue-green);
            color: var(--blue-green);
        }
        .dropdown {
            .option {
                border: 1px solid var(--blue-green);
            }
        }
    }

    &.inline {
        display: flex;
        align-items: center;
        .label {
            margin-right: .5rem;
        }
        .selected-container {
            width: 12rem;
        }
        .dropdown {
            right: 0;
            width: 12rem;
        }
    }
}

.selected-container {
    position: relative;
    border: 1px solid #fff;
    border-radius: 2rem;
    padding: 0.5rem 1rem 0.25rem;
    color: #fff;
    cursor: pointer;

    .icon {
        position: absolute;
        right: 1rem;
    }
}

.dropdown {
    position: absolute;
    bottom: -3rem;
    color: var(--blue-green);
    width: 100%;
    .option {
        display: block;
        padding: 0.5rem 1rem 0.25rem;
        background-color: #fff;
        border-radius: 2rem;
        font-weight: 500;
        cursor: pointer;
    }
}
</style>
