import 'reflect-metadata';

export function CommandHandler(target: any, name: any, desc: any) {
  const idk = Reflect.getMetadata('design:paramtypes', target, name);
  Reflect.defineMetadata(`CommandHandler:${idk[0].name}`, desc.value.name, target);
}

export function EventHandler(target: any, name: any, desc: any) {
  const idk = Reflect.getMetadata('design:paramtypes', target, name);
  Reflect.defineMetadata(`EventHandler:${idk[0].name}`, desc.value.name, target);
}

export function EventProjectionHandler(target: any, name: any, desc: any, VERANDERMIJ: Function) {
  const myTypes = [];
  const idk = Reflect.getMetadata('design:paramtypes', target, name);
  Reflect.defineMetadata(`EventHandler:${idk[0].name}`, desc.value.name, target);

  myTypes.push(VERANDERMIJ)

}