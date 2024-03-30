import { render } from 'uhtml';
import type { Template } from './types';
import { Reactive } from './Reactive';

export class Component extends HTMLElement {
    public static signals: Reactive<unknown>[] = [];

    protected componentId = Symbol(this.constructor.name);

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(): void {
        this.initializeLocalState();
        this.render();
    }

    disconnectedCallback(): void {
        this.unsubscribeFromSignals();
    }

    protected template?: () => Template;

    protected onRender?: () => void;

    protected render(): void {
        if (this.template) {
            render(this.shadowRoot, this.template());
            if (this.onRender) this.onRender();
        }
    }

    private initializeLocalState(): void {
        const statePropertyNames =
            this.constructor.prototype.statePropertyNames;

        if (statePropertyNames && statePropertyNames.length) {
            for (const propertyName of statePropertyNames) {
                const context = this as any;
                context[propertyName] = new Reactive<unknown>(
                    context[propertyName]
                ).subscribe(this.componentId, this.render.bind(this)).value;
            }
        }
    }

    private unsubscribeFromSignals(): void {
        for (const signal of Component.signals) {
            signal.unsubscribe(this.componentId);
        }
    }
}
