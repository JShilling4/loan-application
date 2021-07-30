<template>
    <div class="portal">
        <main>
            <div class="home-controls">
                <contrast-toggle />

                <language-selector
                    theme="light"
                    :is-inline="true"
                />
            </div>

            <milestone-timeline
                :milestones="milestones"
                :milestone-progress="milestoneProgress"
            />

            <div class="file-update">
                <h3 class="heading">Latest File Update:&nbsp;</h3>
                <p class="update">
                    {{ sortedFileUpdates[0].text }}
                    <span
                        v-if="fileUpdates.length > 1"
                        class="previousUpdatesTrigger"
                    >Previous Updates...</span>
                </p>
            </div>

            <section class="card-container container">

                <div class="card-column-1">
                    <div class="profile-card">
                        <div class="heading-container --profile">
                            <h2 class="heading">Profile</h2>
                            <i class="fas fa-angle-down"></i>
                        </div>

                        <div class="card-body">

                            <div class="id-container">
                                <div class="text-column">
                                    <p class="name">Jtest2 Testerson</p>
                                    <p class="phone">555-555-5555 </p>
                                    <p class="email">jtest2@testing.com</p>
                                </div>
                            </div>

                            <div class="loanInfo-container">
                                <div class="info-group">
                                    <label class="label">Current Loan Status:</label>
                                    <span class="value">Documents Uploaded</span>
                                </div>
                                <div class="info-group">
                                    <label class="label">
                                        Loan Number <span class="accent">(Currently Viewing):</span>
                                    </label>
                                    <span class="value loanNumber">
                                        9800000024009
                                    </span>
                                    <button class="btn green-clear jumpToHistory">Jump to Loan History</button>
                                </div>
                                <div class="info-group">
                                    <label class="label">Property:</label>
                                    <span class="value">TBD, Syracuse, IN </span>
                                </div>
                                <div class="info-group">
                                    <label class="label">Loan Amount:</label>
                                    <span class="value">$144,000</span>
                                </div>
                                <div class="info-group">
                                    <label class="label">Interest Rate:</label>
                                    <span class="value">Details soon </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="start-application-container-desktop"
                        style="display: block;"
                    >
                        <button class="btn green-fill start-application-btn-desktop">
                            Start New Application
                        </button>
                    </div>
                </div>

                <div class="card-column-2">
                    <div class="toDoList">
                        <div class="heading-container --mortgageTodoList">
                            <h2 class="heading">Your Mortgage To-Do List</h2>
                            <i class="fas fa-angle-down"></i>
                        </div>

                        <div class="card-body card-body--toDoList --open">

                            <div class="signatures-needed">
                                <h3 class="section-heading">Signatures Needed</h3>
                                <p class="none-message">There are no signatures needed at this time.</p>

                            </div>

                            <div class="docs-needed">
                                <div class="section-heading">
                                    <h3>
                                        Document Upload <br>
                                    </h3>
                                    <button class="borrowerUpload-button">
                                        Upload
                                    </button>
                                </div>
                                <div class="section-heading">
                                    <h3>
                                        <span>(Needed for Requests)</span>
                                    </h3>
                                </div>

                                <p class="none-message">No documents have been requested by Ruoff yet. Upload any relevant documents you can.</p>
                            </div>
                        </div>
                    </div>

                    <div
                        class="loan-history"
                        id="loanHistory"
                    >
                        <div class="heading-container loanHistory">
                            <h2 class="heading">Loan History</h2>
                            <i class="fas fa-angle-down"></i>
                        </div>

                        <div class="card-body">
                            <div
                                class="incompleteApplicationContainer loan-container"
                                style="display: none;"
                            >
                                <div class="incompleteApplicationDetails">
                                    <div class="incompleteApplicationLabel">
                                        Incomplete Application
                                    </div>
                                    <div>
                                        <div class="currentStep"></div>
                                        <div class="startDate"></div>
                                        <i class="fas fa-trash deleteApplication"></i>
                                    </div>
                                </div>
                                <button class="btn green-clear resumeApplication">Resume</button>
                            </div>

                            <div class="loan-container">
                                <div class="column1">
                                    <span class="loanNumber">
                                        9800000024009 </span>
                                    <span class="address">
                                        TBD<br>
                                        Syracuse, IN </span>
                                </div>
                                <p class="viewingNote">Viewing</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-column-3">

                    <div class="uploaded-docs">
                        <div class="heading-container">
                            <h2 class="heading">Uploaded Documents</h2>
                            <i class="fas fa-angle-down"></i>
                        </div>
                        <div
                            class="card-body document-list needsMaxHeight"
                            data-max-height="384"
                            style="max-height: 384px;"
                        >
                            <form
                                action="/home/opendocument?fileName=newest2.pdf&amp;filePath=295181-617695.pdf"
                                method="post"
                                target="_blank"
                            >
                                <div class="upload">
                                    <div class="fileName-wrapper">
                                        <button
                                            type="submit"
                                            class="document uploadFileName"
                                        >
                                            <span class="text">newest2.pdf</span>
                                        </button>
                                        <div class="fileName-tooltip">
                                            newest2.pdf
                                        </div>
                                        <i class="fas fa-check"></i>
                                    </div>
                                    <div class="file-details">
                                        <button
                                            type="button"
                                            class="documentRequest"
                                        >
                                            <span class="text">Borrower ID</span>
                                        </button>
                                        <div class="docRequest-tooltip">
                                            Borrower ID
                                        </div>
                                        <span class="dateUploaded">07-30-21</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="completed-disclosures">
                        <div class="heading-container">
                            <h2 class="heading">Completed Disclosures</h2>
                            <i class="fas fa-angle-down"></i>
                        </div>

                        <div class="card-body document-list">
                            <p class="none-message">There are no completed disclosures to view at this time.</p>
                        </div>
                    </div>
                </div>

                <div class="filler-column"></div>
            </section>
        </main>
    </div>
