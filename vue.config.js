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
};
