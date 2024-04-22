import { builtInNotFound } from '../constants';
import { RouterContext } from './../Context';
import type { RouteObject } from './../types';
import { RouterEvents } from './../types';

export class RouterElement extends HTMLElement {
    #onNavigate = async (payload?: RouteObject): Promise<void> => {
        if (payload) {
            const route = payload.topLevelRoute || payload;

            await route.component.import();

            if (this.firstElementChild?.localName !== route.component.tag)
                this.innerHTML = `<${route.component.tag}></${route.component.tag}>`;
            return;
        }

        void this.#onNotFound();
    };

    async #onNotFound(): Promise<void> {
        const element = RouterContext.config.notFound || builtInNotFound;
        if (this.firstElementChild?.localName !== element.tag) {
            await element.import();
            this.innerHTML = `<${element.tag}></${element.tag}>`;
        }
    }

    #onPopState = (e: PopStateEvent): void => {
        const target = e.target as Window;
        RouterContext.popState(target.location.pathname);
    };

    connectedCallback(): void {
        RouterContext.eventBus.addListener(
            RouterEvents.NAVIGATE,
            this.#onNavigate
        );
        RouterContext.navigateLocation(window.location.pathname);
        window.addEventListener('popstate', this.#onPopState);
    }

    disconnectedCallback(): void {
        RouterContext.eventBus.listeners.clear();
        window.removeEventListener('popstate', this.#onPopState);
    }
}

if (customElements.get(RouterContext.config.routerTag) === undefined) {
    customElements.define(RouterContext.config.routerTag, RouterElement);
}