</template>

<script>
import { mapState } from "vuex";
import LanguageSelector from "@/components/LanguageSelector.vue";
import MilestoneTimeline from "@/components/portal/MilestoneTimeline.vue";
import ContrastToggle from "@/components/portal/ContrastToggle.vue";

export default {
    name: "Portal",
    components: {
        "language-selector": LanguageSelector,
        "milestone-timeline": MilestoneTimeline,
        "contrast-toggle": ContrastToggle,
    },
    computed: {
        ...mapState(["portal"]),
        milestones() {
            return this.portal.milestones;
        },
        milestoneProgress() {
            return this.portal.milestoneProgress;
        },
        fileUpdates() {
            return this.portal.fileUpdates;
        },
        sortedFileUpdates() {
            return this.portal.fileUpdates
                .slice()
                .sort(
                    (a, b) =>
                        new Date(b.loggedDatetime) - new Date(a.loggedDatetime)
                );
        },
    },
};
</script>

<style lang="scss">
:root {
    --portal-gray: #a5a4a4;
    --container-border-color: #adadad;
    --standard-font-color: #929292;

    --main-container-width: 1200px;
    --ms-timeline-width: 1200px;
    --ms-track-width: 15rem;
}
body {
    font-size: 1.4rem;
}
</style>

<style lang="scss" scoped>
.portal {
    h1 {
        margin-top: 8rem;
        color: var(--blue-green);
    }
    h3 {
        color: var(--blue-green);
    }
}

.home-controls {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    max-width: var(--ms-timeline-width);
    margin: 0 auto;
    padding-top: 1rem;
    padding-bottom: 30px;
    font-weight: 700;
    @include breakpoint(tablet-land) {
        margin: 0;
    }
    @include breakpoint(tablet-port) {
        padding-bottom: 0.5rem;
    }
    @include breakpoint(mobile) {
        padding-top: 1rem;
    }
}

