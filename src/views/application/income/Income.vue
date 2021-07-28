<template>
	<div class="income">
		<div class="viewWrapper">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	name: "Income"
};
</script>

<style lang="scss" scoped>
.income {
	@include app-background();
}
</style>
