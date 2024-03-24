import { render } from 'uhtml';
import type { Template } from './types';
import { Reactive } from './Reactive';

export class Component extends HTMLElement {
    public static tag: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {}

    template?: () => Template;

    onRender?: () => void;

    render(): void {
        if (this.template) {
            render(this.shadowRoot, this.template());
            if (this.onRender) this.onRender();
        }
    }

    protected useState<State>(state: State): State {
        return new Reactive<State>()
            .subscribe(this.constructor.name, this.render.bind(this))
            .create(state);
    }
}
