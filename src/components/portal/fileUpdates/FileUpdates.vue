<template>
    <div class="file-update">
        <h3 class="heading">Latest File Update:&nbsp;</h3>
        <p class="update">
            {{ sortedFileUpdates[0].text }}
            <span
                v-if="sortedFileUpdates.length > 1"
                class="previousUpdatesTrigger"
                @click="updatesModalShowing = true"
            >Previous Updates...</span>
        </p>
    </div>

    <file-updates-modal :show="updatesModalShowing" @close="updatesModalShowing = false" />
</template>

<script>
import { mapGetters } from "vuex";
import FileUpdatesModal from "@/components/portal/fileUpdates/FileUpdatesModal.vue";

export default {
    name: "FileUpdates",
    components: {
        "file-updates-modal": FileUpdatesModal
    },
    computed: {
        ...mapGetters(["sortedFileUpdates"]),
    },
    data() {
        return {
            updatesModalShowing: false,
        };
    },
};
</script>

<style lang="scss" scoped>
.file-update {
    display: flex;
    justify-content: center;
    margin: 3rem auto;
    max-width: 1200px;
    .heading {
        white-space: nowrap;
        font-weight: 800;
        font-size: 1.4rem;
        color: var(--blue-green);
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
</style>