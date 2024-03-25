import { render } from 'uhtml';
import type { ComponentConstructor, Template } from './types';
import { Reactive } from './Reactive';

export class Component extends HTMLElement {
    public static tag: string;
    public static signals = new Map<symbol, Reactive<unknown>>();

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(): void {
        this.render();
    }

    disconnectedCallback(): void {
        this.dropAllSignals();
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
        return new Reactive<State>(state)
            .subscribe(this.constructor.name, this.render.bind(this))
            .value();
    }

    protected useSignal<ReactiveState>(
        signal: Reactive<ReactiveState>
    ): ReactiveState {
        // TODO: Validate that I can use same identifier for multiple instances of the same components
        signal.subscribe(this.constructor.name, this.render.bind(this));

        const constructor = this.constructor as ComponentConstructor;

        if (!constructor.signals.get(signal.id)) {
            constructor.signals.set(signal.id, signal);
        }

        return signal.value();
    }

    // TODO: Sleep on THIS, do I allow to drop state, do I ??
    // If yes how do I deal with artifacts, cleanup assignment to class property
    // private dropSignal(signal: Reactive<unknown>): void {
    //     // TODO: Validate that I can use same identifier for multiple instances of the same components
    //     signal.unsubscribe(this.constructor.name);

    //     const constructor = this.constructor as ComponentConstructor;

    //     if (constructor.signals.get(signal.id)) {
    //         constructor.signals.delete(signal.id);
    //     }
    // }

    private dropAllSignals(): void {
        const constructor = this.constructor as ComponentConstructor;

        for (const signal of constructor.signals) {
            const [, signalToDrop] = signal;
            signalToDrop.unsubscribe(this.constructor.name);
        }
    }
}
