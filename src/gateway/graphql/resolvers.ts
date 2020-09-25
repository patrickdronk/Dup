export const resolvers = {
    Query: {
        testMessage: () => require("./resolver/Query/getSome").getUser(),
    },
    Mutation: {
        createBankAccount: () => require("./resolver/Mutation/bankAccount").bankAccount(),
    }
};
