import { createRouter, createWebHistory } from "vue-router";
// Root
import Index from "../views/Index.vue";
// Profile
import ProfileAddress from "../views/application/profile/ProfileAddress.vue";
import ProfilePassword from "../views/application/profile/ProfilePassword.vue";
// About
import Referral from "../views/application/profile/Referral.vue";
import SelectLoanOfficer from "../views/application/profile/SelectLoanOfficer.vue";
import Veteran from "../views/application/about/Veteran.vue";
import Coborrower from "../views/application/about/coborrower/Coborrower.vue";
import CoborrowerInfo from "../views/application/about/coborrower/CoborrowerInfo.vue";
import CoborrowerAddress from "../views/application/about/coborrower/CoborrowerAddress.vue";
import CoborrowerAuth from "../views/application/about/coborrower/CoborrowerAuth.vue";
import Dependents from "../views/application/about/dependents/Dependents.vue";
import CoborrowerDependents from "../views/application/about/dependents/CoborrowerDependents.vue";
import Alimony from "../views/application/about/alimony/Alimony.vue";
import CoborrowerAlimony from "../views/application/about/alimony/CoborrowerAlimony.vue";
// Property
import LoanType from "../views/application/property/LoanType.vue";
import Refinance from "../views/application/property/Refinance.vue";
import AddressHistory from "../views/application/property/addressHistory/AddressHistory.vue";
import CoborrowerAddressHistory from "../views/application/property/addressHistory/CoborrowerAddressHistory.vue";
import OtherProperties from "../views/application/property/otherProperties/OtherProperties.vue";
import AddOtherProperties from "../views/application/property/otherProperties/AddOtherProperties.vue";
import CoborrowerAddOtherProperties from "../views/application/property/otherProperties/CoborrowerAddOtherProperties.vue";
import PurchaseInfo from "../views/application/property/PurchaseInfo.vue";
import PurchasePrice from "../views/application/property/PurchasePrice.vue";
// Income
import IncomeHistory from "../views/application/income/incomeHistory/IncomeHistory.vue";
import CoborrowerIncomeHistory from "../views/application/income/incomeHistory/CoborrowerIncomeHistory.vue";
import CreditCheck from "../views/application/income/CreditCheck.vue";
// Assets
import AssetEntryOptions from "../views/application/assets/AssetEntryOptions.vue";
import AddAssets from "../views/application/assets/AddAssets.vue";
import CoborrowerAddAssets from "../views/application/assets/CoborrowerAddAssets.vue";
import VerifyAssets from "../views/application/assets/VerifyAssets.vue";
// Identity
import Declarations from "../views/application/identity/Declarations.vue";
import CoborrowerDeclarations from "../views/application/identity/CoborrowerDeclarations.vue";
import CoborrowerDemographics from "../views/application/identity/CoborrowerDemographics.vue";