.file-update {
    display: flex;
    justify-content: center;
    margin: 3rem auto;
    max-width: 1200px;
    .heading {
        white-space: nowrap;
        font-weight: 800;
        font-size: 1.4rem;
    }
    .update {
        max-width: 100rem;
        margin-left: 0.5rem;
        font-weight: 600;
        color: #00485c;
        line-height: 1.5;

        .previousUpdatesTrigger {
            margin-left: 0.5rem;
            color: var(--teal);
            text-decoration: underline;
            cursor: pointer;
            transition: color 0.3s;
            font-weight: 600;

            @include breakpoint(tablet-land) {
                color: #fff;
            }

            &:hover {
                color: var(--orange);
            }
        }
    }
}

.card-container {
	display: flex;
	align-items: flex-start;
	margin-top: 2rem;
	justify-content: center;
    max-width: 1200px;
    margin: 0 auto;

	@include breakpoint(laptop) {
		margin-top: 4rem;
		flex-wrap: wrap;
	}

	@include breakpoint(tablet-land) {
		margin-top: 0.25rem;
		width: 100%;
	}

    .card-body {
        transition: max-height .5s;
        @include breakpoint(tablet-land) {
            max-height: 0;
            overflow-y: hidden;
        }
        &.card-body--toDoList {
            @include breakpoint(tablet-land) {
                max-height: 100%;
                overflow-y: hidden;
            }
        }
    }
}

.card-column-1 .heading-container,
.card-column-2 .heading-container,
.card-column-3 .heading-container {
	display: flex;
	justify-content: space-between;
	color: #fff;
	background: linear-gradient(to right, var(--blue-dark), var(--blue-green));
	padding: 2rem;
	letter-spacing: 1px;
	cursor: pointer;
	border-top-right-radius: 5px;
	border-top-left-radius: 5px;
}

.card-column-1 .heading,
.card-column-2 .heading,
.card-column-3 .heading {
	font-weight: 700;
	@include breakpoint(mobile) {
		font-size: 1.5rem;
	}
	& + i.fa-angle-down {
		@media screen and (min-width: 768px) {
			display: none;
		}
	}
}

.card-column-2 .none-message,
.card-column-3 .none-message {
	padding: 1.5rem 2rem;
	/*  text-align: center;*/
	font-style: italic;
}

/* CARD COLUMN 1 */
.card-column-1 {
	width: 28%;
	order: 1;

	@include breakpoint(laptop) {
		width: 40%;
		min-width: 280px;
		margin-right: auto;
		margin-left: 2rem;
		min-width: 350px;
		margin-bottom: 4rem;
	}

	@include breakpoint(tablet-land) {
		width: 100%;
		order: 2;
		margin: 0;
		min-width: unset;
	}

	.start-application-container-desktop {
		margin-top: 3rem;
		display: none;
		/*padding-left: 20%;*/
		.start-application-btn-desktop {
			width: 100%;
		}
	}
}

/* Profile card */
.profile-card {
	background-color: #fff;

	.id-container {
		display: flex;
		align-items: center;
		line-height: 1.5;
		padding: 2rem;
		border: 1px solid var(--container-border-color);
		border-top: none;
		font-weight: 700;
	}

	.loanInfo-container {
		padding: 2rem;
		border: 1px solid var(--container-border-color);
		border-top: none;

		.info-group {
			&:not(:last-of-type) {
				margin-bottom: 2rem;
			}

			.label {
				display: block;
				margin-bottom: 0.2rem;
				color: var(--standard-font-color);
				font-weight: 700;
				span.accent {
					color: var(--teal);
					font-style: italic;
				}
			}

			.value {
				color: var(--blue-green);
				font-weight: 800;
				&.loanNumber {
					color: var(--teal);
				}
			}
		}
		.jumpToHistory {
			display: block;
			width: 18rem;
			margin-top: 0.5rem;
		}
	}
}

