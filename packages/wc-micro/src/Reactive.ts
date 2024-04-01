type SubscriberKey = symbol;
type SubscriberCallback = () => void;

export class Reactive<State> {
    public id = Symbol(this.constructor.name);

    private subscribers = new Map<SubscriberKey, SubscriberCallback>();
    private isSchedulerLocked = false;
    private proxy: State;
    private proxySet: WeakSet<any> = new WeakSet();

    public get value(): State {
        return this.proxy;
    }

    constructor(state: any) {
        this.proxy = this.create(state);
    }

    public subscribe(
        key: SubscriberKey,
        callback: SubscriberCallback
    ): Reactive<State> {
        if (!this.subscribers.get(key)) this.subscribers.set(key, callback);
        return this;
    }

    public unsubscribe(key: SubscriberKey): Reactive<State> {
        if (this.subscribers.get(key)) this.subscribers.delete(key);
        return this;
    }

    private create(state: any): State {
        const reactive = this;

        return new Proxy(state, {
            get(target, name): unknown {
                const prop = target[name];

                unsupportedCollectionError(prop);

                if (
                    typeof prop === 'object' &&
                    // eslint-disable-next-line no-null/no-null
                    prop !== null &&
                    !reactive.proxySet.has(prop)
                ) {
                    const propRef = new Proxy(prop, this);
                    reactive.proxySet.add(propRef);
                    return propRef;
                }

                return prop;
            },
            set(target, name, value): boolean {
                target[name] = value;

                unsupportedCollectionError(target);

                if (Array.isArray(target) && name === 'length') {
                    reactive.schedule();
                    return true;
                }

                reactive.schedule();
                return true;
            },
        }) as State;
    }

    private notify(): void {
        for (const subscriber of this.subscribers) {
            const [, callback] = subscriber;
            callback();
        }
    }

    private schedule(): void {
        if (!this.isSchedulerLocked) {
            this.isSchedulerLocked = true;
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
