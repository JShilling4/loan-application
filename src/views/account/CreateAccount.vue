<template>
    <div class="createAccount">
        <h1 class="appHeading">Create Account</h1>
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
                Create Account
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
    name: "CreateAccount",
    components: {},
    data() {
        return {
            email: "",
        };
    },
};
</script>

<style lang="scss" scoped>
.createAccount {
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
            color: $orange;
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
