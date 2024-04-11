import { render } from '@brownhounds/uhtml';
import type { Template } from './types';
import { query } from './shadowRoot';

export class Present {
    private rootElement!: Element;

    public screen(template: Template, timeout = 10): Promise<this> {
        render(document.body, template);

        this.rootElement = document.body.firstElementChild as Element;

        if (!this.rootElement) {
            throw new Error(
                `Can not find first element within a Presenter Screen`
            );
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this);
            }, timeout);
        });
    }

    public root<Component extends HTMLElement>(): Component {
        return this.rootElement as Component;
    }

    public render(timeout = 0): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, timeout);
        });
    }

    public getByTag<Component extends HTMLElement>(tag: string): Component {
        return query(this.get(), tag) as Component;
    }

    private get<Component extends HTMLElement>(): Component {
        return this.rootElement as Component;
    }
}
