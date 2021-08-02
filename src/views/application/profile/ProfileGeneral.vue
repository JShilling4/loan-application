<template>
    <div class="profileGeneral">
        <h1 class="appHeading">{{ $t('headings.profile1')}}</h1>

        <div class="pageWrapper">
            <!-- Name Input Group -->
            <div class="inline-form-group">
                <!-- First Name -->
                <div class="input-group">
                    <app-label
                        class-list="dark"
                        for="fname"
                    >{{ $t('formLabels.firstName') }}</app-label>
                    <text-field
                        class-list="dark"
                        id="fname"
                        type="text"
                        name="FirstName"
                        v-model="localProfile.firstName"
                    />
                </div>

                <!-- Middle Initial -->
                <div class="input-group short">
                    <app-label
                        class-list="dark"
                        for="middleInitial"
                    >{{ $t('formLabels.middleInitial') }}</app-label>
                    <text-field
                        class-list="dark"
                        id="middleInitial"
                        type="text"
                        maxlength="1"
                        name="middleInitial"
                        v-model="localProfile.middleInitial"
                    />
                </div>
            </div>

            <!-- Suffix/Email Group -->
            <div class="inline-form-group">
                <!-- Last Name -->
                <div class="input-group">
                    <app-label
                        class-list="dark"
                        for="lastName"
                    >{{ $t('formLabels.lastName') }}</app-label>
                    <text-field
                        class-list="dark"
                        id="lastName"
                        type="text"
                        name="lastName"
                        v-model="localProfile.lastName"
                    />
                </div>
                <!-- Suffix -->
                <div class="input-group short">
                    <app-label
                        class-list="dark"
                        for="suffix"
                    >{{ $t('formLabels.suffix') }}</app-label>
                    <multi-select
                        :options="suffixes"
                        :can-clear="false"
                        v-model="localProfile.suffix"
                    />
                </div>
            </div>

            <!-- Email -->
            <div class="input-group">
                <app-label
                    class-list="dark"
                    for="email"
                >{{ $t('formLabels.emailAddress') }}</app-label>
                <text-field
                    type="text"
                    class-list="dark"
                    id="email"
                    name="email"
                    v-model="localProfile.email"
                />
            </div>

            <!-- Phone/Maritial Status Group -->
            <!-- Phone -->
            <div class="input-group">
                <app-label
                    class-list="dark"
                    for="phone"
                >{{ $t('formLabels.phoneNumber') }}</app-label>
                <text-field
                    class-list="dark"
                    id="phone"
                    type="tel"
                    name="Phone"
                    maxlength="12"
                    v-model="localProfile.phone"
                />
            </div>

            <!-- Marital Status -->
            <div class="input-group">
                <app-label
                    class-list="dark"
                    for="maritalStatus"
                >{{ $t('formLabels.maritalStatus') }}</app-label>
                <multi-select
                    :options="[
                        { value: 'Single', label: $t('global.single') },
                        { value: 'Married', label: $t('global.married') },
                        { value: 'Separated', label: $t('global.separated') }
                    ]"
                    id="maritalStatus"
                    :can-clear="false"
                    v-model="localProfile.maritalStatus"
                />
            </div>

            <app-button
                class-list="orange-fill pageSubmit"
                :isPosting="localDataIsPosting"
                indicator-type="button"
                :append-icon="true"
                @click="submitPage()"
            >
                {{ $t('global.next') }}
            </app-button>
        </div>
    </div>
</template>

<script>
import profile from "@/includes/mixins/application/profile";

export default {
    name: "ProfileGeneral",
    mixins: [profile],
    components: {},
    methods: {
        async submitPage() {
            if (this.localDataIsPosting == false) {
                // start loader
                this.localDataIsPosting = true;
                // post data
                await this.postBorrowerProfile(this.localProfile);
                // post progress
                if (this.applicationData.progress.profile === null) {
                    this.localApplicationData.progress.profile = 1;
                    this.postApplicationData(this.localApplicationData);
                }
                // next route
                this.$router.push("/profile/address");
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.pageWrapper {
    width: 350px;
    margin: 0 auto;
}

</style>
