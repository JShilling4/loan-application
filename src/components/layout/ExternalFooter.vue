<template>
    <footer class="footer">
        <p class="contact-block">
            <span class="line">1700 Magnavox Way Suite 220</span>
            <span class="line">Fort Wayne, IN 46804</span>
            <span class="line"><span class="tp-hide">|</span> 260.999.6200
                <span class="divider">|</span> 800.627.8633</span>
        </p>
        <div class="link-block">
            <a
                class="link"
                href="https://ruoff.com/licenses"
                target="_blank"
            >
                LICENSES
            </a>
            |
            <a
                class="link"
                href="https://ruoff.com/privacy-policy"
                target="_blank"
            >
                PRIVACY POLICY
            </a>
        </div>
        <div class="id-block">
            <div class="line">
                <a
                    href="https://www.bbb.org/us/in/fort-wayne/profile/mortgage-broker/ruoff-home-mortgage-company-inc-0352-5307/complaints#371248902"
                    target="_blank"
                    class="link"
                >
                    Better Business Bureau&nbsp;
                </a>
                <span>|</span> Equal Housing Lender
                <span class="tp-hide">|</span>
                <a
                    class="nca link"
                    href="https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/141868"
                    target="_blank"
                >
                    NMLS Consumer Access
                </a>
            </div>
            <p class="line">
                Ruoff Mortgage Company, Inc. dba Ruoff Mortgage
                <br class="tp-show" />
                NMLS ID: 141868
            </p>
        </div>
    </footer>
</template>

<script>
export default {
    name: "ExternalFooter",
};
</script>

<style lang="scss" scoped>
.footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    // color: $blue-green;
    color: #fff;
    font-weight: 400;
    font-size: 1.4rem;
    margin-top: 8rem;
    padding: 0 1rem;

    .link {
        color: #fff;
        &:hover {
            color: $orange;
        }
    }
    .contact-block {
        margin-bottom: 1rem;
        .line {
            text-align: center;
            line-height: 1.5;
        }
    }

    .link-block {
        margin-bottom: 1rem;
        .link {
            text-align: center;
            transition: color 0.3s;
            text-decoration: underline;
        }
    }

    .id-block {
        margin-bottom: 1rem;
        font-size: 1.4rem;
        .line {
            text-align: center;
            line-height: 1.5;
        }
    }
}
</style>
