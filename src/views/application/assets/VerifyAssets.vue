<template>
	<div class="voa">
		<h1 class="appHeading">Verify Assets With Finicity</h1>
		<div class="body-wrapper">
			<view-controls @next-view="submitPage()" />
		</div>
	</div>
</template>

<script>
import assets from "@/includes/applicationMixins/assets";

export default {
	name: "VerifyAssets",
	mixins: [assets],
	methods: {
		submitPage() {
			this.editSectionProgress(2);
			this.$router.push("/identity/declarations");
		}
	}
};
</script>

<style lang="scss" scoped>
.body-wrapper {
	max-width: 500px;
	margin: 0 auto;
}
</style>
