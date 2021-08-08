<template>
    <div :class="['input-wrapper', { light: theme == 'light', dark: theme === 'dark' }]">
        <span
            v-if="isCurrency"
            class="dollarSign"
        >
            <font-awesome-icon
                :icon="['far', 'dollar-sign']"
                class="icon"
            />
        </span>
        <span
            v-if="isPercentage"
            class="percentSign"
        >
            <font-awesome-icon
                :icon="['fal', 'percentage']"
                class="icon"
            />
        </span>
        <input
            :type="type"
            :class="[classList, { hasIcon: isCurrency || isPercentage, light: theme == 'light', dark: theme === 'dark' }]"
            :style="styleObject"
            :value="modelValue"
            :name="name"
            :id="id"
            @input="$emit('update:modelValue', $event.target.value)"
            :tabindex="tabIndex"
        />
    </div>
</template>

<script>
export default {
    name: "TextField",
    props: {
        borderRadius: {
            type: String,
            default: "5px",
        },
        classList: {
            type: String,
            default: "",
        },
        id: {
            type: String,
        },
        isCurrency: {
            type: Boolean,
            default: false,
        },
        isPercentage: {
            type: Boolean,
            default: false,
        },
        modelValue: {
            type: [String],
            validator: (prop) => typeof prop === "string" || prop === null,
        },
        name: {
            type: String,
        },
        type: {
            type: String,
            default: "text",
        },
        tabIndex: {
            type: String,
            default: "0",
        },
        width: {
            type: String,
        },
        textAlign: {
            type: String,
        },
        theme: {
            type: String,
            default: "dark",
        },
    },
    data() {
        return {
            styleObject: {
                borderRadius: this.borderRadius,
                width: this.width,
                textAlign: this.textAlign,
            },
        };
    },
};
</script>

<style lang="scss" scoped>
.input-wrapper {
    position: relative;
    width: 100%;
    .dollarSign,
    .percentSign {
        position: absolute;
        top: 50%;
        color: #fff;
        transform: translateY(-43%);
    }
    .dollarSign {
        left: 1rem;
    }
    .percentSign {
        left: 0.8rem;
        transform: scale(0.8);
        font-size: 20px;
        top: 20%;
    }
    &.light {
        color: var(--teal-dark);
        .dollarSign,
        .percentSign {
            color: var(--blue-green);
        }
    }
}
input {
    height: var(--input-height);
    outline: none;
    padding: 0.5rem 1rem 0.5rem;
    border: 1px solid var(--blue-dark);
    width: 100%;
    font-size: 16px;
    background-color: #fff;
    color: var(--teal);
    &:focus {
        border-color: var(--teal);
        box-shadow: var(--input-focused-border-shadow);
    }

    &.dark {
        border-color: #fff;
        background-color: transparent;
        color: #fff;
        &:focus {
            border-color: var(--teal);
        }
    }

    &.short {
        width: 7rem;
    }

    &.hasIcon {
        padding-left: 2.5rem;
    }

    /* Chrome, Safari, Edge, Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    &[type="number"] {
        -moz-appearance: textfield;
        &.hasIcon {
            padding: 0.5rem 1rem 0.5rem 2.25rem;
        }
    }

    &::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        color: var(--placeholder-opacity);
    }
    &::-moz-placeholder {
        /* Firefox 19+ */
        color: var(--placeholder-opacity);
    }
    &:-ms-input-placeholder {
        /* IE 10+ */
        color: var(--placeholder-opacity);
    }
    &:-moz-placeholder {
        /* Firefox 18- */
        color: var(--placeholder-opacity);
    }
}
</style>
