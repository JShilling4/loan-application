<template>
    <div
        v-if="show"
        class="data-view"
    >
        <div class="heading-container">
            <h3 class="headingText">{{ activeSection.title }}</h3>
            <app-button
                v-if="activeSection.editUrl != null"
                height="3rem"
                class-list="teal-outline"
                @click="$router.push(activeSection.editUrl)"
            >
                Edit
                <font-awesome-icon
                    :icon="['fal', 'pen']"
                    class="headingIcon"
                />
            </app-button>
        </div>

        <div v-html="data" class="data-container">

        </div>
    </div>
</template>

<script>
export default {
    name: "ReviewSectionData",
    props: {
        activeSection: {
            type: Object,
        },
        show: {
            type: Boolean,
            required: true,
        },
        data: {
            type: [String, Object],
        },
    },
};
</script>

<style lang="scss" scoped>
.data-view {
    position: absolute;
    background-color: #fff;
    top: 0;
    z-index: 100;
    left: 15rem;
    height: 100%;
    width: calc(100% - 15rem);
    padding: 1rem 2rem;
    .heading-container {
        display: flex;
        margin-bottom: 3rem;
        .headingText {
            color: var(--blue-green);
            text-align: left;
        }
        .headingIcon {
            font-size: 15px;
            margin-left: 0.5rem;
        }
        button {
            width: 9rem;
            font-size: 14px;
            margin-left: auto;
        }
    }
    .data-container {
        height: 23rem;
        overflow-y: auto;
    }

    :deep(.line) {
        margin-bottom: 1rem;
    }
    :deep(.key) {
        display: inline-block;
    }
    :deep(.value) {
        color: var(--teal);
        font-weight: 700;
        font-size: 15px;
        &.loanType {
            text-transform: capitalize;
        }
    }

    $horizontal-pad: 5px;
    :deep(table) {
        width: 100%;
        margin-left: -$horizontal-pad;
        th {
            text-align: left;
            font-size: 14px;
            padding: 0 $horizontal-pad;
        }
        td {
            font-size: 14px;
            padding: $horizontal-pad;
        }
        .amount {
            width: 50px;
        }
    }

    :deep(.notesHeading) {
        display: block;
        margin-bottom: 2rem;
    }

    :deep(.notesTextArea) {
        width: 100%;
        height: 15rem;
        padding: 1rem;
        border: 1px solid var(--blue-green);
        outline: none;
        resize: none;
        &:focus, &:active {
            border-color: var(--teal);
            box-shadow: var(--input-focused-border-shadow);
        }
    }
}
</style>