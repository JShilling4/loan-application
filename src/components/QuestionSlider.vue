<template>
    <div class="questionSlider">
        <slot></slot>

        <div class="setCount">
            {{ activeSet }} / {{ setTotal}}
        </div>

        <div
            :class="['previous-control', { disabled: activeSet === 1}]"
            @click.stop.prevent="retreatQuestion()"
        >
            <font-awesome-icon :icon="['fas', 'angle-left']" />
        </div>
        <div
            :class="['next-control', { disabled: activeSet === setTotal}]"
            @click.stop.prevent="advanceQuestion()"
        >
            <font-awesome-icon :icon="['fas', 'angle-right']" />
        </div>
    </div>
</template>

<script>
export default {
    name: "QuestionSlider",
    emits: ['advance', 'retreat'],
    props: {
        activeSet: {
            type: Number,
            required: true,
        },
        setTotal: {
            type: Number,
            required: true,
        },
    },
    methods: {
        advanceQuestion() {
            this.$emit('advance');
        },
        retreatQuestion() {
            this.$emit('retreat');
        }
    }
};
</script>

<style lang="scss" scoped>
.questionSlider {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 650px;
    margin: 4rem auto;
    min-height: 21rem;
    padding: 2rem 5rem;
    border: 1px solid #fff;
    border-radius: 5px;

    .questionSlider {
        text-align: center;
        width: 500px;
        margin: 0 auto;
    }

    .setCount {
        position: absolute;
        right: 1rem;
        bottom: 0.5rem;
        color: #fff;
        user-select: none;
    }

    .previous-control,
    .next-control {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
        font-size: 4rem;
        cursor: pointer;
        transition: color .3s;
        &.disabled {
            opacity: 0.5;
            cursor: default;
        }
        &:hover:not(.disabled) {
            color: var(--orange);
        }
    }
    .previous-control {
        left: 1rem;
    }

    .next-control {
        right: 1rem;
    }
}
</style>