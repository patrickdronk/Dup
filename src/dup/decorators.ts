import "reflect-metadata";
import aggregateStore from "./store/AggregateStore";
import eventStore from "./store/EventStore";


export function CommandHandler(target: any, name: any, desc: any) {
}

export function EventHandler() {
    return function(target: any, name: any, desc: any) {
        console.log(`wrote meta under key: ${desc.value.name}`)
        Reflect.defineMetadata(desc.value.name, desc.value.name, target);
    }
}

export function aggregate(constructor: Function) {
    aggregateStore.addToStore(constructor)
}

export function event(constructor: Function) {
    eventStore.addToStore(constructor)
}
