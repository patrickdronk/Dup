import {CommandProcessor} from "../../../../dup/CommandProcessor";
import {EventProcessor} from "../../../../dup/EventProcessor";
import {commandbus, createBankAccountCommand, depositCommand, withdrawalCommand} from "../../../../dup/commandbus";
import {CreateBankAccountCommand, DepositCommand, WithdrawalCommand} from "../../../../domain/account/commands";

export const createBankAccount = (context:any, command: any) => {
    const commandProcessor = new CommandProcessor();
    const eventProcessor = new EventProcessor();
    commandProcessor.listen();
    eventProcessor.listen();

    commandbus.publish(createBankAccountCommand(new CreateBankAccountCommand(command.createBankAccountCommand.aggregateIdentifier)));

    return {
        message: 'Successfully created account'
    };
};

export const depositMoney = (context:any, command: any) => {
    const commandProcessor = new CommandProcessor();
    const eventProcessor = new EventProcessor();
    commandProcessor.listen();
    eventProcessor.listen();

    commandbus.publish(depositCommand(new DepositCommand(command.depositCommand.aggregateIdentifier,command.depositCommand.amount as number)));

    return {
        message: 'Successfully upgraded your monies'
    };
};

export const withdrawalMoney = (context:any, command: any) => {
    const commandProcessor = new CommandProcessor();
    const eventProcessor = new EventProcessor();
    commandProcessor.listen();
    eventProcessor.listen();

    commandbus.publish(withdrawalCommand(new WithdrawalCommand(command.withdrawalCommand.aggregateIdentifier,command.withdrawalCommand.amount)));

    return {
        message: 'Successfully created account'
    };
};
