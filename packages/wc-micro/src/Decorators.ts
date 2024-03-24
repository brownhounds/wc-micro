import type { Component } from './Component';

type ComponentDecoratorConfig = {
    tag: string;
};

type ComponentConstructor = {
    tag: string;
};

const define = (tag: string, component: new () => Component): void => {
    if (customElements.get(tag) === undefined) {
        customElements.define(tag, component);
    }
};

export const component =
    ({ tag }: ComponentDecoratorConfig) =>
    (component: (new () => Component) & ComponentConstructor): void => {
        component.tag = tag;
        define(tag, component);
    };
