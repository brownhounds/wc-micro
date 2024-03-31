import { type Hole, html as uhtml, svg as usvg } from '@brownhounds/uhtml';
import type { Component } from './Component';
import type { Reactive } from './Reactive';

export type Template = Hole;
export const html = uhtml;
export const svg = usvg;

export type ComponentDecoratorConfig = {
    tag: string;
    signals?: Reactive<unknown>[];
};

export type ComponentStaticProperties = {
    signals?: Reactive<unknown>[];
};

export type ComponentConstructor = new () => Component;
