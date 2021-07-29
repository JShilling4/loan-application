// import { portalApi } from "@/api";

export default {
    state: {
        milestones: [
            {
                id: 1,
                tooltipText: `Milestone Completed! You have provided all of the relevant details for your loan officer
                        to make an informed decision on what products and programs are best suited for your unique situation.`,
                title: "Application Received",
            },
            {
                id: 2,
                tooltipText: `Once you've completed your application, your loan officer will want you to provide a few
                        standard documents that an underwriter needs to verify the information you provide on your
                        application.`,
                title: "Documents Uploaded",
            },
            {
                id: 3,
                tooltipText: `After reviewing some options with you, your Loan Officer will send you paperwork for the
                            loan you choose. You'll e-sign that right here in our portal. Note that there will still
                            be documents you’ll need to download, sign and upload. You’ll see those at the end of
                            the e-signing process.`,
                title: "Initial Disclosure Signed",
            },
            {
                id: 4,
                tooltipText: `After providing loan details, documentation, and signed disclosures, you will have completed
                            your application. In this stage, your Loan Officer will review what you've provided and notify
                            you if something important has been missed.`,
                title: "Application Complete",
            },
            {
                id: 5,
                tooltipText: `In this milestone, the initial stages of your application have been completed and our loan team
                            members will be preparing your loan to go through underwriting.`,
                title: "Submitted to Underwriting",
            },
            {
                id: 6,
                tooltipText: `This milestone is reached once your loan has received an initial approval by a Ruoff underwriter.`,
                title: "Initial Underwriting Approval",
            },
            {
                id: 7,
                tooltipText: `After receiving initial approval, you will be working towards Final Approval. Once that is
                            reached, your Loan Officer will begin preparing you for closing.`,
                title: "Final Approval (Clear-to-Close)",
            },
            {
                id: 8,
                tooltipText: `Once Final Approval has been reached, Ruoff must have a Preliminary Closing Disclosure signed
                            by all borrowers within 3 business days of the closing. Each borrower is notified by email when
                            the Closing Disclosure is ready to sign in the portal.`,
                title: "Closing Disclosures Received",
            },
            {
                id: 9,
                tooltipText: `After signing your Preliminary Closing Disclosure, a Ruoff Closer is assigned to your file to
                            finalize your closing figures with the Title Company (or Attorney's Office). We will then send
                            you the Closing Package, which can be largely signed electronically.`,
                title: "Digital Closing Completed",
            },
            {
                id: 10,
                tooltipText: `Prior to closing, your Ruoff Closer will wire funds to the Title Company (or Attorney's Office) so
                            that they can disburse the funds to the appropriate parties at closing.`,
                title: "Funds Wired to Title Company",
            },
        ],
        milestoneProgress: [
            {
                milestoneId: 1,
                status: "completed",
                completedDate: "02/27/2021"
            },
            {
                milestoneId: 2,
                status: "incomplete",
                completedDate: null
            },
            {
                milestoneId: 3,
                status: "incomplete",
                completedDate: null
            },
            {
                milestoneId: 4,
                status: "incomplete",
                completedDate: null
            },
            {
                milestoneId: 5,
                status: "incomplete",
                completedDate: null
            },
            {
                milestoneId: 6,
                status: "incomplete",
                completedDate: null
            },
            {
                milestoneId: 7,
                status: "incomplete",
                completedDate: null
            },
            {
                milestoneId: 8,
                status: "incomplete",
                completedDate: null
            },
            {
                milestoneId: 9,
                status: "incomplete",
                completedDate: null
            },
            {
                milestoneId: 10,
                status: "incomplete",
                completedDate: null
            },
        ],
        fileUpdates: [

        ]
    },
    mutations: {},
    actions: {},
    getters: {},
};