/* CARD COLUMN 2 */
.card-column-2 {
	width: 35%;
	margin: 0 4rem;
	order: 2;

	@include breakpoint(laptop) {
		width: 40%;
		order: 3;
		margin: 0 auto 0 2rem;
		min-width: 350px;
	}

	@include breakpoint(tablet-land) {
		width: 100%;
		margin: 0.2rem 0 0;
		order: 3;
		min-width: unset;
	}

	.section-heading {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: var(--blue-green);
		letter-spacing: normal;
		background-color: transparent;
		border: 1px solid var(--container-border-color);
		border-bottom: none;
		font-weight: 800;
		padding: 1.5rem 2rem;
		h3 span {
			font-size: 14px;
			font-weight: 700;
		}
	}
}

/* Signatures needed & Payments Needed section */
.signatures-needed,
.payments-needed {
	background-color: #fff;
	border-left: 1px solid var(--container-border-color);
	border-right: 1px solid var(--container-border-color);

	.section-heading {
		border-left: none;
		border-right: none;
		border-bottom: 1px solid var(--container-border-color);
	}

	.maintenance-message {
		color: var(--red);
		padding: 1rem;
	}

	.action-area {
		padding: 1.5rem 0;
		margin: 0 4rem;

		&:not(:last-child) {
			border-bottom: 1px solid var(--container-border-color);
		}
	}

	.item-container {
		display: flex;
		align-items: center;

		.icon {
			margin-right: 1rem;
			width: 14px;
			color: var(--teal-dark);
		}

		.item {
			margin-right: 2rem;

			.signerName {
				display: block;
				color: var(--blue-green);
				font-size: 12px;
			}
		}

		.btn {
			margin-left: auto;
			min-width: 8rem;
		}

		.lockedMessage {
			display: none;
		}

		.btn.locked {
			&:hover .lockedMessage {
				position: absolute;
				left: -2rem;
				bottom: 3rem;
				background-color: var(--teal-dark);
				border-radius: var(--app-border-radius);
				padding: 0.75rem;
				color: #fff;
				display: block;
				font-weight: 500;
				width: 13rem;
			}
		}
	}
}

/* Work-ahead upload section*/
.borrowerUpload-button {
	border: 1px solid var(--teal-dark);
	color: var(--teal-dark);
	background-color: transparent;
	padding: 0.5rem 0;
	width: 8rem;
	font-weight: 600;
	font-family: "Nunito Sans", sans-serif;
	text-align: center;
	letter-spacing: 1px;
	border-radius: var(--app-border-radius);
	font-size: 12px;
	cursor: pointer;
	transition: color 0.3s, background-color 0.3s;
	outline: none;

	&:hover {
		color: #fff;
		background-color: var(--teal-dark);
	}
}

