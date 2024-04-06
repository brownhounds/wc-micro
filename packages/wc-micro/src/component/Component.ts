import { RenderTrigger, type RenderTriggerType, type Template } from '../types';
import { Renderer } from './Renderer';
import { LocalState } from './LocalState';
import { Props } from './Props';
import { Styles } from './Styles';

export class Component<ComponentProps = unknown> extends HTMLElement {
    private $props = new Props<ComponentProps>(this);
    private $renderer = new Renderer(this);
    private $localState = new LocalState(this);
    private $styles = new Styles(this);

    public get root(): HTMLElement | ShadowRoot | null {
        return this.shadowRoot;
    }

    protected get props(): ComponentProps {
        return this.$props.data;
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(): void {
        this.$styles.initialize();
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
        for (const signal of (this.constructor as any).$signals) {
            signal.unsubscribe(this);
        }
    }
}
