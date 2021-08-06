<template>
    <div
        :class="['section-container', { active: isExpanded}]"
    >
        <span class="sectionName">{{ title }}</span>
        <font-awesome-icon
            :icon="['fal', 'plus']"
            class="sectionIcon"
        />
    </div>
</template>

<script>
export default {
    name: "ReviewSection",
    props: {
        isExpanded: {
            type: Boolean,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.section-container {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    cursor: pointer;
    &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: 0;
        transition: background-color 0.3s, width 0.7s;
    }
    &:not(.last) {
        border-bottom: 2px solid #fff;
    }
    &:hover:before {
        background-color: var(--orange);
    }
    &.active {
        &:before {
            background-color: var(--orange);
            width: 15rem;
            transition: width 0.4s;
        }
    }
    .sectionName {
        color: #fff;
        z-index: 1;
    }
    .sectionIcon {
        color: #fff;
        font-size: 2.5rem;
        z-index: 1;
    }
}
</style>