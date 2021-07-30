<template>
    <div class="completed-disclosures">
        <div class="heading-container">
            <h2 class="heading">Completed Disclosures</h2>
            <i class="fas fa-angle-down"></i>
        </div>

        <div class="card-body document-list">
            <p class="none-message">There are no completed disclosures to view at this time.</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "CompletedDisclosuresCard",
};
</script>

<style lang="scss" scoped>
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
</style>