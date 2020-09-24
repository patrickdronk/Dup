import "reflect-metadata";

export function CommandHandler(target: any, name: any, desc: any) {
    // console.log(target, name, desc);
}

export function EventHandler(target: any, name: any, desc: any) {
    // console.log(target, name, desc)
    console.log('decorating');

    const eventType = Reflect.getMetadata("design:paramtypes", desc.value);
    console.log(eventType);
    Reflect.defineMetadata("eventhandler", desc.value, target)
    ;
}
