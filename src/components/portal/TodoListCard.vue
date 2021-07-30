<template>
    <div class="toDoList">
        <div class="heading-container --mortgageTodoList">
            <h2 class="heading">Your Mortgage To-Do List</h2>
            <i class="fas fa-angle-down"></i>
        </div>

        <div class="card-body card-body--toDoList --open">

            <div class="signatures-needed">
                <h3 class="section-heading">Signatures Needed</h3>
                <p class="none-message">There are no signatures needed at this time.</p>

            </div>

            <div class="docs-needed">
                <div>
                    <h3 class="section-heading">
                        Document Upload
                        <button class="borrowerUpload-button">
                            Upload
                        </button>
                    </h3>

                </div>
                <div class="section-heading">
                    <h3>
                        <span>(Needed for Requests)</span>
                    </h3>
                </div>

                <p class="none-message">No documents have been requested by Ruoff yet. Upload any relevant documents you can.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TodoListCard",
};
</script>

<style lang="scss" scoped>
.signatures-needed,
.payments-needed {
    background-color: #fff;
    border-left: 1px solid var(--container-border-color);
    border-right: 1px solid var(--container-border-color);

    .section-heading {
        border-left: none;
        border-right: none;
        border-bottom: 1px solid var(--container-border-color);
    }

    .maintenance-message {
        color: var(--red);
        padding: 1rem;
    }

    .action-area {
        padding: 1.5rem 0;
        margin: 0 4rem;

        &:not(:last-child) {
            border-bottom: 1px solid var(--container-border-color);
        }
    }

    .item-container {
        display: flex;
        align-items: center;

        .icon {
            margin-right: 1rem;
            width: 14px;
            color: var(--teal-dark);
        }

        .item {
            margin-right: 2rem;

            .signerName {
                display: block;
                color: var(--blue-green);
                font-size: 12px;
            }
        }

        .btn {
            margin-left: auto;
            min-width: 8rem;
        }

        .lockedMessage {
            display: none;
        }

        .btn.locked {
            &:hover .lockedMessage {
                position: absolute;
                left: -2rem;
                bottom: 3rem;
                background-color: var(--teal-dark);
                border-radius: var(--app-border-radius);
                padding: 0.75rem;
                color: #fff;
                display: block;
                font-weight: 500;
                width: 13rem;
            }
        }
    }
}

.borrowerUpload-button {
    border: 1px solid var(--teal-dark);
    color: var(--teal-dark);
    background-color: transparent;
    padding: 0.5rem 0;
    width: 8rem;
    font-weight: 600;
    font-family: "Nunito Sans", sans-serif;
    text-align: center;
    letter-spacing: 1px;
    border-radius: var(--app-border-radius);
    font-size: 12px;
    cursor: pointer;
    transition: color 0.3s, background-color 0.3s;
    outline: none;

    &:hover {
        color: #fff;
        background-color: var(--teal-dark);
    }
}

