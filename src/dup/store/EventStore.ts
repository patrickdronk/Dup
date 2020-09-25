class EventStore {

    store: any = {};

    addToStore(aggregate: Function) {
        this.store = {...this.store,  [aggregate.name]: aggregate}
    }

    getStore(): any {
        return this.store;
    }
}

const eventStore = new EventStore();
export default eventStore;

