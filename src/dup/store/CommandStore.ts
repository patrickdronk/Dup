class CommandStore {

    store: any = {};

    addToStore(aggregate: Function) {
        this.store = {...this.store,  [aggregate.name]: aggregate}
    }

    getStore(): any {
        return this.store;
    }
}

const commandStore = new CommandStore();
export default commandStore;

