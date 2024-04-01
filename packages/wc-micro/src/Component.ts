import type { Template } from './types';
import { Reactive } from './Reactive';
import { render } from '@brownhounds/uhtml';
import { App } from './App';

export class Component<ComponentProps = unknown> extends HTMLElement {
    public static signals: Reactive<unknown>[] = [];
    protected $id = Symbol(this.constructor.name);

    private $props = {} as ComponentProps;

    public get root(): HTMLElement | ShadowRoot | null {
        return App.config.shadowDOM ? this.shadowRoot : this;
    }

    protected get props(): ComponentProps {
        return this.$props;
    }

    constructor() {
        super();
        if (App.config.shadowDOM) this.attachShadow({ mode: 'open' });
    }

    connectedCallback(): void {
        this.initializeProps();
        this.initializeLocalState();
        if (this.beforeMount) this.beforeMount();
        this.render('connectedCallback');
        if (this.onMount) this.onMount();
    }

    disconnectedCallback(): void {
        this.unsubscribeFromSignals();
    }

    protected template?: () => Template;

    protected onRender?: (target?: string) => void;

    protected onMount?: () => void;

    protected beforeMount?: () => void;

    // TODO: Make targets enum
    // TODO: Emit an array of targets that rendered the component
    protected render(target?: string): void {
        if (this.template) {
            render(this.root, this.template!());
            if (this.onRender) this.onRender(target);
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
                ).subscribe(
                    this.$id,
                    this.render.bind(this, 'localState')
                ).value;
            }
        }
    }

    private initializeProps(): void {
        this.$props = new Reactive<ComponentProps>(this.$props).subscribe(
            this.$id,
            this.render.bind(this, 'props')
        ).value;
    }

    private unsubscribeFromSignals(): void {
        for (const signal of Component.signals) {
            signal.unsubscribe(this.$id);
        }
    }
}
