import { RouterContext } from './Context';
import { castParamsToObject, formatRoute, matchRoute } from './helpers';
import type { RouteObject } from './types';
import { RouterEvents, type NavigateConfig, type HydratedRoute } from './types';

const EMPTY_ROUTE = { route: '', pathname: '', params: {} };

export class Router {
    #currentRoute: HydratedRoute = EMPTY_ROUTE;

    public get activeRoute(): HydratedRoute {
        return this.#currentRoute;
    }

    #matchRoute(pathname: string): RouteObject | undefined {
        for (const route of RouterContext.routes) {
            if (matchRoute(route.path, pathname)) {
                return route;
            }
        }

        return undefined;
    }

    #hydrateActiveRoute(route: RouteObject, pathname: string): HydratedRoute {
        return {
            route: route.path,
            pathname,
            params: castParamsToObject(route.path, pathname),
        };
    }

    #setActiveRoute(pathname: string): RouteObject | undefined {
        const matchedRoute = this.#matchRoute(pathname);
        if (matchedRoute) {
            this.#currentRoute = this.#hydrateActiveRoute(
                matchedRoute,
                pathname
            );
        } else {
            this.#currentRoute = EMPTY_ROUTE;
        }

        return matchedRoute;
    }

    #dispatchNavigationEvent(matchedRoute?: RouteObject): void {
        RouterContext.eventBus.dispatch(RouterEvents.NAVIGATE, matchedRoute);
    }

    public navigate(pathname: string, config?: NavigateConfig): void {
        const formattedPathname = formatRoute(
            RouterContext.config.routePrefix + formatRoute(pathname)
        );
        const matchedRoute = this.#setActiveRoute(formattedPathname);
        config?.replace
            ? window.history.replaceState({}, '', formattedPathname)
            : window.history.pushState({}, '', formattedPathname);
        this.#dispatchNavigationEvent(matchedRoute);
    }

    // TODO: What do I do with this, I don't like it!!
    public navigateLocation(pathname: string): void {
        const formattedPathname = formatRoute(pathname);
        const matchedRoute = this.#setActiveRoute(formattedPathname);
        window.history.pushState({}, '', formattedPathname);
        this.#dispatchNavigationEvent(matchedRoute);
    }

    public popState(pathname: string): void {
        const formattedPathname = formatRoute(
            RouterContext.config.routePrefix + formatRoute(pathname)
        );
        const matchedRoute = this.#setActiveRoute(formattedPathname);
        this.#dispatchNavigationEvent(matchedRoute);
    }

    public matchRoute(pattern: string): boolean {
        const patternWithPrefix = RouterContext.config.routePrefix + pattern;
        const route = RouterContext.routes.find(
            (route) => route.path === patternWithPrefix
        );

        if (matchRoute(patternWithPrefix, window.location.pathname) && route)
            return true;

        return false;
    }
}