const routes = [
    //* Entry routes

    // Index
    {
        path: "/",
        name: "Index",
        meta: {
            navItem: null,
            requiresAuth: false,
        },
        component: Index,
    },

    // Login
    {
        path: "/login",
        name: "Login",
        meta: {
            navItem: null,
            requiresAuth: false,
        },
        component: () => import(/* webpackChunkName: "login" */ "../views/account/Login.vue"),
    },

    // Create Account
    {
        path: "/create-account",
        name: "CreateAccount",
        meta: {
            navItem: null,
            requiresAuth: false,
        },
        component: () =>
            import(/* webpackChunkName: "createAccount" */ "../views/account/CreateAccount.vue"),
    },

    // Forgot Password
    {
        path: "/forgot-password",
        name: "ForgotPassword",
        meta: {
            navItem: null,
            requiresAuth: false,
        },
        component: () =>
            import(/* webpackChunkName: "forgotPassword" */ "../views/account/ForgotPassword.vue"),
    },

    // Faq
    {
        path: "/faq",
        name: "Faq",
        meta: {
            navItem: null,
            requiresAuth: false,
        },
        component: () => import(/* webpackChunkName: "faq" */ "../views/Faq.vue"),
    },

    //* Portal routes

    // Portal Home
    {
        path: "/portal",
        name: "Home",
        meta: {
            navItem: null,
            requiresAuth: true,
        },
        component: () => import(/* webpackChunkName: "PortalHome" */ "../views/portal/Home.vue"),
    },

    //* Application routes

    // Profile Routes
    {
        path: "/profile",
        meta: {
            navItem: "profile",
            requiresAuth: true,
        },
        component: () =>
            import(/* webpackChunkName: "profile" */ "../views/application/profile/Profile.vue"),
        children: [
            // profile about
            {
                path: "",
                meta: {
                    navItem: "profile",
                    requiresAuth: true,
                },
                component: import(
                    /* webpackChunkName: "profileGeneral" */ "../views/application/profile/ProfileGeneral.vue"
                ),
            },
            // profile address
            {
                path: "address",
                meta: {
                    navItem: "profile",
                    requiresAuth: true,
                },
                component: ProfileAddress,
            },
            // Referral
            {
                path: "referral",
                meta: {
                    navItem: "profile",
                    requiresAuth: true,
                },
                component: Referral,
            },
            // Select Loan Officer
            {
                path: "select-loan-officer",
                meta: {
                    navItem: "profile",
                    requiresAuth: true,
                },
                component: SelectLoanOfficer,
            },
            // profile create password
            {
                path: "create-password",
                meta: {
                    navItem: "profile",
                    requiresAuth: true,
                },
                component: ProfilePassword,
            },
        ],
    },

    // About Routes
    {
        path: "/about",
        redirect: "/about/referral",
        meta: {
            navItem: "about",
            requiresAuth: true,
        },
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/application/about/About.vue"),
        children: [
            // Veteran
            {
                path: "veteran",
                meta: {
                    navItem: "about",
                    requiresAuth: true,
                },
                component: Veteran,
            },
            // Coborrower exists
            {
                path: "coborrower",
                meta: {
                    navItem: "about",
                    requiresAuth: true,
                },
                component: Coborrower,
            },
            // Coborrower Info
            {
                path: "coborrower/info",
                meta: {
                    navItem: "about",
                    requiresAuth: true,
                },
                component: CoborrowerInfo,
            },
            // coborrower Address
            {
                path: "coborrower/address",
                meta: {
                    navItem: "about",
                    requiresAuth: true,
                },
                component: CoborrowerAddress,
            },
            // Coborrower Authorization
            {
                path: "coborrower/auth",
                meta: {
                    navItem: "about",
                    requiresAuth: true,
                },
                component: CoborrowerAuth,
            },
            // Borrower Dependents
            {
                path: "dependents",
                meta: {
                    navItem: "about",
                    requiresAuth: true,
                },
                component: Dependents,
            },
            // Coborrower Dependents
            {
                path: "coborrower-dependents",
                meta: {
                    navItem: "about",
                    requiresAuth: true,
                },
                component: CoborrowerDependents,
            },
            // Borrower Alimony
            {
                path: "alimony",
                meta: {
                    navItem: "about",
                    requiresAuth: true,
                },
                component: Alimony,
            },
            // Coborrower Alimony
            {
                path: "coborrower-alimony",
                meta: {
                    navItem: "about",
                    requiresAuth: true,
                },
                component: CoborrowerAlimony,
            },
        ],
    },

    // Property Routes
    {
        path: "/property",
        redirect: "/property/loan-type",
        meta: {
            navItem: "property",
            requiresAuth: true,
        },
        component: () =>
            import(/* webpackChunkName: "property" */ "../views/application/property/Property.vue"),
        children: [
            // Loan Type
            {
                path: "loan-type",
                meta: {
                    navItem: "property",
                    requiresAuth: true,
                },
                component: LoanType,
            },
            // Refinance
            {
                path: "refinance",
                alias: "/refinance",
                meta: {
                    navItem: "property",
                    requiresAuth: true,
                },
                component: Refinance,
            },
            // Address history
            {
                path: "address-history",
                meta: {
                    navItem: "property",
                    requiresAuth: true,
                },
                component: AddressHistory,
            },
            // Coborrower address history
            {
                path: "coborrower-address-history",
                meta: {
                    navItem: "property",
                    requiresAuth: true,
                },
                component: CoborrowerAddressHistory,
            },
            // Other Properties
            {
                path: "other-properties",
                meta: {
                    navItem: "property",
                    requiresAuth: true,
                },
                component: OtherProperties,
            },
            // Add Other Properties
            {
                path: "add-properties",
                meta: {
                    navItem: "property",
                    requiresAuth: true,
                },
                component: AddOtherProperties,
            },
            // Coborrower Add Other Properties
            {
                path: "add-coborrower-properties",
                meta: {
                    navItem: "property",
                    requiresAuth: true,
                },
                component: CoborrowerAddOtherProperties,
            },
            // Purchase Info
            {
                path: "purchase-info",
                meta: {
                    navItem: "property",
                    requiresAuth: true,
                },
                component: PurchaseInfo,
            },
            // Purchase Price
            {
                path: "purchase-price",
                meta: {
                    navItem: "property",
                    requiresAuth: true,
                },
                component: PurchasePrice,
            },
        ],
    },

    // Income Routes
    {
        path: "/income",
        redirect: "/income/income-history",
        meta: {
            navItem: "income",
            requiresAuth: true,
        },
        component: () =>
            import(/* webpackChunkName: "income" */ "../views/application/income/Income.vue"),
        children: [
            {
                path: "income-history",
                meta: {
                    navItem: "income",
                    requiresAuth: true,
                },
                component: IncomeHistory,
            },
            {
                path: "coborrower-income-history",
                meta: {
                    navItem: "income",
                    requiresAuth: true,
                },
                component: CoborrowerIncomeHistory,
            },
            {
                path: "credit-check",
                meta: {
                    navItem: "income",
                    requiresAuth: true,
                },
                component: CreditCheck,
            },
        ],
    },

    // Assets Routes
    {
        path: "/assets",
        redirect: "/assets/entry-options",
        meta: {
            navItem: "assets",
            requiresAuth: true,
        },
        component: () =>
            import(/* webpackChunkName: "assets" */ "../views/application/assets/Assets.vue"),
        children: [
            {
                path: "entry-options",
                name: "assetEntryOptions",
                meta: {
                    navItem: "assets",
                    requiresAuth: true,
                },
                component: AssetEntryOptions,
            },
            {
                path: "verify-assets",
                meta: {
                    navItem: "assets",
                    requiresAuth: true,
                },
                component: VerifyAssets,
            },
            {
                path: "add-assets",
                meta: {
                    navItem: "assets",
                    requiresAuth: true,
                },
                component: AddAssets,
            },
            {
                path: "coborrower-add-assets",
                meta: {
                    navItem: "assets",
                    requiresAuth: true,
                },
                component: CoborrowerAddAssets,
            },
        ],
    },

    // Identity Routes
    {
        path: "/identity",
        redirect: "/identity/declarations",
        meta: {
            navItem: "identity",
            requiresAuth: true,
        },
        component: () =>
            import(/* webpackChunkName: "identity" */ "../views/application/identity/Identity.vue"),
        children: [
            {
                path: "declarations",
                meta: {
                    navItem: "identity",
                    requiresAuth: true,
                },
                component: Declarations,
            },
            {
                path: "coborrower-declarations",
                meta: {
                    navItem: "identity",
                    requiresAuth: true,
                },
                component: CoborrowerDeclarations,
            },
            {
                path: "demographics",
                meta: {
                    navItem: "identity",
                    requiresAuth: true,
                },
                component: import(
                    /* webpackChunkName: "demographics" */ "../views/application/identity/Demographics.vue"
                ),
            },
            {
                path: "coborrower-demographics",
                meta: {
                    navItem: "identity",
                    requiresAuth: true,
                },
                component: CoborrowerDemographics,
            },
        ],
    },

    // Review
    {
        path: "/review",
        name: "Review",
        meta: {
            navItem: "review",
            requiresAuth: true,
        },
        component: () =>
            import(/* webpackChunkName: "review" */ "../views/application/review/Review.vue"),
    },

    // Application Completed
    {
        path: "/application-completed",
        name: "ApplicationCompleted",
        meta: {
            navItem: null,
            requiresAuth: true,
        },
        component: () =>
            import(
                /* webpackChunkName: "applicationCompleted" */ "../views/application/review/ApplicationCompleted.vue"
            ),
    },

    //* Fallback

    // Not Found
    {
        path: "/:catchAll(.*)",
        name: "404",
        meta: {
            navItem: null,
            requiresAuth: false,
        },
        component: () =>
            import(/* webpackChunkName: "findLoanOfficer" */ "../views/FindLoanOfficer.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
