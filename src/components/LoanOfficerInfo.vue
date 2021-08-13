<template>
	<div class="loanOfficerInfo">
		<img :src="avatarUrl" class="avatar" alt="" />
		<!-- <p class="name">{{ name }}</p> -->
		<!-- <p class="nmls">NMLS: {{ nmls }}</p> -->
	</div>
</template>

<script>
export default {
	name: "LoanOfficerInfo",
	props: {
		name: {
			type: String,
			required: true
		},
		avatarUrl: {
			type: String,
			required: true
		},
		nmls: {
			type: String,
			required: true
		}
	}
};
</script>

<style lang="scss" scoped>
.loanOfficerInfo {
	display: flex;
	flex-direction: column;
	align-items: center;
    margin-left: 2rem;
	.avatar {
		border-radius: 50%;
		margin-bottom: 5px;
		width: 80px;
	}
	.name,
	.nmls {
		color: #fff;
		text-align: center;
	}

	.nmls {
		font-size: 12px;
	}
}
</style>
