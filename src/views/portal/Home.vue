<template>
    <div class="portal">
        <main>
            <div class="home-controls">
                <!-- Contrast Toggle -->
                <div class="contrast-toggle-container">
                    <span class="label">High Contrast:</span>
                    <div class="onoffswitch">
                        <input
                            type="checkbox"
                            name="onoffswitch"
                            class="onoffswitch-checkbox"
                            id="myonoffswitch"
                            tabindex="0"
                        >
                        <label
                            class="onoffswitch-label"
                            for="myonoffswitch"
                            ariahidden="true"
                        >
                            <span class="ada-shusher">.</span>
                            <span class="onoffswitch-inner"></span>
                            <span class="onoffswitch-switch"></span>
                        </label>
                    </div>
                </div>

                <!-- Preferred Language -->
                <div class="languageSelector-container">
                    <language-selector
                        theme="light"
                        :is-inline="true"
                    />
                </div>
            </div>

            <milestone-timeline />
        </main>
    </div>
</template>

<script>
import LanguageSelector from "@/components/shared/LanguageSelector.vue";
import MilestoneTimeline from "@/components/MilestoneTimeline.vue";

export default {
    name: "Portal",
    components: {
        "language-selector": LanguageSelector,
        "milestone-timeline": MilestoneTimeline
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
</style>

<style lang="scss" scoped>
.portal {
    h1 {
        margin-top: 8rem;
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

.contrast-toggle-container {
	display: flex;
	align-items: center;

	@include breakpoint(mobile) {
		top: 7rem;
	}

	.label {
		color: var(--blue-dark);
		margin-right: 1rem;
	}
}

.onoffswitch {
	position: relative;
	width: 43px;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
    user-select: none;
}

.onoffswitch-checkbox {
	position: absolute;
	opacity: 0;
	visibility: hidden;
	pointer-events: none;
}

.onoffswitch-label {
	display: block;
	overflow: hidden;
	cursor: pointer;
	border-radius: 50px;
	.ada-shusher {
		display: none;
	}
}

.onoffswitch-inner {
	display: block;
	width: 200%;
	margin-left: -100%;
	transition: margin 0.3s ease-in 0s;
}

.onoffswitch-inner:before, .onoffswitch-inner:after {
	display: block;
	float: left;
	width: 50%;
	height: 21px;
	padding: 0;
	line-height: 21px;
	font-size: 8px;
	color: white;
	font-family: Trebuchet, Arial, sans-serif;
	font-weight: bold;
	box-sizing: border-box;
}

.onoffswitch-inner:before {
	content: "ON";
	padding-left: 7px;
	background-color: var(--teal);
	color: #FFFFFF;
}

.onoffswitch-inner:after {
	content: "OFF";
	padding-right: 7px;
	background-color: var(--blue-green);
	color: #FFFFFF;
	text-align: right;
}

.onoffswitch-switch {
	display: block;
	width: 11px;
	margin: 5px;
	background: #FFFFFF;
	position: absolute;
	top: 0;
	bottom: 0;
	right: 23px;
	border-radius: 50px;
	transition: all 0.3s ease-in 0s;
}

.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
	margin-left: 0;
}

.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
	right: 0px;
}
</style>
