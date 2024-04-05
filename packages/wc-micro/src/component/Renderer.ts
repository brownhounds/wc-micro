import { render } from '@brownhounds/uhtml';
import type { Component } from './Component';
import type { RenderTargetType } from '../types';

export class Renderer {
    private locked = false;
    private scheduledRenderTriggers = new Set<RenderTargetType>();

    constructor(private component: Component) {}

    public schedule(renderTrigger: RenderTargetType): void {
        this.scheduledRenderTriggers.add(renderTrigger);
        if (!this.locked) {
            this.locked = true;
            requestAnimationFrame(() => {
                this.render(Array.from(this.scheduledRenderTriggers));
                this.scheduledRenderTriggers.clear();
                this.locked = false;
            });
        }
    }

    private render(renderTriggers: RenderTargetType[]): void {
        if (this.component.template) {
            render(this.component.root, this.component.template!());
            this.component.onRender?.(renderTriggers);
        }
    }
}
