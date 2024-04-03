import type { Reactive } from '../Reactive';

type ComponentDecoratorConfig = {
    tag: string;
    signals?: Reactive<unknown>[];
};

type Component = (new () => any) & { signals: Reactive<unknown>[] };

const define = (tag: string, component: Component): void => {
    if (customElements.get(tag) === undefined) {
        customElements.define(tag, component);
    }
};

export const component =
    ({ tag, signals }: ComponentDecoratorConfig) =>
    (component: Component): void => {
        const extendedClass = class extends component {
            constructor() {
                super();

                if (signals && signals.length) {
                    for (const signal of signals) {
                        signal.subscribe(this as any);
                    }
                }
            }
        };

        component.signals = signals || [];
        define(tag, extendedClass);
    };