/* Workahead Modal */
.modal.borrowerUpload {
	.modal-content {
		min-width: 65rem;
		max-width: 65rem;
		max-height: 98%;
		overflow-y: auto;
		-ms-overflow-style: auto;
		// firefox scrollbar styles
		scrollbar-color: #142f42 #f1f1f1;
		scrollbar-width: thin;

		@include breakpoint(laptop) {
			width: 92%;
			min-width: unset;
		}

		&::-webkit-scrollbar {
			width: 10px;
		}

		&::-webkit-scrollbar-thumb {
			background-color: #c4c4c4;
			border-radius: 10px;
			border: 2px solid #fff;
		}

		.modal-header {
			display: flex;
			justify-content: flex-end;
			padding: 2rem 2rem 0;
		}

		.modal-body {
			height: 100%;
			padding: 0 4rem 2rem;

			.heading {
				font-size: 2rem;
				margin-bottom: 2rem;
				margin-top: -1.5rem;
				color: var(--blue-green);
				font-weight: 800;
			}

			.fileList {
				margin-bottom: 2rem;

				.uploadItem {
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #c8c8c8;
					padding: 1.5rem 0 0.5rem;
					color: var(--teal);

					@include breakpoint(tablet-port) {
						flex-wrap: wrap;
					}

					.removal-wrapper {
						margin-bottom: 0.5rem;
						max-width: 30rem;
						overflow-x: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;

						@include breakpoint(tablet-port) {
							width: 100%;
						}
					}

					.fa-trash {
						color: var(--portal-gray);
						margin-right: 1rem;
						cursor: pointer;
						transition: color 0.3s;

						&:hover {
							color: var(--red);
						}
					}
				}

				.requestType-container {
					position: relative;
					cursor: pointer;

					&:hover .type-list {
						display: block;
					}

					.input-wrapper {
						&:after {
							display: flex;
							align-items: center;
							justify-content: center;
							font-family: "Font Awesome 5 Pro";
							content: "\f107";
							position: absolute;
							right: 0;
							top: 0;
							background-color: var(--teal-dark);
							font-weight: 900;
							color: #fff;
							border-radius: 50%;
							height: 27px;
							width: 27px;
						}
					}

					input.selectedType {
						position: relative;
						display: inline-block;
						border: 1px solid var(--teal);
						padding: 0.5rem 2.75rem 0.5rem 1rem;
						border-radius: 2rem;
						min-width: 20rem;
						margin-bottom: 1rem;
						color: var(--teal);
						outline: none;
					}

					.type-list {
						display: none;
						position: absolute;
						z-index: 10;
						background-color: #fff;
						border: 1px solid var(--teal);
						width: 100%;
						border-bottom-left-radius: 2rem;
						border-bottom-right-radius: 2rem;
						overflow-y: auto;
						max-height: 18rem;
						-ms-overflow-style: auto;
						// firefox scrollbar styles
						scrollbar-color: #142f42 #f1f1f1;
						scrollbar-width: thin;

						&::-webkit-scrollbar {
							width: 10px;
						}

						&::-webkit-scrollbar-thumb {
							background-color: #c4c4c4;
							border-radius: 10px;
							border: 2px solid #fff;
						}

						.custom-selector {
							padding: 1rem 1.5rem;
							color: var(--orange);

							&:hover {
								background-color: var(--orange);
								color: #fff;
							}
						}

						.type {
							padding: 1rem 1.5rem;

							&:hover {
								background-color: var(--teal-dark);
								color: #fff;
							}

							&:last-child {
								border-bottom-left-radius: 2rem;
								border-bottom-right-radius: 2rem;
							}
						}
					}
				}
			}

			.internal-upload {
				position: relative;
				padding-bottom: 8rem;
				cursor: pointer;

				label {
					color: var(--portal-gray);
					cursor: pointer;
					text-decoration: underline;
					transition: color 0.3s;
					font-weight: 700;

					&:hover {
						color: var(--teal);

						.fas {
							color: var(--teal);
						}
					}

					.fas {
						color: var(--portal-gray);
						margin-right: 0.5rem;
						transition: color 0.3s;
					}
				}

				input {
					position: absolute;
					z-index: -1;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
				}
			}
		}

		.modal-footer {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			padding: 0 4rem 2rem;

			@include breakpoint(tablet-port) {
				flex-wrap: wrap;
				justify-content: flex-start;
			}

			.error-box {
				color: var(--red);
				padding-right: 2rem;

				@include breakpoint(tablet-port) {
					padding-bottom: 1rem;
					width: 100%;
				}
			}

			.btn {
				min-width: 20rem;
			}
		}

		.loading-spinner {
			display: none;
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			background-color: #08485c80;
			border-radius: 5px;
		}
	}
}

