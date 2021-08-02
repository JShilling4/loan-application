<template>
    <div :style="styleObject">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "AppColumn",
    props: {
        cAssign: {
            type: Number,
            required: true,
        },
        cTotal: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            styleObject: {
                width: this.cAssign / this.cTotal * 100 + "%",
            },
        };
    },
};
</script>