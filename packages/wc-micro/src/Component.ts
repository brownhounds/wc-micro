import type { Template } from './types';
import { Reactive } from './Reactive';
import { render } from '@brownhounds/uhtml';

export class Component<ComponentProps = unknown> extends HTMLElement {
    public static signals: Reactive<unknown>[] = [];
    protected $id = Symbol(this.constructor.name);

    // TODO: Figure it out how to configure this as a user (ME)
    private $shadowDOM = false; // Temporary
    private $props = {} as ComponentProps;

    public get root(): HTMLElement | ShadowRoot | null {
        return this.$shadowDOM ? this.shadowRoot : this;
    }

    protected get props(): ComponentProps {
        return this.$props;
    }

    constructor() {
        super();
        if (this.$shadowDOM) this.attachShadow({ mode: 'open' });
    }

    connectedCallback(): void {
        this.initializeProps();
        this.initializeLocalState();
        if (this.beforeMount) this.beforeMount();
        this.render();
        if (this.onMount) this.onMount();
    }

    disconnectedCallback(): void {
        this.unsubscribeFromSignals();
    }

    protected template?: () => Template;

    protected onRender?: () => void;

    protected onMount?: () => void;

    protected beforeMount?: () => void;

    protected render(): void {
        if (this.template) {
            render(this.root, this.template());
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
                ).subscribe(this.$id, this.render.bind(this)).value;
            }
        }
    }

    private initializeProps(): void {
        this.$props = new Reactive<ComponentProps>(this.$props).subscribe(
            this.$id,
            this.render.bind(this)
        ).value;
    }

    private unsubscribeFromSignals(): void {
        for (const signal of Component.signals) {
            signal.unsubscribe(this.$id);
        }
    }
}