/* Documents needed section */
.docs-needed {
	background-color: #fff;

	.doc-container {
		border-left: 1px solid var(--portal-gray);
		border-right: 1px solid var(--portal-gray);

		&:not(:last-child) .document {
			border-bottom: 1px solid var(--portal-gray);
		}

		&:last-child {
			border-bottom: 1px solid var(--portal-gray);
		}

		&.open .document .fa-upload,
		&.open .document .label {
			color: var(--orange);
		}

		&.open .upload-container {
			height: 13rem;
			transform: scaleY(1);
			padding: 2rem;
			opacity: 1;
		}

		.containsUpload {
			margin-left: auto;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			font-size: 10px;
			border-radius: 50%;
			z-index: 1;
			background-color: #142f42;
			color: var(--teal);
			padding: 5px;
		}
	}

	.document {
		display: flex;
		align-items: center;
		padding: 1.5rem 0;
		margin: 0 4rem;
		cursor: pointer;
		transition: border 0.3s;

		&:hover .fa-upload,
		&:hover .label {
			color: var(--orange);
		}

		&:hover .label {
			text-decoration: underline;
		}

		.label {
			transition: color 0.3s;
			margin-right: 1rem;
		}

		.upload-icon {
			color: var(--teal-dark);
			margin-right: 1rem;
		}
	}

	.upload-container {
		height: 0;
		padding: 0;
		opacity: 0;
		margin-top: -1px;
		border: 1px solid var(--container-border-color);
		border-left: none;
		border-right: none;
		transform: scaleY(0);
		transform-origin: top;
		transition: padding 0.3s, height 0.3s, border 0.3s, transform 0.3s,
			opacity 0.8s;

		.uploadMessage {
			position: absolute;
			left: 0;
			top: 2.5rem;
			width: 100%;
			text-align: center;
			color: var(--teal-dark);
			font-weight: 600;
		}

		.upload-dropbox {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 100%;
			border: 2px dotted var(--container-border-color);

			.dragDropError {
				display: none;
				position: absolute;
				background-color: #f74141;
				padding: 1rem;
				border-radius: var(--app-border-radius);
				color: #fff;
			}

			input {
				position: absolute;
				left: 0;
				top: 0;
				height: 100%;
				width: 100%;
				opacity: 0;
				min-width: unset;
				cursor: pointer;
			}

			.fa-upload {
				margin-top: 1.5rem;
				color: var(--teal-dark);
			}

			.instruction {
				font-style: italic;
				font-size: 13px;
				margin-top: 1rem;
				padding: 0 1rem;
				text-align: center;
			}
		}
	}

	.none-message {
		border: 1px solid var(--portal-gray);
		border-top: none;
		padding-top: 0;
	}
}

/* Loan History Card*/
.loan-history {
	background-color: #fff;
	margin-top: 4rem;

	@include breakpoint(tablet-land) {
		margin-top: 0.25rem;
	}

	.loan-container {
		display: flex;
		align-items: center;
		padding: 2rem 2rem;
		border: 1px solid var(--container-border-color);
		border-top: none;

		&.incompleteApplicationContainer {
			display: none;
			flex-direction: row;
			border-left: 1rem solid var(--orange);

			.incompleteApplicationDetails {
				flex-direction: column;

				.incompleteApplicationLabel {
					display: inline-block;
					margin-top: 0.5rem;
					margin-bottom: 0.5rem;
					color: var(--orange);
					font-weight: 700;
				}

				.currentStep,
				.startDate {
					margin-right: 1rem;
				}

				.fas.fa-trash {
					color: var(--portal-gray);
					margin-top: 1rem;
					cursor: pointer;
					display: flex;

					&:hover {
						color: var(--red);
					}
				}
			}

			.btn.resumeApplication {
				padding: 0.5rem 0 0.25rem;
				text-align: center;
				color: #ffff;
				background-color: var(--orange);
				border-color: var(--orange);

				&:hover {
					border-color: var(--teal-dark);
					background-color: var(--teal-dark);
				}
			}
		}

		.column1 {
			margin-right: 2rem;
			align-self: flex-start;

			.loanNumber {
				display: block;
				margin-bottom: 0.5rem;
				color: var(--blue-green);
				font-weight: 800;
			}

			.address {
				margin-right: 1rem;
				font-weight: 700;
			}
		}

		.viewingNote,
		.btn {
			margin-left: auto;
		}

		.viewingNote {
			font-style: italic;
			color: var(--teal);
			font-weight: 800;
			margin-right: 0.5rem;
			letter-spacing: 0.75px;
		}

		.btn.viewLoan {
			font-size: 12px;
		}
	}
}

