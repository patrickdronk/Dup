export interface Registry {
  unregister: () => void;
}

export interface Callable {
  [key: string]: Function;
}

export interface Subscriber {
  [key: string]: Callable;
}

export interface ICommandBus {
  dispatch<T>(event: string, arg?: T): void;
  register(event: string, callback: Function): Registry;
}

export class CommandBus implements ICommandBus {
  private static nextId = 0;
  private subscribers: Subscriber;

  constructor() {
    this.subscribers = {};
  }

  public async dispatch<T>(event: string, arg?: T): Promise<void> {
    const subscriber = this.subscribers[event];
    console.log("subscriber:", subscriber)
    console.log("subscribers:", this.subscribers)

    if (subscriber === undefined) {
      return;
    }

    try {
      for (const key of Object.keys(subscriber)) {
        await subscriber[key](arg);
      }
    } catch(err: any) {
      throw new Error(err.message)
    }
  }

  public register(event: string, callback: Function): Registry {
    const id = this.getNextId();
    if (!this.subscribers[event]) this.subscribers[event] = {};

    this.subscribers[event][id] = callback;

    return {
      unregister: () => {
        delete this.subscribers[event][id];
        if (Object.keys(this.subscribers[event]).length === 0) {delete this.subscribers[event];}
      },
    };
  }

  private getNextId(): number {
    return CommandBus.nextId++;
  }
}