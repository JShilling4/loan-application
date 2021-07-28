<template>
	<header class="internal-header">
		<img
			class="logo"
			src="@/assets/images/loanButlerColorWithStone_logo.png"
			alt="ruoff logo"
			@click="$router.push('/')"
		/>

		<div class="AlertForUserBasedOnApp"></div>

		<div class="header-controls-block">
			<a href="/faq" class="faqLink">FAQ</a>
			<div class="contactInfoTrigger">
				<span class="link">Contact</span>
				<div class="contact-tooltip">
					<a href="" class="tooltipPhone" style="display: none"></a>
					<a href="mailto:beth.harris@ruoff.com" class="tooltipEmail">beth.harris@ruoff.com</a>
					<span class="tooltipNmls">NMLS: 234510 </span>
					<span class="tooltipNmls">NMLS: 234510 </span>
					<span class="tooltipNmls">NMLS: 234510 </span>
					<span class="tooltipNmls">NMLS: 234510 </span>
					<span class="tooltipNmls">NMLS: 234510 </span>
				</div>
			</div>
			<a class="signOut" href="/Account/SignOut">Log Out</a>
		</div>

		<div class="preferredLO">
			<loan-officer-info
				avatar-url="https://a.ruoff.com/image/E48AF1FFD48BFECE7B48326C40DC40E7/size/75/type/ShortcutIcon"
				name="Clint Morgan"
				nmls="543452"
			/>
		</div>
	</header>
</template>

<script>
import LoanOfficerInfo from "@/components/LoanOfficerInfo.vue";

export default {
	name: "PortalHeader",
	components: {
		// "language-selector": () => import("@/components/shared/LanguageSelector.vue"),
		"loan-officer-info": LoanOfficerInfo,
	},
	props: {
		currentView: {
			type: String,
		},
	},
	computed: {
		loAvatarShouldShow() {
			if (this.currentView == "application" || this.currentView == "portal") {
				return true;
			}
			return false;
		},
	},
};
</script>

<style lang="scss" scoped>
.internal-header {
	position: fixed;
	display: flex;
	align-items: center;
	width: 1240px;
	left: 50%;
  transform: translateX(-50%);
	padding: 2rem 2rem 1.5rem;

	@include breakpoint(tablet-land) {
		align-items: unset;
		padding-bottom: 4.3rem;
	}

	@include breakpoint(mobile) {
		flex-wrap: wrap;
	}

	.logo {
		height: 80px;

		@include breakpoint(tablet-land) {
			height: 50px;
		}

		@include breakpoint(mobile) {
			height: 35px;
		}
	}

	.header-controls-block {
		display: flex;
		align-items: center;
		align-self: flex-end;
		margin: 0 0 2px auto;
		cursor: pointer;

		@include breakpoint(tablet-land) {
			// flex-direction: column;
			// justify-content: flex-end;
			margin: 0 0 -3rem auto;
		}

		@include breakpoint(mobile) {
		}

		.signOut,
		.contactInfoTrigger,
		.faqLink {
			margin-right: 2rem;
			color: $teal;
			text-decoration: underline;

			@include breakpoint(tablet-land) {
				margin-left: auto;
				margin-right: 0;
				&:not(.contactInfoTrigger) {
					margin-left: 2rem;
				}
			}

			&:hover {
				color: $orange;
			}
		}

		.contactInfoTrigger {
			position: relative;
			@include breakpoint(tablet-land) {
				position: absolute;
				left: 2rem;
				bottom: -11.75rem;
			}

			@include breakpoint(mobile) {
				bottom: -11rem;
			}

			.contact-tooltip {
				display: none;
				position: absolute;
				left: 50%;
				bottom: 2.5rem;
				transform: translateX(-50%);
				background-color: $blue-dark;
				padding: 1rem;
				border-radius: 5px;
				color: #fff;
				@include breakpoint(tablet-land) {
					left: 0;
					transform: translateX(0);
					z-index: 15;
				}
				a {
					color: #fff;
				}
				span {
					display: block;
					&:last-child {
						margin-top: 3px;
					}
				}
			}
		}
	}

	.preferredLO {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-left: 1.2rem;

		@include breakpoint(tablet-land) {
			position: absolute;
			top: 13.5rem;
			margin-left: 0;
			align-items: flex-start;
		}

		@include breakpoint(mobile) {
			top: 11.5rem;
		}

		.lo-info-block {
			margin-top: 0.5rem;
			text-align: center;
			color: $blue-green;
		}
	}
}
</style>
