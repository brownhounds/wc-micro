import { type Hole, html as uhtml } from '@brownhounds/uhtml';
import type { Component } from './Component';
import type { Reactive } from './Reactive';

export type Template = Hole;
export const html = uhtml;

export type ComponentDecoratorConfig = {
    tag: string;
    signals?: Reactive<unknown>[];
};

export type ComponentStaticProperties = {
    signals?: Reactive<unknown>[];
};

export type ComponentConstructor = new () => Component;
