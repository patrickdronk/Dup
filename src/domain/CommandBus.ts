import {Command} from "./commands";
import {BankAccountAggregate} from "./BankAccountAggragate";

class CommandBus {
    send(command: Command) {
        // fuck
        const aggregate = new BankAccountAggregate()

        // aggregate.rebuild
        //todo

        //handle new command
        aggregate.handle(command)
    }
}

const commandBus = new CommandBus()

export default commandBus