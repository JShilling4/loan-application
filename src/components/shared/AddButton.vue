<template>
    <div class="addButton">
        <font-awesome-icon :icon="['fal', 'plus-circle']" class="icon" />
        <span class="text">{{ text }}</span>
    </div>
</template>

<script>
export default {
    name: "AddButton",
    props: {
        text: {
            type: String,
        },
    },
};
</script>

<style lang="scss" scoped>
.addButton {
    display: inline-block;
    margin: 1.5rem 0 0 1.5rem;
    color: #fff;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
        color: var(--orange);
    }

    .text {
        margin-left: 0.5rem;
    }

    .icon {
        font-size: 2.5rem;
        vertical-align: -0.75rem;
    }
}
</style>
