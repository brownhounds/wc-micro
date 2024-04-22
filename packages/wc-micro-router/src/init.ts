import { RouterContext } from './Context';
import { Router } from './Router';
import { compileRoutes } from './helpers';
import type { RouteObject, RouterConfig } from './types';

export const initRouter = (
    routes: RouteObject[],
    config?: RouterConfig
): Router => {
    if (config) RouterContext.mergeConfigs(config);
    RouterContext.definedRoutes = routes;

    compileRoutes();

    const router = new Router();
    RouterContext.navigate = router.navigate.bind(router);
    RouterContext.navigateLocation = router.navigateLocation.bind(router);
    RouterContext.popState = router.popState.bind(router);
    import('./HtmlElements/elements');

    return router;
};
