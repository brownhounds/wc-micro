import type { Component } from './Component';
import { RenderTarget, type RenderTargetType } from './types';

export class Reactive<State> {
    private subscribers = new Set<Component>();
    private isSchedulerLocked = false;
    private proxy: State;
    private proxySet = new WeakSet<any>();

    public get value(): State {
        return this.proxy;
    }

    constructor(
        state: any,
        private renderTarget:
            | RenderTargetType
            | undefined = RenderTarget.UNKNOWN
    ) {
        this.proxy = this.create(state);
    }

    public subscribe(instance: Component): Reactive<State> {
        if (!this.subscribers.has(instance)) this.subscribers.add(instance);
        return this;
    }

    public unsubscribe(instance: Component): Reactive<State> {
        this.subscribers.delete(instance);
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
            subscriber.render(this.renderTarget);
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
