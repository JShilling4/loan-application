<template>
    <div class="horizontal-spacer" :style="styleObject"></div>
</template>

<script>
    export default {
        name: "HSpacer",
        props: {
            width: {
                type: String,
            }
        },
        data() {
            return {
                styleObject: {
                    width: this.width,
                }
            };
        },
    }
</script>