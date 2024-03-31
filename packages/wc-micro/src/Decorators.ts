import type { Component } from './Component';
import type {
    ComponentConstructor,
    ComponentDecoratorConfig,
    ComponentStaticProperties,
} from './types';

const define = (tag: string, component: new () => Component): void => {
    if (customElements.get(tag) === undefined) {
        customElements.define(tag, component);
    }
};

export const component =
    ({ tag, signals }: ComponentDecoratorConfig) =>
    (component: ComponentConstructor & ComponentStaticProperties): void => {
        const extendedClass = class extends component {
            constructor() {
                super();

                if (signals && signals.length) {
                    for (const signal of signals) {
                        signal.subscribe(this.$id, this.render.bind(this));
                    }
                }
            }
        };

        component.signals = signals || [];
        define(tag, extendedClass);
    };

export const state = (component: any, propertyName: string): void => {
    component.statePropertyNames = [
        ...(component.statePropertyNames || []),
        propertyName,
    ];
};