/* CARD COLUMN 3 */
.card-column-3 {
	width: 28%;
	order: 3;

	@include breakpoint(laptop) {
		width: 40%;
		margin: 0 2rem 0;
		min-width: 280px;
		order: 2;
	}

	@include breakpoint(tablet-land) {
		width: 100%;
		margin: 0.2rem 0 0;
		order: 3;
	}

	.document-list {
		border: 1px solid var(--container-border-color);
		border-top: none;

		form {
			&:first-child {
				padding-top: 2rem;
			}

			padding: 0 2rem 2rem;
		}

		.document {
			display: block;
			color: var(--teal);

			&:hover {
				color: var(--orange);
			}
		}
	}
}

/* Uploaded documents section */
.uploaded-docs {
	background-color: #fff;

	@include breakpoint(tablet-land) {
		position: relative;
	}

	.card-body {
		scrollbar-color: var(--blue-dark) #f1f1f1;
		scrollbar-width: thin;

		&::-webkit-scrollbar {
			width: 10px;
		}

		&::-webkit-scrollbar-thumb {
			background-color: #c4c4c4;
			border-radius: 10px;
			border: 2px solid #fff;
		}
	}

	form:first-child .upload .fileName-tooltip,
	form:first-child .upload .docRequest-tooltip {
		top: 2.5rem;
		bottom: auto;
	}

	.upload {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.fileName-wrapper {
			position: relative;
			display: flex;
			justify-content: space-between;
			width: 100%;

			@include breakpoint(tablet-land) {
				position: static;
			}

			.fileName-tooltip {
				display: none;
				position: absolute;
				left: 0;
				z-index: 999999999999;
				bottom: 2.5rem;
				max-width: 100%;
				word-break: break-all;
				background-color: var(--teal-dark);
				color: white;
				padding: 1rem;
				border-radius: var(--app-border-radius);

				@include breakpoint(tablet-land) {
					bottom: unset;
					top: 2.5rem;
				}
			}

			.fas {
				color: var(--teal);
			}

			.uploadFileName {
				border: none;
				background-color: transparent;
				cursor: pointer;
				text-align: left;
				margin-right: 2rem;
				text-decoration: underline;
				max-width: 25rem;
				overflow-x: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				outline: none;
				font-weight: 600;

				.text {
					display: inline-block;
					text-decoration: underline;
					font-family: "Nunito Sans", sans-serif;
				}

				&.tooltip-showing + .fileName-tooltip {
					display: block;
				}
			}
		}

		.file-details {
			position: relative;
			width: 100%;
			display: flex;
			align-items: center;
			margin-top: 0.5rem;

			@include breakpoint(tablet-land) {
				position: static;
			}

			.documentRequest {
				max-width: 20rem;
				margin-right: 1rem;
				display: inline-block;
				overflow-x: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				color: var(--blue-green);
				font-style: italic;
				border: none;
				font-weight: 600;
				background-color: transparent;
				outline: none;
				font-family: "Nunito Sans", sans-serif;

				.text {
					display: inline-block;
					font-weight: 700;
				}

				&.tooltip-showing + .docRequest-tooltip {
					display: block;
				}
			}

			.docRequest-tooltip {
				display: none;
				position: absolute;
				left: 0;
				z-index: 999999999999;
				bottom: 2.5rem;
				max-width: 100%;
				word-break: break-all;
				background-color: var(--blue-green);
				color: white;
				padding: 1rem;
				border-radius: var(--app-border-radius);

				@include breakpoint(tablet-land) {
					bottom: unset;
					top: 2.5rem;
				}
			}

			.dateUploaded {
				color: var(--standard-font-color);
				font-size: 12px;
			}
		}
	}
}

/* Completed disclosures section */
.completed-disclosures {
	margin-top: 4rem;
	background-color: #fff;

	@include breakpoint(tablet-land) {
		margin-top: 0.1rem;
	}

	.disclosure-container {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		font-weight: 600;

		.document {
			border: none;
			background-color: transparent;
			cursor: pointer;
			text-align: left;
			margin-right: 2rem;
		}
		.disclosureCompletedMessage {
			margin-top: 0.5rem;
			color: var(--portal-gray);
		}

		.dateCompleted {
			color: var(--portal-gray);
			font-size: 12px;
		}
	}
}

