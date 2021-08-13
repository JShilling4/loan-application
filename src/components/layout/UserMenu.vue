<template>
    <div v-click-outside="closeDropdown" class="userMenu">
        <div class="menuItem">
            <span class="name">Language:</span>
            <language-selector
                theme="light"
                :app-theme="theme"
                :include-label="false"
            />
        </div>
        <div class="menuItem logout">
            <app-button
                :theme="theme"
                @click="$emit('logout')"
            >Log Out</app-button>
        </div>
    </div>
</template>

<script>
import LanguageSelector from "@/components/LanguageSelector.vue";

export default {
    name: "UserMenu",
    props: {
        theme: {
            type: String,
        },
    },
    components: {
        "language-selector": LanguageSelector,
    },
    methods: {
        closeDropdown() {
            this.$emit('close');
        }
    }
};
</script>

<style lang="scss" scoped>
.userMenu {
    position: absolute;
    background-color: #fff;
    width: 26rem;
    top: 4.5rem;
    right: -2rem;
    padding: 2rem;
    &:before {
        position: absolute;
        content: "";
        top: -10px;
        right: 25px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;

        border-bottom: 10px solid #fff;
    }
    .menuItem {
        display: flex;
        align-items: center;
        color: var(--blue-green);
        .name {
            margin-right: 1rem;
        }
        &:not(:last-child) {
            margin-bottom: 2rem;
        }
        &.logout {
            margin-top: 4rem;
        }
    }
}
</style>