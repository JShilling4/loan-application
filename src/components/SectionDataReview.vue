<template>
    <div
        v-if="show"
        class="data-view"
    >
        <h3 class="dataHeading">{{ activeSection.title }}</h3>

        <div v-for="(value, name) in data" :key="value">
            <span class="dataLine">{{ name }} : {{ value }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "SectionDataReview",
    props: {
        activeSection: {
            type: Object,
        },
        show: {
            type: Boolean,
            required: true,
        },
        data: {
            type: Object,
        }
    },
};
</script>

<style lang="scss" scoped>
.data-view {
    position: absolute;
    background-color: #fff;
    top: 0;
    left: 15rem;
    height: 100%;
    width: calc(100% - 15rem);
    padding: 1rem 2rem;
    .dataHeading {
        color: var(--blue-green);
        text-align: left;
        margin-bottom: 1rem;
    }
    .dataLine {
        display: inline-block;
        margin-bottom: 1rem;
    }
}
</style>