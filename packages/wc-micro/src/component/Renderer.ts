import { render } from '@brownhounds/uhtml';
import type { Component } from './Component';
import type { RenderTriggerType } from '../types';

export class Renderer {
    private locked = false;
    private scheduledRenderTriggers = new Set<RenderTriggerType>();

    constructor(private component: Component) {}

    public schedule(
        renderTrigger?: RenderTriggerType,
        isConnectedCallback = false
    ): void {
        if (this.component.template) {
            if (renderTrigger) this.scheduledRenderTriggers.add(renderTrigger);
            if (!this.locked) {
                this.locked = true;
                setTimeout(() => {
                    this.render(Array.from(this.scheduledRenderTriggers));
                    this.scheduledRenderTriggers.clear();
                    this.locked = false;
                    if (isConnectedCallback) this.component.onMount?.();
                }, 0);
            }
        }
    }

    private render(renderTriggers: RenderTriggerType[]): void {
        if (this.component.template) {
            render(this.component.root, this.component.template!());
            this.component.onRender?.(renderTriggers);
        }
    }
}
