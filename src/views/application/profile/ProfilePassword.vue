<template>
    <div class="pageWrapper">
        <h1 class="appHeading">Create Password</h1>

        <!-- Password -->
        <div class="input-group">
            <app-label class-list="dark">Password</app-label>
            <text-field
                type="password"
                class-list="dark"
                v-model="password"
            />
        </div>

        <!-- Confirm Password -->
        <div class="input-group">
            <app-label class-list="dark">Re-enter Password</app-label>
            <text-field
                type="password"
                class-list="dark"
                v-model="confirmPassword"
            />
        </div>

        <view-controls
            @advance-app="submitPage()"
            @retreat-app="toggleComponent(2)"
            next-text="Create Profile"
            :local-posting="localDataIsPosting"
        />
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { deepClone } from "@/includes/mixins/helpers";

export default {
    name: "ProfilePassword",
    mixins: [deepClone],
    props: {
        toggleComponent: {
            type: Function,
        },
        saveState: {
            type: Function,
        },
        profile: {
            type: Object,
        },
    },
    data() {
        return {
            password: null,
            confirmPassword: null,
            localProfile: {},
            localDataIsPosting: false,
        };
    },
    methods: {
        ...mapActions([
            "logIn",
            "postBorrowerProfile",
            "postSectionProgress",
            "postProfileAndLogin",
        ]),

        async submitPage() {
            if (this.localDataIsPosting == false) {
                this.localDataIsPosting = true;
                this.postProfileAndLogin({
                    email: this.localProfile.email,
                    password: this.password,
                    profile: this.localProfile,
                }).then(() => {
                    this.postSectionProgress({ profile: 1 }).then(() => {
                        this.$router.push("/about/referral");
                    });
                });
            }
        },
    },
    mounted() {
        this.localProfile = this.deepClone(this.profile);
    },
};
</script>

<style lang="scss" scoped>
.pageWrapper {
    width: 300px;
    margin: 0 auto;
}
</style>
