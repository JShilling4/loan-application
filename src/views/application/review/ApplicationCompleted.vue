<template>
  <div class="appCompleted">
    <h1 class="appHeading">Application Completed!</h1>
    <form class="pageForm">
      <view-controls
        @next-view="$router.push('/portal')"
        :include-back="false"
        next-text="Go to Portal"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "ApplicationCompleted",
};
</script>

<style lang="scss" scoped>
.appCompleted {
  @include app-background;
}
</style>
