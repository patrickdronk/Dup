//region bankaccountaggregate
// private balance: number = 0;
//
// constructor() {
//   super();
// }
//
// @CommandHandler
// async handle(command: CreateBankAccountCommand) {
//   const event = new BankAccountCreatedEvent(command.aggregateId);
//   await this.apply(event);
// }
//
// @CommandHandler
// async handleWithdrawal(command: WithdrawalCommand) {
//   if (this.isBalanceSufficient(command.amount)) {
//     await this.apply(new WithdrawalEvent(command.aggregateId, command.amount));
//   } else {
//     throw new Error('Balance is insufficient');
//   }
// }
//
// @CommandHandler
// async handleDeposit(command: DepositCommand) {
//   await this.apply(new DepositEvent(command.aggregateId, command.amount));
// }
//
// @EventHandler
// async on(_event: BankAccountCreatedEvent) {
//   this.balance = 0;
// }
//
// @EventHandler
// async onDeposit(event: DepositEvent) {
//   this.balance += event.amount;
// }
//
// @EventHandler
// async onWithdrawal(event: WithdrawalEvent) {
//   this.balance -= event.amount;
// }
// private isBalanceSufficient(amountToDeduct: number): boolean {
//   return this.balance >= amountToDeduct;
// }
//endregion

//region bankaccountprojectionprocessor
// async handleCreatedEvent(event: BankAccountCreatedEvent) {
//   console.log(`Create a projection for this new bankaccount ${event.aggregateId}`);
// }
//
// async handleDepositEvent(event: DepositEvent) {
//   console.log(`Increment the balance of the bankaccount ${event.aggregateId} by ${event.amount}`);
// }
//
// async handleWithdrawalEvent(event: WithdrawalEvent) {
//   console.log(`Decrement the balance of the bankaccount ${event.aggregateId} by ${event.amount}`);
// }
//endregion

//region emailprocessor
// async handleCreatedEvent(event: BankAccountCreatedEvent) {
//   console.log(`Sending email to ${event.aggregateId}`);
// }
//
// async handleDepositEvent(_event: DepositEvent) {
//   console.log('Sending mail about deposit');
// }
//endregion