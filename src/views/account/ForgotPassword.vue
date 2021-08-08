<template>
    <div class="forgotPassword">
        <page-heading :theme="appTheme">Forgot Password</page-heading>
        <form class="pageForm">
            <!-- First Name -->
            <div class="input-group">
                <app-label
                    :theme="appTheme"
                    for="email"
                >Email</app-label>
                    <text-field
                        :theme="appTheme"
                        id="email"
                        type="text"
                        v-model="email"
                    />
            </div>

            <view-controls
				@advance-app="submitPage()"
                @retreat-app="$router.push('/login')"
				:local-posting="localDataIsPosting"
                next-text="Recover Password"
                :theme="appTheme"
			/>
        </form>
    </div>
</template>

<script>
import { mapState } from "vuex";
import account from "@/includes/mixins/application/account";

export default {
    name: "ForgotPassword",
    mixins: [account],
    components: {},
    data() {
        return {
            email: "",
        };
    },
    computed: {
        ...mapState(["appTheme"]),
    }
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
