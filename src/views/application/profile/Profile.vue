<template>
	<div class="profile">
		<div class="viewWrapper">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	name: "Profile",
};
</script>

<style lang="scss" scoped>
.profile {
	@include app-background();

	.viewWrapper {
		width: 350px;
		margin: 0 auto;
	}
}
</style>
