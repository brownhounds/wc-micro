import { EventBus } from '@brownhounds/event-bus';

import type {
    NavigateConfig,
    RouteObject,
    RouterConfig,
    RouterContextConfig,
    RouterEventsType,
} from './types';

export class RouterContext {
    public static config: RouterContextConfig = {
        routerTag: 'router-element',
        outletTag: 'outlet-element',
        routePrefix: '',
    };
    public static definedRoutes: RouteObject[];
    public static routes: RouteObject[] = [];
    public static eventBus = new EventBus<RouterEventsType, RouteObject>();
    public static navigate: (
        pathname: string,
        config?: NavigateConfig,
        popState?: boolean
    ) => void;
    public static navigateLocation: (pathname: string) => void;
    public static popState: (pathname: string) => void;

    public static mergeConfigs(config: RouterConfig): void {
        RouterContext.config = {
            ...RouterContext.config,
            ...config,
        };
    }

    public static handleError(error: Error): never {
        throw error;
    }
}
