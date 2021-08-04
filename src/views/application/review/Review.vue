<template>
    <div class="review">
        <h1 class="appHeading">Let's review your application!</h1>
        <form class="pageForm">
            <view-controls
                @advance-app="$router.push('/application-completed')"
                @retreat-app="$router.go(-1)"
                :include-back="false"
                next-text="Finish Application"
            />
        </form>
    </div>
</template>

<script>
export default {
    name: "Review",
};
</script>

<style lang="scss" scoped>
.review {
    @include app-background;
}
</style>
