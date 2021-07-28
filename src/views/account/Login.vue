<template>
    <div class="login">
        <h1 class="appHeading">Log In</h1>
        <form>
            <div class="input-group">
                <app-label
                    label-for="email"
                    class-list="dark"
                >Email</app-label>
                <text-field
                    name="email"
                    id="email"
                    v-model="credentials.email"
                    @keyup.enter="postCredentials()"
                    class-list="dark"
                />
            </div>

            <div class="input-group">
                <app-label
                    label-for="password"
                    class-list="dark"
                >Password</app-label>
                <text-field
                    name="password"
                    id="password"
                    class-list="dark"
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

        <router-link to="/create-account">Create an account</router-link>
        <router-link to="/forgot-password">
            Forgot Password?
        </router-link>

        <router-link to="/faq">
            FAQ
        </router-link>

        <external-footer />
    </div>
</template>

<script>
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
            devBypass: true,
        };
    },
    methods: {
        postCredentials() {
            if (this.devBypass) {
                if (this.credentials.password == "portal") {
                    this.$router.push("/portal");
                }
                if (this.credentials.password == "app") {
                    this.$router.push("/profile");
                }
            } else {
                this.$refs.form.validate().then((success) => {
                    if (!success) {
                        return;
                    }
                    this.credentials.password == "portal"
                        ? this.$router.push("/portal")
                        : this.$router.push("/profile");
                });
            }
        },
    },
    mounted() {},
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

    a {
        color: #fff;
        text-decoration: underline;
        margin-bottom: 1rem;
        &:hover {
            color: $orange;
        }
    }
}

:deep(.submitButton) {
    margin: 2rem 0;
}
</style>
