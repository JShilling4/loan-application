<template>
    <div class="login">
        <page-heading :theme="appTheme">
            Log In
        </page-heading>

        <form>
            <div class="input-group">
                <app-label
                    label-for="email"
                    :theme="appTheme"
                >Email</app-label>
                <text-field
                    name="email"
                    id="email"
                    v-model="credentials.email"
                    @keyup.enter="postCredentials()"
                    :theme="appTheme"
                />
            </div>

            <div class="input-group">
                <app-label
                    label-for="password"
                    :theme="appTheme"
                >Password</app-label>
                <text-field
                    name="password"
                    id="password"
                    :theme="appTheme"
                    v-model="credentials.password"
                    @keyup.enter="postCredentials()"
                />
            </div>

            <app-button
                type="button"
                ref="loginButton"
                @click="postCredentials()"
                class-list="orange-fill submitButton"
            >
                Submit
            </app-button>
        </form>

        <app-link
            to="/create-account"
            :theme="appTheme"
        >Create an account</app-link>
        <app-link
            to="/forgot-password"
            :theme="appTheme"
        >Forgot Password?</app-link>
        <app-link
            to="/faq"
            :theme="appTheme"
        >FAQ</app-link>

        <external-footer :theme="appTheme" />
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ExternalFooter from "@/components/layout/ExternalFooter.vue";

export default {
    name: "Login",
    components: {
        "external-footer": ExternalFooter,
    },
    data() {
        return {
            credentials: {
                email: "",
                password: "",
            },
            devBypass: false,
        };
    },
    computed: {
        ...mapState(["appTheme"]),
    },

    methods: {
        ...mapActions(["logIn"]),

        postCredentials() {
            this.logIn(this.credentials).then((response) => {
                console.log(response);
                if (response.sectionProgress) {
                    this.$router.push("/profile");
                }
                if (response.token.includes("portal")) {
                    this.$router.push("/portal");
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.login {
    @include app-background;
    display: flex;
    flex-direction: column;
    align-items: center;

    form {
        width: 30rem;
    }

    .createAccount {
        color: #fff;
    }
}

:deep(.submitButton) {
    margin: 2rem 0;
}
</style>
