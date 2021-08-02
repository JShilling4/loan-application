<template>
	<div
		:class="[
			'sk-fading-circle',
			{
				pinwheel: indicatorType == 'standard',
				button: indicatorType == 'button'
			}
		]"
	>
		<div class="sk-circle1 sk-circle"></div>
		<div class="sk-circle2 sk-circle"></div>
		<div class="sk-circle3 sk-circle"></div>
		<div class="sk-circle4 sk-circle"></div>
		<div class="sk-circle5 sk-circle"></div>
		<div class="sk-circle6 sk-circle"></div>
		<div class="sk-circle7 sk-circle"></div>
		<div class="sk-circle8 sk-circle"></div>
		<div class="sk-circle9 sk-circle"></div>
		<div class="sk-circle10 sk-circle"></div>
		<div class="sk-circle11 sk-circle"></div>
		<div class="sk-circle12 sk-circle"></div>
	</div>
</template>

<script>
export default {
	name: "LoadingIndicator",
	props: {
		indicatorType: {
			type: String,
			default: "standard"
		}
	}
};
</script>

<style lang="scss" scoped>
.sk-fading-circle {
	position: absolute;
	top: 50%;
	z-index: 99999;
	width: 90px;
	height: 90px;
	transform: translateY(-50%);

	&.pinwheel {
		left: 50%;
		transform: translateX(-50%);
		background-image: url("~@/assets/images/pinwheel_small.png");
		background-repeat: no-repeat;
		background-position: center;
		background-color: rgba(255, 255, 255, 0.98);
		border-radius: 0.9rem;
		border: 2px solid var(--teal);
	}

	&.button {
		right: 0;
		width: 50px;
		height: 50px;
	}

	.sk-circle {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		padding: 10px;

		&:before {
			content: "";
			display: block;
			margin: 0 auto;
			width: 13%;
			height: 11%;
			background-color: var(--teal, #fff);
			border-radius: 100%;
			animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
		}
	}

	.sk-circle2 {
		transform: rotate(30deg);

		&:before {
			animation-delay: -1.1s;
		}
	}

	.sk-circle3 {
		transform: rotate(60deg);

		&:before {
			animation-delay: -1s;
		}
	}

	.sk-circle4 {
		transform: rotate(90deg);

		&:before {
			animation-delay: -0.9s;
		}
	}

	.sk-circle5 {
		transform: rotate(120deg);

		&:before {
			animation-delay: -0.8s;
		}
	}

	.sk-circle6 {
		transform: rotate(150deg);

		&:before {
			animation-delay: -0.7s;
		}
	}

	.sk-circle7 {
		transform: rotate(180deg);

		&:before {
			animation-delay: -0.6s;
		}
	}

	.sk-circle8 {
		transform: rotate(210deg);

		&:before {
			animation-delay: -0.5s;
		}
	}

	.sk-circle9 {
		transform: rotate(240deg);

		&:before {
			animation-delay: -0.4s;
		}
	}

	.sk-circle10 {
		transform: rotate(270deg);

		&:before {
			animation-delay: -0.3s;
		}
	}

	.sk-circle11 {
		transform: rotate(300deg);

		&:before {
			animation-delay: -0.2s;
		}
	}

	.sk-circle12 {
		transform: rotate(330deg);

		&:before {
			animation-delay: -0.1s;
		}
	}
}

@-webkit-keyframes sk-circleFadeDelay {
	0%,
	39%,
	100% {
		opacity: 0;
	}

	40% {
		opacity: 1;
	}
}

@keyframes sk-circleFadeDelay {
	0%,
	39%,
	100% {
		opacity: 0;
	}

	40% {
		opacity: 1;
	}
}
</style>
