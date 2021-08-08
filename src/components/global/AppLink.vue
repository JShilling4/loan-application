<template>
    <a
        v-if="isExternal"
        :href="to"
        target="_blank"
        rel="noopener"
        :class="[theme]"
    >
        <slot />
    </a>
    <router-link
        v-else
        v-bind="$props"
        :class="[theme]"
    >
        <slot />
    </router-link>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
    name: "AppLink",
    props: {
        ...RouterLink.props,
        theme: {
            type: String,
        },
    },

    computed: {
        isExternal() {
            return typeof this.to === "string" && this.to.startsWith("http");
        },
    },
};
</script>

<style lang="scss" scoped>
a {
    color: #fff;
    text-decoration: underline;
    margin-bottom: 1rem;
    &:hover {
        color: var(--orange);
    }
    &.light {
        color: var(--gray-link);
        &:hover {
            color: var(--orange);
        }
    }
}
</style>