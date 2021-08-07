const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    # This "Book" type defines the queryable fields for every book in our data source.
    type BorrowerProfile {
        email: String!
        firstName: String!
        middleInitial: String
        lastName: String!
        password: String!
        suffix: String
        phone: String!
        maritalStatus: String!
        streetAddress: String!
        apartmentNumber: String
        city: String!
        state: String!
        zipcode: String!
        referralSource: String!
        referralSourceName: String
        loanOfficer: String
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        borrowerProfile($email: String): [BorrowerProfile]
    }
`;

const borrowerProfile = [
    {
        email: "johnnyC@email.com",
        firstName: "Johnny",
        middleInitial: "C",
        lastName: "Lately",
        suffix: null,
        phone: "5555555555",
        maritalStatus: "Single",
        streetAddress: "401 E First St",
        streetAddress2: null,
        apartmentNumber: null,
        apartmentNumber2: null,
        city: "South Whitley",
        city2: null,
        state: "IN",
        state2: null,
        zipcode: "43537",
        zipcode2: null,
        referralSource: "Radio",
        referralSourceName: null,
        loanOfficer: "clintmorgan",
    },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        borrowerProfile: () => borrowerProfile,
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
