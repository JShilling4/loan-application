<template>
    <app-modal
        width="65rem"
        :show="isShowing"
        :show-close-button="true"
        :clickaway="true"
        background-color="#fff"
        @close="$emit('close')"
    >
        <template v-slot:body>
            <span class="heading">
                File Updates
            </span>

            <ul class="updateList">
                <li class="update">
                    <span class="date">7/30/2021 8:58 AM</span>

                    <span class="text">You have securely provided requested documentation! If any items remain, please upload associated documents at your earliest convenience.</span>
                </li>
                <li class="update">
                    <span class="date">2/27/2021 3:25 PM</span>

                    <span class="text">Your application has been received! Please upload any applicable documents by clicking the “Upload” button under the “Document Upload” Section of Your Mortgage To-Do List. If you need guidance, reach out to your Loan Officer for assistance.</span>
                </li>
            </ul>
        </template>
    </app-modal>
</template>

<script>
export default {
    name: "FileUpdatesModal",
};
</script>

<style lang="scss" scoped>
.heading {
    font-size: 2rem;
    margin-bottom: 3rem;
    margin-top: -1.5rem;
    color: #00485c;
    font-weight: 700;
}

.updateList {
    .update {
        &:not(:last-child) {
            margin-bottom: 2rem;
        }

        .date {
            display: block;
            color: var(--teal);
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
    }
}
</style>