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
</style>
