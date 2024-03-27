import { Component } from './Component';
import type { ComponentConstructor, ComponentDecoratorConfig } from './types';

const define = (tag: string, component: new () => Component): void => {
    if (customElements.get(tag) === undefined) {
        customElements.define(tag, component);
    }
};

export const component =
    ({ tag, signals }: ComponentDecoratorConfig) =>
    (component: ComponentConstructor & ComponentDecoratorConfig): void => {
        component.tag = tag;

        const extendedClass = class extends component {
            constructor() {
                super();

                if (signals && signals.length) {
                    for (const signal of signals) {
                        signal.subscribe(
                            this.componentId,
                            this.render.bind(this)
                        );
                    }
                }
            }
        };

        component.signals = signals || [];
        define(tag, extendedClass);
    };
