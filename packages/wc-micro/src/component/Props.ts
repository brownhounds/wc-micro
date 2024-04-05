import { Reactive } from '../Reactive';
import { RenderTrigger } from '../types';
import type { Component } from './Component';

export class Props<ComponentProps = unknown> {
    public data = {} as ComponentProps;
    private cache = new Map<string, unknown>();

    constructor(private component: Component) {}

    public initialize(): void {
        this.data = new Reactive<ComponentProps>(
            this.data,
            RenderTrigger.PROPS
        ).subscribe(this.component).value;
    }

    public setReactive(name: string, value: unknown): void {
        (this.data as any)[name] = value;
    }

    public set(name: string, value: unknown): void {
        if (
            typeof value === 'object' &&
            // eslint-disable-next-line no-null/no-null
            value !== null
        ) {
            this.set(name, value);
            return;
        }

        if (typeof value === 'function') {
            if (!this.cache.has(name)) {
                this.updateCacheAndSet(name, value);
            }
            return;
        }

        if (!this.cache.has(name)) {
            this.updateCacheAndSet(name, value);
        } else {
            if (this.cache.get(name) !== value) {
                this.updateCacheAndSet(name, value);
            }
        }
    }

    private updateCacheAndSet(name: string, value: unknown): void {
        this.cache.set(name, value);
        this.setReactive(name, value);
    }
}
