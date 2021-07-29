<template>
	<div :class="['learn-more', classList]">
		<span class="circle" aria-hidden="true">
			<span class="icon arrow"></span>
		</span>
		<span class="text">Learn More</span>
	</div>
</template>

<script>
export default {
	name: "LearnMoreLink",
	props: {
		classList: {
			type: String,
			default: "",
		},
	},
};
</script>

<style lang="scss" scoped>
div.learn-more {
	position: relative;
	display: inline-block;
	cursor: pointer;
	outline: none;
	border: 0;
	vertical-align: middle;
	text-decoration: none;
	background: transparent;
	padding: 0;
	font-size: inherit;
	font-family: inherit;
	width: 19.2rem;
	height: auto;

	&:hover .circle .icon.arrow {
		background: #fff;
		transform: translate(1rem, 0);
		&:before {
			border-color: #fff;
		}
	}

	&:hover .text {
		color: #fff;
	}

	&:hover .circle {
		width: 100%;
		background-color: var(--blue-green);
	}

	.circle {
		transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
		position: relative;
		display: block;
		margin: 0;
		width: 4.8rem;
		height: 4.8rem;
		background: #fff;
		border: 1px solid var(--blue-green);
		border-radius: 26px;
		.icon {
			transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
			position: absolute;
			top: 0;
			bottom: 0;
			left: 10px;
			width: 18px;
			height: 2px;
			background: none;
			margin: auto;

			&:before {
				position: absolute;
				content: "";
				top: -4px;
				right: 1px;
				width: 10px;
				height: 10px;
				border-top: 2px solid var(--blue-green);
				border-right: 2px solid var(--blue-green);
				transform: rotate(45deg);
			}
		}
	}

	.text {
		transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 12px 0;
		margin: 0 0 0 26px;
		color: var(--blue-green);
		font-size: 18px;
		font-weight: 500;
		line-height: 1.5;
		text-align: center;
	}

	&.dark {
		.text {
			color: #fff;
		}
		&:hover {
			.text {
				color: var(--blue-green);
			}
			.circle {
				background-color: #fff;
			}

			.circle .icon.arrow {
				background-color: var(--blue-green);
				&:before {
					border-color: var(--blue-green);
				}
			}
		}
	}
}
</style>
