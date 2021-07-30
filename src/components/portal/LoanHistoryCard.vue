<template>
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
</template>

<script>
export default {
    name: "LoanHistoryCard",
};
</script>

<style lang="scss" scoped>
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
</style>