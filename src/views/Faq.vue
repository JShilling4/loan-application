<template>
	<div class="page-wrapper">
		<header class="external-header">
			<div class="container">
				<div class="top">
					<div class="logo-block">
						<router-link to="/">
							<img
								class="ruoff-logo"
								alt="@Resources.LocalizedText.RuoffHomeMortgage"
								src="https://webresources.ruoff.com/logo-horizontal-white-nmls/png/225/0"
							/>
						</router-link>
						<a href="javascript:history.back()" class="backLink">
							<font-awesome-icon :icon="['fas', 'angle-left']" /> <span data-i18n="goBack">Go Back</span>
						</a>
					</div>
					<language-selector />
				</div>

				<h1 class="pageHeading" data-i18n="faq">Frequently Asked Questions</h1>

				<div class="topics">
					<div class="container">
						<div class="topicHeading-container">
							<h2 class="topicHeading" data-i18n="topics">Topics</h2>
							<div class="keywordSearch-wrapper">
								<input type="text" class="keywordSearch" placeholder="Search keyword" />
								<font-awesome-icon :icon="['far', 'search']" class="icon" />
							</div>
						</div>
						<ul class="topicList">
							<li
								v-for="(topic, index) in faqData.topics"
								:key="topic.id"
								:class="index == selectedTopicIndex ? 'topic selected' : 'topic'"
								@click="getFaqsByTopicId(topic.id)"
							>
								{{ topic.name }}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>
		<section class="faqSection">
			<div class="container">
				<h2 class="faqHeading">{{ this.selectedTopicName }}</h2>
				<div class="faq-container">
					<div
						v-for="(faq, index) in faqList"
						:key="faq.id"
						:class="['faq', { open: faq.isOpen }]"
						@click="openFaq(index)"
					>
						<div class="question-container">
							<p class="question">
								Q:
								<span class="text">{{ faq.questionText }}</span>
							</p>
							<i v-if="faq.videoUrl !== null" class="fas fa-play-circle playIcon"></i>
							<i class="fas fa-chevron-right indicatorIcon"></i>
						</div>

						<div :ref="`answerContainer${index}`" class="answer-container">
							<div :ref="`answer${index}`" class="answer">
								A:
								<span class="text" v-html="faq.answerText" />
								<div v-if="faq.videoUrl !== null" class="video-container">
									<iframe :src="faq.videoUrl" height="175" frameborder="0" allow="fullscreen">
									</iframe>
									<figcaption>
										{{ faq.videoCaption }}
									</figcaption>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="unansweredQuestion-container">
			<div class="container chatTrigger">
				<span class="text" data-i18n="dontSeeYourQuestion">Don't see your question?</span>
				<div class="icon-block">
					<font-awesome-icon :icon="['fal', 'comment']" class="icon" />
					<span>Chat</span>
				</div>
			</div>
		</section>

		<external-footer />
	</div>
</template>

<script>
import faqData from "@/assets/resources/faqs.json";
import LanguageSelector from "@/components/shared/LanguageSelector.vue";
import ExternalFooter from "@/components/layout/ExternalFooter.vue";

export default {
	name: "Faq",

	components: {
		"language-selector": LanguageSelector,
		"external-footer": ExternalFooter,
	},

	data() {
		return {
			faqData: faqData,
			faqList: [],
			selectedTopicId: 0,
		};
	},

	computed: {
		selectedTopicIndex() {
			return faqData.topics.findIndex((topic) => topic.id == this.selectedTopicId);
		},
		selectedTopicName() {
			return faqData.topics.find((topic) => topic.id == this.selectedTopicId).name;
		},
	},

	methods: {
		getFaqsByTopicId(topicId) {
			this.selectedTopicId = topicId;
			if (topicId !== 0) {
				this.faqList = faqData.faqs.filter((faq) => faq.topicId == topicId);
			} else {
				this.faqList = [...faqData.faqs];
			}
		},
		openFaq(index) {
			if (this.faqList[index].isOpen) {
				this.faqList[index].isOpen = false;
				this.$refs[`answerContainer${index}`][0].style.height = 0;
			} else {
				this.faqList[index].isOpen = true;
				this.$refs[`answerContainer${index}`][0].style.height =
					this.$refs[`answer${index}`][0].offsetHeight + 20 + "px";
			}
		},
		closeAllFaqs() {
			this.faqList.forEach((faq) => (faq.isOpen = false));
		},
	},

	// LIFECYCLE HOOKS
	mounted() {
		this.faqList = [...faqData.faqs];
		for (let i = 0; i < this.faqList.length; i++) {
			this.faqList[i], "isOpen", false;
		}
	},
};
</script>

<style lang="scss" scoped>
// header overrides
.external-header {
	padding: 2rem 0;
	.top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}
	.logo-block {
		position: relative;
		.backLink {
			display: block;
			margin-top: 2rem;
			color: #fff;
			&:hover {
				color: $orange;
			}
		}
	}
}

.container {
	max-width: 1200px;
	margin: 0 auto;
}

// .page-wrapper {
// 	.container {
// 		padding: 0 2rem;
// 	}
// }

