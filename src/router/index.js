import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

// Root
import Index from "../views/Index.vue";
// About
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
import CoborrowerOtherProperties from "../views/application/property/otherProperties/CoborrowerOtherProperties.vue";
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
        name: "login",
        meta: {
            navItem: null,
            requiresAuth: false,
        },
        component: () => import(/* webpackChunkName: "Login" */ "../views/account/Login.vue"),
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
            import(/* webpackChunkName: "CreateAccount" */ "../views/account/CreateAccount.vue"),
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
            import(/* webpackChunkName: "ForgotPassword" */ "../views/account/ForgotPassword.vue"),
    },

    // Faq
    {
        path: "/faq",
        name: "Faq",
        meta: {
            navItem: null,
            requiresAuth: false,
        },
        component: () => import(/* webpackChunkName: "Faq" */ "../views/Faq.vue"),
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
            requiresAuth: false,
        },
        component: () =>
            import(/* webpackChunkName: "Profile" */ "../views/application/profile/Profile.vue"),
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
            // Referral
            {
                path: "referral",
                meta: {
                    navItem: "about",
                    requiresAuth: true,
                },
                component: () =>
                    import(
                        /* webpackChunkName: "Referral" */ "../views/application/about/Referral.vue"
                    ),
            },
            // Select Loan Officer
            {
                path: "select-loan-officer",
                meta: {
                    navItem: "about",
                    requiresAuth: true,
                },
                component: () =>
                    import(
                        /* webpackChunkName: "SelectLoanOfficer" */ "../views/application/about/SelectLoanOfficer.vue"
                    ),
            },
            // Veteran
            {
                path: "veteran",
                meta: {
                    navItem: "about",
                    requiresAuth: true,
                },
                component: () =>
                    import(
                        /* webpackChunkName: "Veteran" */ "../views/application/about/Veteran.vue"
                    ),
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
            // Other Properties
            {
                path: "other-properties",
                meta: {
                    navItem: "property",
                    requiresAuth: true,
                },
                component: OtherProperties,
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
            // Coborrower address history
            {
                path: "coborrower-address-history",
                meta: {
                    navItem: "property",
                    requiresAuth: true,
                },
                component: CoborrowerAddressHistory,
            },
            // Coborrower Other Properties
            {
                path: "coborrower-properties",
                meta: {
                    navItem: "property",
                    requiresAuth: true,
                },
                component: CoborrowerOtherProperties,
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
            // income history
            {
                path: "income-history",
                meta: {
                    navItem: "income",
                    requiresAuth: true,
                },
                component: IncomeHistory,
            },
            // credit check
            {
                path: "credit-check",
                meta: {
                    navItem: "income",
                    requiresAuth: true,
                },
                component: CreditCheck,
            },
            // coborrower income history
            {
                path: "coborrower-income-history",
                meta: {
                    navItem: "income",
                    requiresAuth: true,
                },
                component: CoborrowerIncomeHistory,
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
                component: () =>
                    import(
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

// Navigation Guards

router.beforeEach((routeTo, routeFrom, next) => {
    // Check if auth is required on this route
    // (including nested routes).
    const requiresAuth = routeTo.matched.some((route) => route.meta.requiresAuth);
    // const isProfileRoute = routeTo.fullPath.includes("profile");
    // If auth isn't required for the route, just continue.
    if (!requiresAuth) {
        if (routeTo.fullPath.includes("profile")) {
            return store.dispatch("validateToken").then(() => {
                next()
            });
        }
        return next();
    }
    // If auth is required and the user is logged in...
    if (store.state.auth.token) {
        // Validate the local user token...
        return store.dispatch("validateToken").then((validUser) => {
            // Then continue if the token still represents a valid user,
            // otherwise redirect to login.
            // console.log(`returned from validate: ${validUser}`)
            validUser ? next() : redirectToLogin();
        });
    }

    // If auth is required and the user is NOT currently logged in,
    // redirect to login.
    redirectToLogin();

    function redirectToLogin() {
        // Pass the original route to the login component
        next({ name: "login", query: { redirectFrom: routeTo.fullPath } });
    }
});

export default router;
