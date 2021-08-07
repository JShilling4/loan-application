
<template>
    <div class="profile">
        <div class="viewWrapper">
            <profile-general
                v-if="currentComponent === 1"
                :profile="localProfile"
                :save-state="saveState"
                :toggle-component="toggleComponent"
            />
            <profile-address
                v-if="currentComponent === 2"
                :profile="localProfile"
                :save-state="saveState"
                :toggle-component="toggleComponent"
            />
            <profile-password
                v-if="currentComponent === 3"
                :profile="localProfile"
                :save-state="saveState"
                :toggle-component="toggleComponent"
            />
        </div>
    </div>
</template>

<script>
/* eslint-disable no-undef */
import { mapState } from "vuex";
import profile from "@/includes/mixins/application/profile";

import ProfileGeneral from "@/views/application/profile/ProfileGeneral.vue";
import ProfileAddress from "@/views/application/profile/ProfileAddress.vue";
import ProfilePassword from "@/views/application/profile/ProfilePassword.vue";

export default {
    name: "Profile",
    mixins: [profile],
    components: {
        "profile-general": ProfileGeneral,
        "profile-address": ProfileAddress,
        "profile-password": ProfilePassword,
    },
    data() {
        return {
            currentComponent: 1,
            localProfile: {},
        };
    },
    computed: {
        ...mapState(["borrower"]),
    },
    methods: {
        toggleComponent(component) {
            this.currentComponent = component;
        },
        saveState(state) {
            this.localProfile = { ...this.localProfile, ...state };
        },
    },
    mounted() {
        this.localProfile = { ...this.localProfile, ...this.borrower.profile };
    },
};
</script>

<style lang="scss" scoped>
.profile {
    @include app-background();
}
</style>
