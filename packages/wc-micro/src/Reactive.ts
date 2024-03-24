type SubscriberKey = string | symbol;
type SubscriberCallback = () => void;
type Scheduler = (() => void) | undefined;

export class Reactive<ReactiveState> {
    private subscribers = new Map<SubscriberKey, SubscriberCallback>();

    private scheduler?: Scheduler;

    public create(state: any): ReactiveState {
        const self = this;

        return new Proxy(state, {
            get(target, name) {
                const prop = target[name];

                self.unsuportedCollectionsError(prop);

                if (typeof prop === 'object') {
                    return new Proxy(prop, this);
                }

                return prop;
            },

            set(target, name, value): boolean {
                target[name] = value;

                self.unsuportedCollectionsError(target);

                if (Array.isArray(target)) {
                    if (name === 'length') {
                        self.schedule();
                    }
                } else {
                    self.schedule();
                }

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
        if (!this.scheduler) {
            this.scheduler = this.notify;
            setTimeout(() => {
                this.scheduler?.();
                this.scheduler = undefined;
            }, 0);
        }
    }

    private unsuportedCollectionsError(prop: any): void {
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
    }

    public subscribe(
        key: SubscriberKey,
        callback: SubscriberCallback
    ): Reactive<ReactiveState> {
        if (!this.subscribers.get(key)) this.subscribers.set(key, callback);

        return this;
    }

    public unsubcribe(key: SubscriberKey): Reactive<ReactiveState> {
        if (this.subscribers.get(key)) this.subscribers.delete(key);
        return this;
    }
}
