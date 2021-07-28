<template>
	<div class="property">
		<div class="viewWrapper">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	name: "Property",
};
</script>

<style lang="scss" scoped>
.property {
	@include app-background();
}
</style>
