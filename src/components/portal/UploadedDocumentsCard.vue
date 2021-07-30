<template>
    <div class="uploaded-docs">
        <div class="heading-container">
            <h2 class="heading">Uploaded Documents</h2>
            <i class="fas fa-angle-down"></i>
        </div>
        <div
            class="card-body document-list needsMaxHeight"
            data-max-height="384"
            style="max-height: 384px;"
        >
            <form
                action="/home/opendocument?fileName=newest2.pdf&amp;filePath=295181-617695.pdf"
                method="post"
                target="_blank"
            >
                <div class="upload">
                    <div class="fileName-wrapper">
                        <button
                            type="submit"
                            class="document uploadFileName"
                        >
                            <span class="text">newest2.pdf</span>
                        </button>
                        <div class="fileName-tooltip">
                            newest2.pdf
                        </div>
                        <font-awesome-icon :icon="['fas', 'check']" />
                    </div>
                    <div class="file-details">
                        <button
                            type="button"
                            class="documentRequest"
                        >
                            <span class="text">Borrower ID</span>
                        </button>
                        <div class="docRequest-tooltip">
                            Borrower ID
                        </div>
                        <span class="dateUploaded">07-30-21</span>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "UploadedDocumentsCard",
};
</script>

<style lang="scss" scoped>
.uploaded-docs {
    background-color: #fff;

    @include breakpoint(tablet-land) {
        position: relative;
    }

    .card-body {
        scrollbar-color: var(--blue-dark) #f1f1f1;
        scrollbar-width: thin;

        &::-webkit-scrollbar {
            width: 10px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #c4c4c4;
            border-radius: 10px;
            border: 2px solid #fff;
        }
    }

    form:first-child .upload .fileName-tooltip,
    form:first-child .upload .docRequest-tooltip {
        top: 2.5rem;
        bottom: auto;
    }

    .upload {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .fileName-wrapper {
            position: relative;
            display: flex;
            justify-content: space-between;
            width: 100%;

            @include breakpoint(tablet-land) {
                position: static;
            }

            .fileName-tooltip {
                display: none;
                position: absolute;
                left: 0;
                z-index: 999999999999;
                bottom: 2.5rem;
                max-width: 100%;
                word-break: break-all;
                background-color: var(--teal-dark);
                color: white;
                padding: 1rem;
                border-radius: var(--app-border-radius);

                @include breakpoint(tablet-land) {
                    bottom: unset;
                    top: 2.5rem;
                }
            }

            .fa-check {
                color: var(--teal);
            }

            .uploadFileName {
                border: none;
                background-color: transparent;
                cursor: pointer;
                text-align: left;
                margin-right: 2rem;
                text-decoration: underline;
                max-width: 25rem;
                overflow-x: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                outline: none;
                font-weight: 600;

                .text {
                    display: inline-block;
                    text-decoration: underline;
                    font-family: "Nunito Sans", sans-serif;
                }

                &.tooltip-showing + .fileName-tooltip {
                    display: block;
                }
            }
        }

        .file-details {
            position: relative;
            width: 100%;
            display: flex;
            align-items: center;
            margin-top: 0.5rem;

            @include breakpoint(tablet-land) {
                position: static;
            }

            .documentRequest {
                max-width: 20rem;
                margin-right: 1rem;
                display: inline-block;
                overflow-x: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: var(--blue-green);
                font-style: italic;
                border: none;
                font-weight: 600;
                background-color: transparent;
                outline: none;
                font-family: "Nunito Sans", sans-serif;

                .text {
                    display: inline-block;
                    font-weight: 700;
                }

                &.tooltip-showing + .docRequest-tooltip {
                    display: block;
                }
            }

            .docRequest-tooltip {
                display: none;
                position: absolute;
                left: 0;
                z-index: 999999999999;
                bottom: 2.5rem;
                max-width: 100%;
                word-break: break-all;
                background-color: var(--blue-green);
                color: white;
                padding: 1rem;
                border-radius: var(--app-border-radius);

                @include breakpoint(tablet-land) {
                    bottom: unset;
                    top: 2.5rem;
                }
            }

            .dateUploaded {
                color: var(--standard-font-color);
                font-size: 12px;
            }
        }
    }
}
</style>