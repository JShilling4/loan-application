<template>
    <div class="createAccount">
        <page-heading :theme="appTheme">
            Create Account
        </page-heading>

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
                next-text="Create Account"
                :theme="appTheme"
			/>
        </form>
    </div>
</template>

<script>
import { mapState } from "vuex";
import account from "@/includes/mixins/application/account";

export default {
    name: "CreateAccount",
    mixins: [account],
    components: {},
    data() {
        return {
            email: "",
        };
    },
    computed: {
        ...mapState(["appTheme"]),
    },
    methods: {
        submitPage() {
            this.$router.push('/login')
        }
    }
};
</script>

<style lang="scss" scoped>
.createAccount {
    @include app-background;

    form {
        width: 35rem;
    }
}
</style>
