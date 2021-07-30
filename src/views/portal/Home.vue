<template>
    <div class="main-content">
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

        <section class="card-container">

            <div class="card-column-1">
                <profile-card />
            </div>

            <div class="card-column-2">
                <todo-list-card />

                <loan-history-card />
            </div>

            <div class="card-column-3">

                <uploaded-documents-card />

                <completed-disclosures-card />
            </div>

            <div class="filler-column"></div>
        </section>

        <portal-footer />
    </div>
</template>

<script>
import { mapState } from "vuex";
import LanguageSelector from "@/components/LanguageSelector.vue";
import MilestoneTimeline from "@/components/portal/MilestoneTimeline.vue";
import ContrastToggle from "@/components/portal/ContrastToggle.vue";
import PortalFooter from "@/components/layout/PortalFooter.vue";
import ProfileCard from "@/components/portal/ProfileCard.vue";
import TodoListCard from "@/components/portal/TodoListCard.vue";
import LoanHistoryCard from "@/components/portal/LoanHistoryCard.vue";
import UploadedDocumentsCard from "@/components/portal/UploadedDocumentsCard.vue";
import CompletedDisclosuresCard from "@/components/portal/CompletedDisclosuresCard.vue";

export default {
    name: "Portal",
    components: {
        "language-selector": LanguageSelector,
        "milestone-timeline": MilestoneTimeline,
        "contrast-toggle": ContrastToggle,
        "portal-footer": PortalFooter,
        "profile-card": ProfileCard,
        "todo-list-card": TodoListCard,
        "loan-history-card": LoanHistoryCard,
        "uploaded-documents-card": UploadedDocumentsCard,
        "completed-disclosures-card": CompletedDisclosuresCard,
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
    color: #929292;
}
h1 {
    margin-top: 8rem;
    color: var(--blue-green);
}
h2 {
    font-size: 1.6rem;
}
h3 {
    color: var(--blue-green);
}

.card-body {
    transition: max-height 0.5s;
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
    font-style: italic;
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
</style>

<style lang="scss" scoped>
.main-content {
    background-color: #f6f6f6;
    padding: 0 2rem;
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

        .start-application-btn-desktop {
            width: 100%;
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
                margin-bottom: 0.75rem;
            }
        }
        i {
            margin-right: 0.5rem;
            color: var(--blue-green);
            cursor: pointer;
        }
    }
}
</style>
