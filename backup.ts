//region bankaccountaggregate
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
//endregion

//region bankaccountprojectionprocessor
// async handleCreatedEvent(event: BankAccountCreatedEvent) {
//   await this.save({
//     aggregateId: event.aggregateId,
//     balance: 0,
//   });
// }
//
// async handleDepositEvent(event: DepositEvent) {
//   const bankAccountProjection = await this.fetch(event.aggregateId);
//   bankAccountProjection.balance += event.amount;
//   await this.save(bankAccountProjection);
// }
//
// async handleWithdrawalEvent(event: WithdrawalEvent) {
//   const bankAccountProjection = await this.fetch(event.aggregateId);
//   bankAccountProjection.balance -= event.amount;
//   await this.save(bankAccountProjection);
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