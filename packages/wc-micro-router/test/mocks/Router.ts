import { RouterContext } from '../../src/Context';

export const restoreRouterContext = (): void => {
    RouterContext.definedRoutes = [];
    RouterContext.routes = [];
};
