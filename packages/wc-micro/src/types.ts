import { type Hole, html as uhtml } from 'uhtml';
import type { Component } from './Component';
import type { Reactive } from './Reactive';

export type Template = Hole;
export const html = uhtml;

export type ComponentDecoratorConfig = {
    tag: string;
    signals?: Reactive<unknown>[];
};

export type ComponentConstructor = new () => Component;
