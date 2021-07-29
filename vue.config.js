module.exports = {
    configureWebpack: (config) => {
        config.devtool = "source-map";
    },

    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import "@/design/scss/_variables.scss";
                    @import "@/design/scss/_mixins.scss";
                `,
                sourceMap: true,
            },
        },
        sourceMap: true,
    },

    devServer: {
        host: "localhost",
    },

    pluginOptions: {
      i18n: {
        locale: 'en',
        fallbackLocale: 'en',
        localeDir: 'locales',
        enableLegacy: false,
        runtimeOnly: false,
        compositionOnly: false,
        fullInstall: true
      }
    }
};
