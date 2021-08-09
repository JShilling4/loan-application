export const camelize = {
    methods: {
        camelize(str) {
            return str.replace(/\W+(.)/g, (match, chr) => {
                return chr.toUpperCase();
            });
        },
    },
};

export const deepClone = {
    methods: {
        deepClone(data) {
            // if (!data) {
            //     throw "Cant deep clone undefined!";
            // }
            if (typeof data === "object" ) {
                return JSON.parse(JSON.stringify({...data}));
            }
            if (data?.isArray()) {
                return JSON.parse(JSON.stringify([ ...data ]));
            }
            return data;
        },
    },
};
