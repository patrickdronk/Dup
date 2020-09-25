import "reflect-metadata";

export function CommandHandler(target: any, name: any, desc: any) {
}

export function EventHandler() {
    return function(target: any, name: any, desc: any) {
        console.log(`wrote meta under key: ${desc.value.name}`)
        Reflect.defineMetadata(desc.value.name, desc.value.name, target);
    }
}
