import "reflect-metadata";

export function CommandHandler(target: any, name: any, desc: any) {
}

export function EventHandler(target: any, name: any, desc: any) {
    Reflect.defineMetadata(desc.value.name, desc.value.name, target);
}
