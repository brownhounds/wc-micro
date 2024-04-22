import { RouterContext } from './Context';
import type { RouteObject } from './types';

export const formatRoute = (route: string): string => {
    return (
        '/' +
        route
            .split('/')
            .filter((part) => part !== '')
            .join('/')
    );
};

const findDuplicatedValuesInArray = (array: string[]): string[] =>
    array.filter((e, i, a) => a.indexOf(e) !== i);

const findDuplicatedRoutes = (array: RouteObject[]): Set<string> => {
    const seen = new Set<string>();
    const duplicates = new Set<string>();

    for (const route of array) {
        if (seen.has(route.path)) duplicates.add(route.path);
        seen.add(route.path);
    }

    return duplicates;
};

const validateChildrenOutletIds = (routes: RouteObject[]): void => {
    const invalidRoute = routes.find((route) => !route.outletId);
    if (invalidRoute) {
        RouterContext.handleError(
            new Error(`Child Route: ${invalidRoute.path} has missing outletId`)
        );
    }
};

const validateUniqueRoutes = (): void => {
    const duplicates = findDuplicatedRoutes(RouterContext.routes);
    if (duplicates.size) {
        RouterContext.handleError(
            new Error(
                `Found duplicated routes: ${Array.from(duplicates).join(', ')}`
            )
        );
    }
};

const matchParamNames = (pattern: string): string[] =>
    pattern.match(/:[^/]+/g) || [];

const validateUniqueRouteParams = (): void => {
    for (const route of RouterContext.routes) {
        const duplicates = findDuplicatedValuesInArray(
            matchParamNames(route.path)
        );
        if (duplicates.length) {
            RouterContext.handleError(
                new Error(
                    `Route: ${route.path} has duplicated dynamic parameters ${duplicates.join(', ')}`
                )
            );
        }
    }
};

const matchParams = (
    pattern: string,
    pathname: string
): { paramNames: string[]; match: RegExpMatchArray } => {
    const regex = new RegExp(pattern.replace(/:[^/]+/g, '([^/]+)'));
    const match = pathname.match(regex);

    return {
        paramNames: matchParamNames(pattern),
        match: match as RegExpMatchArray,
    };
};

export const matchRoute = (pattern: string, pathname: string): boolean => {
    const regexPattern = pattern
        .replace(/:[a-zA-Z_]+/g, '([\\w-]+)')
        .replace(/\//g, '\\/');
    const regex = new RegExp(`^${regexPattern}$`);
    const match = pathname.match(regex);
    return match ? true : false;
};

export const castParamsToObject = (
    pattern: string,
    pathname: string
): Record<string, string> => {
    const { paramNames, match } = matchParams(pattern, pathname);
    const params: Record<string, string> = {};

    for (let i = 0; i < paramNames.length; i++) {
        const paramName = paramNames[i].slice(1);
        params[paramName] = match[i + 1];
    }

    return params;
};

const compileChildRoutes = (
    routes: RouteObject[],
    topLevelRoute: RouteObject,
    parentRoutePath: string = ''
): void => {
    for (const route of routes) {
        RouterContext.routes.push({
            ...route,
            path: formatRoute(
                RouterContext.config.routePrefix +
                    topLevelRoute.path +
                    parentRoutePath +
                    route.path
            ),
            topLevelRoute,
        });

        if (route.children) {
            validateChildrenOutletIds(route.children);
            compileChildRoutes(route.children, topLevelRoute, route.path);
        }
    }
};

export const compileRoutes = (): void => {
    for (const route of RouterContext.definedRoutes) {
        RouterContext.routes.push({
            ...route,
            path: formatRoute(RouterContext.config.routePrefix + route.path),
        });
        if (route.children?.length) {
            validateChildrenOutletIds(route.children);
            compileChildRoutes(route.children, route);
        }
    }

    validateUniqueRoutes();
    validateUniqueRouteParams();
};
