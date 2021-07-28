<template>
  <div class="coborrowerDemographics">
    <h1 class="appHeading">Coborrower Demographics</h1>
    <form class="pageForm">
      <p class="pageCopy">
        The following information is requested by the federal government for
        certain types of loans related to a dwelling in order to monitor the
        lender's compliance with equal credit opportunity, fair housing, and
        home mortgage disclosure laws. You are not required to furnish this
        information, but are encouraged to do so. You may select one or more
        designations for "Race." The law provides that a lender may not
        discriminate on the basis of this information, or on whether you choose
        to furnish it. However, if you choose not to furnish the information and
        you have made this application in person, under federal regulations the
        lender is required to note ethnicity, race, and gender on the basis of
        visual observation or surname. If you do not wish to furnish the
        information, please check below.
      </p>

      <view-controls @next-view="$router.push('/review')" />
    </form>
  </div>
</template>

<script>
export default {
  name: "coborrowerDemographics",
};
</script>

<style lang="scss" scoped>
.coborrowerDemographics {
  .pageCopy {
    font-size: 16px;
  }
}
</style>
