<template>
    <div class="coborrowerDeclarations">
        <h1 class="appHeading">Coborrower Declarations</h1>
        <form class="pageForm">
            <p class="pageCopy">
                The federal government requires us to ask the questions below.
            </p>

            <view-controls
                @advance-app="submitPage()"
                @retreat-app="$router.go(-1)"
            />
        </form>
    </div>
</template>

<script>
export default {
    name: "CoborrowerDeclarations",
    methods: {
        submitPage() {},
    },
};
</script>

<style lang="scss" scoped>
.coborrowerDeclarations {
}
</style>
