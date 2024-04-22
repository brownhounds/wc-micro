import { RouterContext } from '../Context';
import { matchRoute } from '../helpers';
import type { RouteObject } from '../types';
import { RouterEvents } from '../types';

export class OutletElement extends HTMLElement {
    #matchedRoute?: RouteObject;

    connectedCallback(): void {
        this.#ensureId();
        this.#matchedRoute = this.#matchRoute();
        this.#ensureRoute(this.#matchedRoute);
        RouterContext.eventBus.addListener(
            RouterEvents.NAVIGATE,
            this.#onNavigate
        );
        if (this.#matchedRoute)
            void this.#mountRouteElement(this.#matchedRoute);
    }

    disconnectedCallback(): void {
        RouterContext.eventBus.removeListener(
            RouterEvents.NAVIGATE,
            this.#onNavigate
        );
    }

    #onNavigate = (): void => {
        if (this.#matchedRoute)
            void this.#mountRouteElement(this.#matchedRoute);
    };

    #ensureId(): void {
        if (!this.id.length) {
            RouterContext.handleError(
                new Error(
                    `<${RouterContext.config.outletTag} /> element requires an id`
                )
            );
        }
    }

    #matchRoute(): RouteObject | undefined {
        return RouterContext.routes.find((route) => route.outletId === this.id);
    }

    #ensureRoute(route?: RouteObject): void | never {
        if (!route) {
            RouterContext.handleError(
                new Error(`Route with outletId: ${this.id} was not found`)
            );
        }
    }

    async #mountRouteElement(route: RouteObject): Promise<void> {
        const pathname = window.location.pathname
            .split('/')
            .splice(0, route.path.split('/').length)
            .join('/');

        if (matchRoute(route.path, pathname)) {
            if (this.firstElementChild?.localName !== route.component.tag) {
                await route.component.import();
                this.innerHTML = `<${route.component.tag}></${route.component.tag}>`;
            }
        } else {
            this.innerHTML = '';
        }
    }
}

if (customElements.get(RouterContext.config.outletTag) === undefined) {
    customElements.define(RouterContext.config.outletTag, OutletElement);
}
