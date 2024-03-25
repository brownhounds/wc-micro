import type { Component } from './Component';
import type { ComponentConstructor, ComponentDecoratorConfig } from './types';

const define = (tag: string, component: new () => Component): void => {
    if (customElements.get(tag) === undefined) {
        customElements.define(tag, component);
    }
};

export const component =
    ({ tag }: ComponentDecoratorConfig) =>
    (component: ComponentConstructor): void => {
        component.tag = tag;
        define(tag, component);
    };
