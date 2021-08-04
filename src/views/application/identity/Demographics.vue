<template>
    <div class="demographics">
        <h1 class="appHeading">Demographics</h1>
        <form class="pageForm">
            <p class="pageCopy">
                The following information is requested by the federal government for
                certain types of loans related to a dwelling in order to monitor the
                lender's compliance with equal credit opportunity, fair housing, and
                home mortgage disclosure laws. You are not required to furnish this
                information, but are encouraged to do so. You may select one or more
                designations for "Race." The law provides that a lender may not
                discriminate on the basis of this information, or on whether you choose
                to furnish it. However, if you choose not to furnish the information and
                you have made this application in person, under federal regulations the
                lender is required to note ethnicity, race, and gender on the basis of
                visual observation or surname. If you do not wish to furnish the
                information, please check below.
            </p>

            <div class="name">
                {Borrower}
            </div>

            <div class="optOut-container">
                <check-box
                    id="optOut"
                    label="I do not wish to provide this information"
                    v-model="optOut"
                />
            </div>

            <view-controls
                @advance-app="submitPage()"
                @retreat-app="$router.go(-1)"
            />
        </form>
    </div>
</template>

<script>
export default {
    name: "Demographics",
    components: {},
    data() {
        return {
            optOut: false,
        };
    },
    methods: {
        submitPage() {
            this.$router.push("/identity/coborrower-demographics");
        },
    },
};
</script>

<style lang="scss" scoped>
.demographics {
    .pageCopy {
        margin-bottom: 2rem;
        font-size: 16px;
    }

    .name {
        margin-bottom: 2rem;
        font-size: 20px;
        color: #fff;
        text-align: center;
    }

    .optOut-container {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-weight: 500;

        .optOutLabel {
            color: #fff;
            font-weight: 500;
            font-size: 16px;
        }
    }
}
</style>
