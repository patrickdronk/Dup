import {BankAccountAggregate} from "../../domain/account/bankAccountAggregate";

class AggregateStore {

    store: any = {};

    addToStore(aggregate: Function) {
        console.log("store: ", this.store)
        console.log("adding aggregate to store")
        console.log("aggregate", aggregate)
        this.store = {...this.store,  [aggregate.name]: aggregate}
        console.log("store: ", this.store)
    }

    getStore(): any {
        return this.store;
    }
}

const aggregateStore = new AggregateStore();
export default aggregateStore;

const obj = {
    BankAccountAggregate
}

