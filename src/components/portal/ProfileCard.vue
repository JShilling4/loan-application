<template>
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
                    <app-button class-list="teal-outline jumpToHistoryButton">Jump to Loan History</app-button>
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

    <app-button class-list="teal-fill">
        Start New Application
    </app-button>

</template>

<script>
export default {
    name: "ProfileCard",
};
</script>

<style lang="scss" scoped>
.profile-card {
    background-color: #fff;
    margin-bottom: 2rem;
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
                font-weight: 700;
                &.loanNumber {
                    color: var(--teal);
                }
            }
        }
        .jumpToHistoryButton {
            display: block;
            width: 18rem;
            margin-top: 0.5rem;
            font-size: 12px;
            height: 3rem;
        }
    }
}
</style>