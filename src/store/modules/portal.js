// import { portalApi } from "@/api";

export default {
    state: {
        milestones: [
            {
                id: 1,
                tooltipText: `Milestone Completed! You have provided all of the relevant details for your loan officer
                        to make an informed decision on what products and programs are best suited for your unique situation.`,
                englishTitle: "Application Received",
                spanishTitle: "Aplicación Recibida",
            },
            {
                id: 2,
                tooltipText: `Once you've completed your application, your loan officer will want you to provide a few
                        standard documents that an underwriter needs to verify the information you provide on your
                        application.`,
                englishTitle: "Documents Uploaded",
                spanishTitle: "Documentos Cargados",
            },
            {
                id: 3,
                tooltipText: `After reviewing some options with you, your Loan Officer will send you paperwork for the
                            loan you choose. You'll e-sign that right here in our portal. Note that there will still
                            be documents you’ll need to download, sign and upload. You’ll see those at the end of
                            the e-signing process.`,
                englishTitle: "Initial Disclosure Signed",
                spanishTitle: "Declaración Inicial Firmada",
            },
            {
                id: 4,
                tooltipText: `After providing loan details, documentation, and signed disclosures, you will have completed
                            your application. In this stage, your Loan Officer will review what you've provided and notify
                            you if something important has been missed.`,
                englishTitle: "Application Complete",
                spanishTitle: "Aplicación Completa",
            },
            {
                id: 5,
                tooltipText: `In this milestone, the initial stages of your application have been completed and our loan team
                            members will be preparing your loan to go through underwriting.`,
                englishTitle: "Submitted to Underwriting",
                spanishTitle: "Sometido A Evaluación",
            },
            {
                id: 6,
                tooltipText: `This milestone is reached once your loan has received an initial approval by a Ruoff underwriter.`,
                englishTitle: "Initial Underwriting Approval",
                spanishTitle: "Aprobación Inicial De Evaluación",
            },
            {
                id: 7,
                tooltipText: `After receiving initial approval, you will be working towards Final Approval. Once that is
                            reached, your Loan Officer will begin preparing you for closing.`,
                englishTitle: "Final Approval (Clear-to-Close)",
                spanishTitle: "Aprobación Final (Habilitado para el Cierre)",
            },
            {
                id: 8,
                tooltipText: `Once Final Approval has been reached, Ruoff must have a Preliminary Closing Disclosure signed
                            by all borrowers within 3 business days of the closing. Each borrower is notified by email when
                            the Closing Disclosure is ready to sign in the portal.`,
                englishTitle: "Closing Disclosures Received",
                spanishTitle: "Declaraciones De Cierre Recibidas",
            },
            {
                id: 9,
                tooltipText: `After signing your Preliminary Closing Disclosure, a Ruoff Closer is assigned to your file to
                            finalize your closing figures with the Title Company (or Attorney's Office). We will then send
                            you the Closing Package, which can be largely signed electronically.`,
                englishTitle: "Digital Closing Completed",
                spanishTitle: "Cierre Digital Completado",
            },
            {
                id: 10,
                tooltipText: `Prior to closing, your Ruoff Closer will wire funds to the Title Company (or Attorney's Office) so
                            that they can disburse the funds to the appropriate parties at closing.`,
                englishTitle: "Funds Wired to Title Company",
                spanishTitle: "Fondos Transferidos a la Compañía de Títulos de Propiedad",
            },
        ],
        milestoneProgress: [
            {
                milestoneId: 1,
                status: "completed",
                completedDate: "02/27/2021",
            },
            {
                milestoneId: 2,
                status: "completed",
                completedDate: "03/01/2021",
            },
            {
                milestoneId: 3,
                status: "incomplete",
                completedDate: null,
            },
            {
                milestoneId: 4,
                status: "incomplete",
                completedDate: null,
            },
            {
                milestoneId: 5,
                status: "incomplete",
                completedDate: null,
            },
            {
                milestoneId: 6,
                status: "incomplete",
                completedDate: null,
            },
            {
                milestoneId: 7,
                status: "incomplete",
                completedDate: null,
            },
            {
                milestoneId: 8,
                status: "incomplete",
                completedDate: null,
            },
            {
                milestoneId: 9,
                status: "incomplete",
                completedDate: null,
            },
            {
                milestoneId: 10,
                status: "incomplete",
                completedDate: null,
            },
        ],
        fileUpdates: [
            {
                id: 1,
                text: `Your application has been received! Please upload any applicable documents by clicking
                    the “Upload” button under the “Document Upload” Section of Your Mortgage To-Do List.
                    If you need guidance, reach out to your Loan Officer for assistance.`,
                loggedDatetime: "2021-01-19 03:14:07",
            },
            {
                id: 2,
                text: `This is some other upate. It is the newest. Woohoo.`,
                loggedDatetime: "2021-01-22 05:14:07",
            },
            {
                id: 3,
                text: `This is a third update. Gotta test that sort.`,
                loggedDatetime: "2021-01-20 01:14:07",
            },
        ],
    },
    mutations: {},
    actions: {},
    getters: {},
};
