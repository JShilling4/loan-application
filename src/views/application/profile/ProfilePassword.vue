<template>
    <div class="pageWrapper">

        <page-heading :theme="appTheme">
            Create Password
        </page-heading>

        <!-- Password -->
        <div class="input-group">
            <app-label class-list="dark" :theme="appTheme">Password</app-label>
            <text-field
                type="password"
                :theme="appTheme"
                v-model="password"
            />
        </div>

        <!-- Confirm Password -->
        <div class="input-group">
            <app-label
                class-list="dark"
                :theme="appTheme"
            >Re-enter Password</app-label>
            <text-field
                type="password"
                :theme="appTheme"
                v-model="confirmPassword"
            />
        </div>

        <view-controls
            @advance-app="submitPage()"
            @retreat-app="toggleComponent(2)"
            next-text="Create Profile"
            :local-posting="localDataIsPosting"
            :theme="appTheme"
        />
    </div>
</template>

<script>
import { mapActions } from "vuex";
import profile from "@/includes/mixins/application/profile";

export default {
    name: "ProfilePassword",
    mixins: [profile],
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
