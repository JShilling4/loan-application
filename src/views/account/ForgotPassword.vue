<template>
    <div class="forgotPassword">
        <h1 class="appHeading">Forgot Password</h1>
        <form class="pageForm">
            <!-- First Name -->
            <div class="input-group">
                <app-label
                    class-list="dark"
                    for="email"
                >Email</app-label>
                    <text-field
                        class-list="dark"
                        id="email"
                        type="text"
                        v-model="email"
                    />
            </div>

            <app-button
                @click="$router.push('/login')"
                class-list="orange-fill pageSubmit"
                :append-icon="true"
            >
                Recover Password
            </app-button>

            <div class="backLink-container">
                <font-awesome-icon
                    :icon="['fas', 'angle-left']"
                    class="icon"
                />
                <router-link
                    class="backLink"
                    to="/login"
                > Back to Login</router-link>
            </div>
        </form>
    </div>
</template>

<script>

export default {
    name: "ForgotPassword",
    components: {},
    data() {
        return {
            email: "",
        };
    },
};
</script>

<style lang="scss" scoped>
.forgotPassword {
    @include app-background;

    form {
        width: 35rem;
    }

    .backLink-container {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
        &:hover .icon,
        &:hover a {
            color: var(--orange);
        }
        .icon {
            color: #fff;
            margin-right: 0.5rem;
            cursor: pointer;
            transition: color 0.3s;
        }
        a {
            display: block;
            text-align: center;
            color: #fff;
            font-size: 1.6rem;
            transition: color 0.3s;
            text-decoration: underline;
        }
    }
}
</style>
