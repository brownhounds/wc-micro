export type ComponentDefinition = {
    tag: string;
    import: () => Promise<unknown>;
};

export type RouterConfig = {
    routerTag?: string;
    outletTag?: string;
    routePrefix?: string;
    notFound?: ComponentDefinition;
};

export type RouteObject = {
    path: string;
    outletId?: string;
    children?: RouteObject[];
    topLevelRoute?: RouteObject; // TODO: This should not be exposed to a user!!
    component: ComponentDefinition;
};

export type HydratedRoute = {
    route: string;
    pathname: string;
    params: Record<string, string>;
};

export const RouterEvents = {
    NAVIGATE: 'router-navigate',
} as const;

export type RouterEventsType = (typeof RouterEvents)[keyof typeof RouterEvents];

export type NavigateConfig = { replace: boolean };

export type RouterContextConfig = {
    routerTag: string;
    outletTag: string;
    routePrefix: string;
    notFound?: ComponentDefinition;
};
