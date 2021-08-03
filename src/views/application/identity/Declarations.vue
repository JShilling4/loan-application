<template>
    <div class="declarations">
        <h1 class="appHeading">Declarations</h1>
        <form class="pageForm">
            <p class="pageCopy">
                The federal government requires us to ask the questions below.
            </p>

            <view-controls @next-view="$router.push('/identity/coborrower-declarations')" />
        </form>
    </div>
</template>

<script>
export default {
    name: "Declarations",
};
</script>

<style lang="scss" scoped>
.declarations {
}
</style>
