import "reflect-metadata";
import {Aggregate} from "./aggregate";
import aggregateStore from "../AggregateStore";

export function Aggregate(target: any) {
    return (target: any) => {
        console.log('added to store')
        aggregateStore.addToStore(target)
    }
}

export function CommandHandler(target: any, name: any, desc: any) {
    const idk = Reflect.getMetadata("design:paramtypes", target, name)
    Reflect.defineMetadata(`CommandHandler:${idk[0].name}`, desc.value.name, target);
}

export function EventHandler(target: any, name: any, desc: any) {
    const idk = Reflect.getMetadata("design:paramtypes", target, name)
    Reflect.defineMetadata(`EventHandler:${idk[0].name}`, desc.value.name, target);
}
