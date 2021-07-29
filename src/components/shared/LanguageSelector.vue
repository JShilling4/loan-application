<template>
    <div
        class="languageSelector"
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
            } else {
                this.changeLanguage("English");
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
