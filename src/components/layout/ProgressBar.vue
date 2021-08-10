<template>
	<nav class="progressBar">
		<div v-for="item in navItems" :key="item.label">
			<nav-item
				:label="item.label"
				:destination-url="item.destinationUrl"
                :theme="appTheme"
				:current-nav-item="currentNavItem"
				:section-count="item.sectionCount"
				:progress="progress[item.label.toLowerCase()]"
			/>
		</div>
	</nav>
</template>

<script>
import { mapState } from "vuex";
import NavItem from "./NavItem.vue";

export default {
	name: "ProgressBar",
	components: {
		"nav-item": NavItem,
	},

	computed: {
		...mapState(["application", "navigation", "appTheme"]),

		progress() {
			return this.sectionProgress;
		},
		navItems() {
			return this.navigation.navigationItems;
		},
		sectionProgress() {
			return this.application.sectionProgress;
		},
		currentNavItem() {
			return this.$route.meta.navItem;
		}
	}
};
</script>

<style lang="scss" scoped>
.progressBar {
	position: fixed;
	z-index: 5;
	top: 25rem;
	left: 6rem;
}
</style>