.modal.borrowerUpload {
    .modal-content {
        min-width: 65rem;
        max-width: 65rem;
        max-height: 98%;
        overflow-y: auto;
        -ms-overflow-style: auto;
        // firefox scrollbar styles
        scrollbar-color: #142f42 #f1f1f1;
        scrollbar-width: thin;

        @include breakpoint(laptop) {
            width: 92%;
            min-width: unset;
        }

        &::-webkit-scrollbar {
            width: 10px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #c4c4c4;
            border-radius: 10px;
            border: 2px solid #fff;
        }

        .modal-header {
            display: flex;
            justify-content: flex-end;
            padding: 2rem 2rem 0;
        }

        .modal-body {
            height: 100%;
            padding: 0 4rem 2rem;

            .heading {
                font-size: 2rem;
                margin-bottom: 2rem;
                margin-top: -1.5rem;
                color: var(--blue-green);
                font-weight: 800;
            }

            .fileList {
                margin-bottom: 2rem;

                .uploadItem {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #c8c8c8;
                    padding: 1.5rem 0 0.5rem;
                    color: var(--teal);

                    @include breakpoint(tablet-port) {
                        flex-wrap: wrap;
                    }

                    .removal-wrapper {
                        margin-bottom: 0.5rem;
                        max-width: 30rem;
                        overflow-x: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;

                        @include breakpoint(tablet-port) {
                            width: 100%;
                        }
                    }

                    .fa-trash {
                        color: var(--portal-gray);
                        margin-right: 1rem;
                        cursor: pointer;
                        transition: color 0.3s;

                        &:hover {
                            color: var(--red);
                        }
                    }
                }

                .requestType-container {
                    position: relative;
                    cursor: pointer;

                    &:hover .type-list {
                        display: block;
                    }

                    .input-wrapper {
                        &:after {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-family: "Font Awesome 5 Pro";
                            content: "\f107";
                            position: absolute;
                            right: 0;
                            top: 0;
                            background-color: var(--teal-dark);
                            font-weight: 900;
                            color: #fff;
                            border-radius: 50%;
                            height: 27px;
                            width: 27px;
                        }
                    }

                    input.selectedType {
                        position: relative;
                        display: inline-block;
                        border: 1px solid var(--teal);
                        padding: 0.5rem 2.75rem 0.5rem 1rem;
                        border-radius: 2rem;
                        min-width: 20rem;
                        margin-bottom: 1rem;
                        color: var(--teal);
                        outline: none;
                    }

                    .type-list {
                        display: none;
                        position: absolute;
                        z-index: 10;
                        background-color: #fff;
                        border: 1px solid var(--teal);
                        width: 100%;
                        border-bottom-left-radius: 2rem;
                        border-bottom-right-radius: 2rem;
                        overflow-y: auto;
                        max-height: 18rem;
                        -ms-overflow-style: auto;
                        // firefox scrollbar styles
                        scrollbar-color: #142f42 #f1f1f1;
                        scrollbar-width: thin;

                        &::-webkit-scrollbar {
                            width: 10px;
                        }

                        &::-webkit-scrollbar-thumb {
                            background-color: #c4c4c4;
                            border-radius: 10px;
                            border: 2px solid #fff;
                        }

                        .custom-selector {
                            padding: 1rem 1.5rem;
                            color: var(--orange);

                            &:hover {
                                background-color: var(--orange);
                                color: #fff;
                            }
                        }

                        .type {
                            padding: 1rem 1.5rem;

                            &:hover {
                                background-color: var(--teal-dark);
                                color: #fff;
                            }

                            &:last-child {
                                border-bottom-left-radius: 2rem;
                                border-bottom-right-radius: 2rem;
                            }
                        }
                    }
                }
            }

            .internal-upload {
                position: relative;
                padding-bottom: 8rem;
                cursor: pointer;

                label {
                    color: var(--portal-gray);
                    cursor: pointer;
                    text-decoration: underline;
                    transition: color 0.3s;
                    font-weight: 700;

                    &:hover {
                        color: var(--teal);

                        .fas {
                            color: var(--teal);
                        }
                    }

                    .fas {
                        color: var(--portal-gray);
                        margin-right: 0.5rem;
                        transition: color 0.3s;
                    }
                }

                input {
                    position: absolute;
                    z-index: -1;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }
            }
        }

        .modal-footer {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 0 4rem 2rem;

            @include breakpoint(tablet-port) {
                flex-wrap: wrap;
                justify-content: flex-start;
            }

            .error-box {
                color: var(--red);
                padding-right: 2rem;

                @include breakpoint(tablet-port) {
                    padding-bottom: 1rem;
                    width: 100%;
                }
            }

            .btn {
                min-width: 20rem;
            }
        }

        .loading-spinner {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-color: #08485c80;
            border-radius: 5px;
        }
    }
}

.docs-needed {
    background-color: #fff;

    .doc-container {
        border-left: 1px solid var(--portal-gray);
        border-right: 1px solid var(--portal-gray);

        &:not(:last-child) .document {
            border-bottom: 1px solid var(--portal-gray);
        }

        &:last-child {
            border-bottom: 1px solid var(--portal-gray);
        }

        &.open .document .fa-upload,
        &.open .document .label {
            color: var(--orange);
        }

        &.open .upload-container {
            height: 13rem;
            transform: scaleY(1);
            padding: 2rem;
            opacity: 1;
        }

        .containsUpload {
            margin-left: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            font-size: 10px;
            border-radius: 50%;
            z-index: 1;
            background-color: #142f42;
            color: var(--teal);
            padding: 5px;
        }
    }

    .document {
        display: flex;
        align-items: center;
        padding: 1.5rem 0;
        margin: 0 4rem;
        cursor: pointer;
        transition: border 0.3s;

        &:hover .fa-upload,
        &:hover .label {
            color: var(--orange);
        }

        &:hover .label {
            text-decoration: underline;
        }

        .label {
            transition: color 0.3s;
            margin-right: 1rem;
        }

        .upload-icon {
            color: var(--teal-dark);
            margin-right: 1rem;
        }
    }

    .upload-container {
        height: 0;
        padding: 0;
        opacity: 0;
        margin-top: -1px;
        border: 1px solid var(--container-border-color);
        border-left: none;
        border-right: none;
        transform: scaleY(0);
        transform-origin: top;
        transition: padding 0.3s, height 0.3s, border 0.3s, transform 0.3s,
            opacity 0.8s;

        .uploadMessage {
            position: absolute;
            left: 0;
            top: 2.5rem;
            width: 100%;
            text-align: center;
            color: var(--teal-dark);
            font-weight: 600;
        }

        .upload-dropbox {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            border: 2px dotted var(--container-border-color);

            .dragDropError {
                display: none;
                position: absolute;
                background-color: #f74141;
                padding: 1rem;
                border-radius: var(--app-border-radius);
                color: #fff;
            }

            input {
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 100%;
                opacity: 0;
                min-width: unset;
                cursor: pointer;
            }

            .fa-upload {
                margin-top: 1.5rem;
                color: var(--teal-dark);
            }

            .instruction {
                font-style: italic;
                font-size: 13px;
                margin-top: 1rem;
                padding: 0 1rem;
                text-align: center;
            }
        }
    }

    .none-message {
        border: 1px solid var(--portal-gray);
        border-top: none;
        padding-top: 0;
    }
}
</style>