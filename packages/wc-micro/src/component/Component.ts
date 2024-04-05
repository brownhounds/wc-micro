import { RenderTarget, type RenderTargetType, type Template } from '../types';
import { Reactive } from '../Reactive';
import { App } from '../App';
import { Renderer } from './Renderer';
import { LocalState } from './LocalState';

export class Component<ComponentProps = unknown> extends HTMLElement {
    public static signals: Reactive<unknown>[] = [];

    private $props = {} as ComponentProps;
    private $renderer = new Renderer(this);
    private $localState = new LocalState(this);

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
        this.$localState.initialize();
        this.beforeMount?.();
        this.render(RenderTarget.ON_MOUNT);
        this.onMount?.();
    }

    disconnectedCallback(): void {
        this.unsubscribeFromSignals();
    }

    public template?: () => Template;

    public onRender?: (renderTriggers?: RenderTargetType[]) => void;

    protected onMount?: () => void;

    protected beforeMount?: () => void;

    public render(renderTrigger?: RenderTargetType): void {
        this.$renderer.schedule(renderTrigger || RenderTarget.UNKNOWN);
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
