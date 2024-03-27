import { render } from 'uhtml';
import type { Template } from './types';
import { Reactive } from './Reactive';

export class Component extends HTMLElement {
    public static tag: string;
    public static signals: Reactive<unknown>[] = [];

    protected componentId = Symbol(this.constructor.name);

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(): void {
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

    protected useState<State>(state: State): State {
        return new Reactive<State>(state).subscribe(
            this.componentId,
            this.render.bind(this)
        ).value;
    }

    private unsubscribeFromSignals(): void {
        for (const signal of Component.signals) {
            signal.unsubscribe(this.componentId);
        }
    }
}
