import 'reflect-metadata';

export function CommandHandler(target: any, name: any, desc: any) {
  const idk = Reflect.getMetadata('design:paramtypes', target, name);
  Reflect.defineMetadata(`CommandHandler:${idk[0].name}`, desc.value.name, target);
}

export function EventHandler(target: any, name: any, desc: any) {
  const idk = Reflect.getMetadata('design:paramtypes', target, name);
  Reflect.defineMetadata(`EventHandler:${idk[0].name}`, desc.value.name, target);
}

// export function EventProjectionHandler(target: any, name: any, desc: any, EventProjectionHandler: MethodDecorator) {
//   const idk = Reflect.getMetadata('design:paramtypes', target, name);
//   Reflect.defineMetadata(`EventProjectionHandler:${idk[0].name}`, desc.value.name, target);
// }

export function ProcessorHandler(target: any, name: any, desc: any) {
  const idk = Reflect.getMetadata('design:paramtypes', target, name);
  Reflect.defineMetadata(`ProcessorHandler:${idk[0].name}`, desc.value.name, target);
}