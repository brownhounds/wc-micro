import { RenderTarget, type RenderTargetType, type Template } from './types';
import { Reactive } from './Reactive';
import { render } from '@brownhounds/uhtml';
import { App } from './App';

export class Component<ComponentProps = unknown> extends HTMLElement {
    public static signals: Reactive<unknown>[] = [];

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
        this.beforeMount?.();
        this.render(RenderTarget.CONNECTED_CALLBACK);
        this.onMount?.();
    }

    disconnectedCallback(): void {
        this.unsubscribeFromSignals();
    }

    protected template?: () => Template;

    protected onRender?: (renderTrigger?: string) => void;

    protected onMount?: () => void;

    protected beforeMount?: () => void;

    // TODO: Emit an array of targets that rendered the component
    public render(renderTrigger?: RenderTargetType): void {
        if (this.template) {
            render(this.root, this.template!());
            this.onRender?.(renderTrigger);
        }
    }

    private initializeLocalState(): void {
        const statePropertyNames =
            this.constructor.prototype.statePropertyNames;

        if (statePropertyNames && statePropertyNames.length) {
            for (const propertyName of statePropertyNames) {
                const context = this as any;
                context[propertyName] = new Reactive<unknown>(
                    context[propertyName],
                    RenderTarget.LOCAL_STATE
                ).subscribe(this).value;
            }
        }
    }

    private initializeProps(): void {
        this.$props = new Reactive<ComponentProps>(
            this.$props,
            RenderTarget.PROPS
        ).subscribe(this).value;
    }

    private unsubscribeFromSignals(): void {
        for (const signal of Component.signals) {
            signal.unsubscribe(this);
        }
    }
}
