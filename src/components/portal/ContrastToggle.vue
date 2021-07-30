<template>
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
</template>

<script>
export default {
    name: "ContrastToggle",
};
</script>

<style lang="scss" scoped>
.contrast-toggle-container {
    display: flex;
    align-items: center;

    @include breakpoint(mobile) {
        top: 7rem;
    }

    .label {
        color: var(--blue-dark);
        margin-right: 1rem;
        font-weight: 600;
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

.onoffswitch-inner:before,
.onoffswitch-inner:after {
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
    color: #ffffff;
}

.onoffswitch-inner:after {
    content: "OFF";
    padding-right: 7px;
    background-color: var(--blue-green);
    color: #ffffff;
    text-align: right;
}

.onoffswitch-switch {
    display: block;
    width: 11px;
    margin: 5px;
    background: #ffffff;
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