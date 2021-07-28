<template>
  <div class="coborrowerDeclarations">
    <h1 class="appHeading">Coborrower Declarations</h1>
    <form class="pageForm">
      <p class="pageCopy">
        The federal government requires us to ask the questions below.
      </p>

      <view-controls @next-view="$router.push('/identity/demographics')" />
    </form>
  </div>
</template>

<script>
export default {
  name: "CoborrowerDeclarations",
};
</script>

<style lang="scss" scoped>
.coborrowerDeclarations {
}
</style>
