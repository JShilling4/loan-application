export default {
    methods: {
        camelize: (str) => {
            return str.replace(/\W+(.)/g, (match, chr) => {
                return chr.toUpperCase();
            });
        },
    },
};
