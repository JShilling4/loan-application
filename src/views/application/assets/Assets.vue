<template>
	<div class="assets">
		<div class="viewWrapper">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	name: "Assets",
};
</script>

<style lang="scss" scoped>
.assets {
	@include app-background;
}
</style>
