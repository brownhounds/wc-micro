type SubscriberKey = string | symbol;
type SubscriberCallback = () => void;

export class Reactive<ReactiveState> {
    public id = Symbol(this.constructor.name);

    private subscribers = new Map<SubscriberKey, SubscriberCallback>();
    private isSchedulerLocked = false;
    private proxy: ReactiveState;

    constructor(state: any) {
        this.proxy = this.create(state);
    }

    public subscribe(
        key: SubscriberKey,
        callback: SubscriberCallback
    ): Reactive<ReactiveState> {
        if (!this.subscribers.get(key)) this.subscribers.set(key, callback);
        return this;
    }

    public unsubscribe(key: SubscriberKey): Reactive<ReactiveState> {
        if (this.subscribers.get(key)) this.subscribers.delete(key);
        return this;
    }

    public value(): ReactiveState {
        return this.proxy;
    }

    private create(state: any): ReactiveState {
        const self = this;

        return new Proxy(state, {
            get(target, name): unknown {
                const prop = target[name];

                unsupportedCollectionError(prop);

                if (typeof prop === 'object') {
                    return new Proxy(prop, this);
                }

                return prop;
            },
            set(target, name, value): boolean {
                target[name] = value;

                unsupportedCollectionError(target);

                if (Array.isArray(target) && name === 'length') {
                    self.schedule();
                    return true;
                }

                self.schedule();
                return true;
            },
        }) as ReactiveState;
    }

    private notify(): void {
        for (const subscriber of this.subscribers) {
            const [, callback] = subscriber;
            callback();
        }
    }

    private schedule(): void {
        if (!this.isSchedulerLocked) {
            setTimeout(() => {
                this.notify();
                this.isSchedulerLocked = false;
            }, 0);
        }
    }
}

const unsupportedCollectionError = (prop: any): any => {
    if (
        prop instanceof Map ||
        prop instanceof WeakMap ||
        prop instanceof Set ||
        prop instanceof WeakSet
    ) {
        throw new Error(
            'Reactive state does not support collections: Map, WeakMap, Set, WeakSet'
        );
    }
};
