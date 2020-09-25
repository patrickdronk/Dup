import {createBankAccount, depositMoney, withdrawalMoney} from "./resolver/Mutation/createBankAccount";

export const resolvers = {
    Query: {
        testMessage: () => require("./resolver/Query/getSome").getUser(),
    },
    Mutation: {
        createBankAccount: createBankAccount,
        depositCommand: depositMoney,
        withdrawalCommand: withdrawalMoney,
    }
};
