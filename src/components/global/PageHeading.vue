<template>
    <h1 :class="['pageHeading', { light: theme === 'light'}]">
        <slot></slot>
    </h1>
</template>

<script>
export default {
    name: "PageHeading",
    props: {
        theme: {
            type: String,
        }
    }
};
</script>

<style lang="scss" scoped>
.pageHeading {
    margin: 12rem 0 4rem;
    font-weight: 500;
    font-size: 2.4rem;
    &.light {
        color: var(--blue-green);
        font-weight: 600;
    }
}
</style>