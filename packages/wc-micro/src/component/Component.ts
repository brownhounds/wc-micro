import { RenderTarget, type RenderTargetType, type Template } from '../types';
import { Reactive } from '../Reactive';
import { App } from '../App';
import { Renderer } from './Renderer';

export class Component<ComponentProps = unknown> extends HTMLElement {
    public static signals: Reactive<unknown>[] = [];

    private $props = {} as ComponentProps;

    private $renderer = new Renderer(this);

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

    public template?: () => Template;

    public onRender?: (renderTriggers?: RenderTargetType[]) => void;

    protected onMount?: () => void;

    protected beforeMount?: () => void;

    public render(renderTrigger: RenderTargetType): void {
        this.$renderer.schedule(renderTrigger);
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
