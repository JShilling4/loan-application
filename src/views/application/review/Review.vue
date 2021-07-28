<template>
  <div class="review">
    <h1 class="appHeading">Let's review your application!</h1>
    <form class="pageForm">
      <view-controls
        @next-view="$router.push('/application-completed')"
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
