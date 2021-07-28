<template>
	<div class="about">
		<div class="viewWrapper">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	name: "About",
};
</script>

<style lang="scss" scoped>
.about {
	@include app-background();
}
</style>
