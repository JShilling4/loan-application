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
                <li v-for="update in sortedFileUpdates" :key="update.id" class="update">
                    <span class="date">{{ update.loggedDatetime }}</span>

                    <span class="text">{{ update.text }}</span>
                </li>
            </ul>
        </template>
    </app-modal>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "FileUpdatesModal",
    props: {
        isShowing: {
            type: Boolean,
        },
    },
    computed: {
        ...mapGetters(["sortedFileUpdates"]),
    },
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