/* Filler column */
.filler-column {
	width: 0;
	order: 4;
	@include breakpoint(laptop) {
		width: 40%;
		margin: 0 4rem;
	}
}

/* PAY FOR APPRAISAL */
.payForAppraisal-btn {
	background-color: #fff;
}

/* Pay for appraisal modal */
.modal.payForAppraisal {
	.modal-content {
		min-width: 85rem;

		@include breakpoint(laptop) {
			width: 92%;
			min-width: unset;
		}

		.modal-header {
			display: flex;
			justify-content: flex-end;
			background-color: #fff;
			padding: 2rem;
		}

		iframe {
			border: none;
			width: 100%;
			min-height: 80vh;
		}
	}
}

.modal.incompleteApplicationModal,
.modal.deleteApplicationModal,
.modal.deleteApplicationErrorModal,
.modal.contactsModal {
	padding: 0 3rem 2rem;

	.modal-content {
		padding: 0 2rem 0 2rem;

		.button-container {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;

			.btn {
				min-width: 13rem;
				margin: 2rem 1rem 2rem;

				&:disabled {
					cursor: not-allowed;
					color: white;
					background-color: var(--portal-gray);
					border-color: var(--portal-gray);
				}
			}
		}
	}

	@include breakpoint(mobile) {
		padding: 0 1.5rem 2rem;
	}

	.heading {
		margin: 2rem 0 1rem;
		text-align: center;
		font-size: 28px;
		color: var(--teal);

		@include breakpoint(mobile) {
			font-size: 22px;
		}
	}

	.fas.close {
		position: absolute;
		right: 1rem;
		top: 0.5rem;
		color: var(--portal-gray);
		font-size: 2rem;

		@include breakpoint(mobile) {
			font-size: 22px;
			right: 0.5rem;
		}
	}

	.copy {
		color: var(--blue-green);
		text-align: center;
		font-weight: 600;
		margin-top: 2rem;
	}
}

// Old Mobile Version Modal
.modal.oldMobileVersionModal {
	.modal-content {
		min-width: 51rem;
		max-width: 51rem;
		max-height: 98%;
		overflow-y: auto;

		@include breakpoint(laptop) {
			width: 92%;
			min-width: unset;
		}

		.modal-header {
			display: flex;
			justify-content: flex-end;
			padding: 2rem 2rem 0;
		}

		.modal-body {
			height: 100%;
			padding: 0 2rem;

			.heading {
				font-size: 1.6rem;
				margin-bottom: 2rem;
				line-height: 2;
				color: var(--blue-green);
				text-align: center;
			}
		}
	}
}

.modal.contactsModal {
    .modal-content {
        @include breakpoint(mobile) {
			width: 95%;
		}
    }
	.heading {
		margin: 1rem 0 1rem;
	}
	.contacts-list {
		padding-bottom: 2rem;
	}
	.contact-container {
		width: 38rem;
		padding: 1rem 0;
        @include breakpoint(mobile) {
			width: 100%;
		}

        &:not(:last-child) {
            border-bottom: 2px solid var(--portal-gray);
        }
	}
	.nameTitle-container {
		display: flex;
		justify-content: space-between;
        margin-bottom: 1rem;
        flex-wrap: wrap;
		.contactName {
			color: var(--blue-green);
			font-weight: 800;
            @include breakpoint(mobile) {
                width: 100%;
            }
		}
	}
	.contactType {
		text-transform: capitalize;
		font-size: 1.2rem;
	}
	.icon-wrapper {
        a {
            display: block;
            color: var(--standard-font-color);
            font-weight: 500;
            &:hover i {
				color: var(--orange);
			}
            &:not(:last-child) {
                margin-bottom: .75rem;
            }
        }
		i {
			margin-right: .5rem;
			color: var(--blue-green);
			cursor: pointer;

		}
	}
}
</style>
