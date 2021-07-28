<template>
	<div class="identity">
		<div class="viewWrapper">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	name: "Identity",
};
</script>

<style lang="scss" scoped>
.identity {
	@include app-background();
}
</style>
