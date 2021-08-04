<template>
    <div
        :class="['languageSelector', { light: theme === 'light' || appTheme === 'light', inline: isInline }]"
        v-click-outside="closeDropdown"
    >
        <span class="label">{{ $t('global.preferredLanguage') }}</span>
        <div
            class="selected-container"
            @click="showDropdown = !showDropdown"
        >
            <span class="selected">{{ $t(`global.${selectedLanguage.toLowerCase()}`) }}</span>
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
                {{ selectedLanguage == "English" ? $t('global.spanish') : $t('global.english') }}
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
        ...mapState(["selectedLanguage", "appTheme"]),
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
    z-index: 10;
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
            color: var(--teal);
        }
        .dropdown {
            .option {
                border: 1px solid var(--blue-green);
                color: var(--teal);
                font-weight: 600;
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
    border-radius: var(--app-border-radius);
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
        border-radius: var(--app-border-radius);
        font-weight: 500;
        cursor: pointer;
    }
}
</style>