.pageHeading {
	color: #fff;
	text-align: center;
	margin-bottom: 3rem;
	@include breakpoint(tablet-land) {
	}
	@include breakpoint(mobile) {
		font-size: 24px;
	}
}

// TOPICS
div.topics {
	padding-bottom: 0;
	color: rgba(255, 255, 255, 0.829);

	.topicHeading-container {
		display: flex;
		align-items: center;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
	}
	.topicHeading {
		font-weight: normal;
		margin-right: 1.4rem;
	}

	.keywordSearch-wrapper {
		position: relative;
		.keywordSearch {
			max-width: 18rem;
			height: 2.5rem;
			padding: 0.5rem 3rem 0.2rem 1rem;
			background-color: transparent;
			border: 1px solid rgba(255, 255, 255, 0.452);
			border-radius: 2rem;
			color: #fff;
			outline: none;
			&::placeholder {
				color: rgba(255, 255, 255, 0.507);
			}
		}
		.icon {
			position: absolute;
			top: 0.5rem;
			right: 1rem;
		}
	}

	.topicList {
		display: flex;
		flex-wrap: wrap;
		.topic {
			padding: 0.75rem 1rem 0.5rem;
			margin-bottom: 2rem;
			cursor: pointer;
			letter-spacing: 1px;
			transition: color 0.3s, background-color 0.3s;
			border: 1px solid rgba(255, 255, 255, 0.452);
			border-radius: 2rem;
			@include breakpoint(tablet-port) {
				font-size: 12px;
			}
			@include breakpoint(mobile) {
				font-size: 10px;
			}
			&:not(:last-child) {
				margin-right: 2rem;
			}

			&:hover {
				color: $orange;
			}

			&.selected {
				// color: $orange;
				// text-shadow: 1px 0 0 $orange;
				background-color: #e7730d;
				color: #fff;
				border-color: transparent;
			}
		}
	}
}

// FAQS
$accordion-transition-time: 0.3s;
section.faqSection {
	padding: 1rem 2rem 0;
	min-height: 100vh;

	.container {
		padding: 0;
	}

	.faqHeading {
		color: $orange;
		font-weight: 500;
		font-size: 2.7rem;
		margin-bottom: 1.5rem;
	}

	.faq {
		margin-bottom: 2rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.452);
		padding-bottom: 1.5rem;
		cursor: pointer;
		.question-container {
			position: relative;
			display: flex;
			font-size: 18px;
			padding: 1rem 3rem 1rem 0;
			.question {
				margin-right: 1rem;
				color: #fff;
				font-weight: 500;
				letter-spacing: 0.8px;
				transition: color $accordion-transition-time;
				line-height: 1.5;
				@include breakpoint(mobile) {
					font-size: 15px;
				}
			}

			.playIcon,
			.indicatorIcon {
				color: $teal;
				transition: transform $accordion-transition-time, color $accordion-transition-time;
			}

			.indicatorIcon {
				position: absolute;
				right: 0;
				font-size: 24px;
			}
		}

		.answer-container {
			padding: 0 3rem;
			height: 0;
			opacity: 0;
			overflow-y: hidden;
			transition: height $accordion-transition-time, padding $accordion-transition-time,
				opacity $accordion-transition-time;
			@include hardware-acceleration;
			@include breakpoint(mobile) {
				padding: 0 2rem;
			}
			@include breakpoint(mobile-small) {
				padding: 0 0;
			}
			.answer {
				color: $orange;
				line-height: 1.75;
				@include breakpoint(mobile) {
					font-size: 15px;
				}
				.text {
					color: #fff;
					::v-deep {
						a {
							color: #0fe6b3 !important;
							text-decoration: underline;
							&:hover {
								color: $orange;
							}
						}
					}
				}
			}

			.video-container {
				margin-top: 0.5rem;
				figcaption {
					color: #fff;
					font-style: italic;
					font-size: 14px;
					small {
						color: rgba(255, 255, 255, 0.589);
					}
				}
				iframe {
					border: 1px solid rgba(255, 255, 255, 0.699);
				}
			}
		}

		&.open .question {
			color: $orange;
		}

		&.open .answer-container {
			padding: 1rem 3rem;
			opacity: 1;
			@include breakpoint(mobile) {
				padding: 2rem 2rem;
			}
			@include breakpoint(mobile-small) {
				padding: 2rem 0;
			}
		}

		&.open .playIcon {
			color: #fff;
		}

		&.open .indicatorIcon {
			transform: rotate(90deg);
			color: $orange;
		}
	}
}

section.unansweredQuestion-container {
	margin-top: 4rem;
	padding: 3rem 0;
	background-color: $gray-background;
	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10rem;
		cursor: pointer;
		@include breakpoint(tablet-port) {
			padding: 0 2rem;
		}
	}
	.text {
		color: $blue-green;
		font-weight: 500;
		padding-right: 3rem;
		line-height: 1.5;
	}
	.icon-block {
		display: flex;
		align-items: center;
		.icon {
			color: $orange;
			margin-right: 1rem;
			transform: scaleX(-1);
			font-size: 2rem;
		}
		span {
			color: $blue-green;
			font-weight: 500;
			text-decoration: underline;
		}
	}
}
</style>
