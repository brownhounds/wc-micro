import { RenderTrigger, type RenderTriggerType, type Template } from '../types';
import { App } from '../App';
import { Renderer } from './Renderer';
import { LocalState } from './LocalState';
import { Props } from './Props';
import type { Reactive } from '../Reactive';

export class Component<ComponentProps = unknown> extends HTMLElement {
    public static signals: Reactive<unknown>[] = [];

    private $props = new Props<ComponentProps>(this);
    private $renderer = new Renderer(this);
    private $localState = new LocalState(this);

    public get root(): HTMLElement | ShadowRoot | null {
        return App.config.shadowDOM ? this.shadowRoot : this;
    }

    protected get props(): ComponentProps {
        return this.$props.data;
    }

    constructor() {
        super();
        if (App.config.shadowDOM) this.attachShadow({ mode: 'open' });
    }

    connectedCallback(): void {
        this.$props.initialize();
        this.$localState.initialize();
        this.beforeMount?.();
        this.render(RenderTrigger.ON_MOUNT);
        this.onMount?.();
    }

    disconnectedCallback(): void {
        this.unsubscribeFromSignals();
    }

    public template?: () => Template;

    public onRender?: (renderTriggers?: RenderTriggerType[]) => void;

    protected onMount?: () => void;

    protected beforeMount?: () => void;

    public render(renderTrigger?: RenderTriggerType): void {
        this.$renderer.schedule(renderTrigger || RenderTrigger.UNKNOWN);
    }

    private unsubscribeFromSignals(): void {
        for (const signal of Component.signals) {
            signal.unsubscribe(this);
        }
    }
}
