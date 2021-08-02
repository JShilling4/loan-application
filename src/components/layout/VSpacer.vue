<template>
    <div class="vertical-spacer" :style="styleObject"></div>
</template>

<script>
    export default {
        name: "VSpacer",
        props: {
            height: {
                type: String,
            }
        },
        data() {
            return {
                styleObject: {
                    minHeight: this.height,
                }
            };
        },
    }
</script>