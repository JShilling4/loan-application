import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";


export default {
    install(app) {
        const cache = new InMemoryCache();

        const apolloClient = new ApolloClient({
            cache,
            uri: "http://localhost:4042/graphql",
        });

        const apolloProvider = createApolloProvider({
            defaultClient: apolloClient,
        });

        app.use(apolloProvider);
    }
}

