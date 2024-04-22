import { expect, test, describe, beforeAll } from 'vitest';
import { Present } from '@brownhounds/wc-testing';
import { HTML } from '@brownhounds/wc-testing/snapshots';
import { html } from '@brownhounds/uhtml';
import { initRouter } from '../src/init';
import type { Router } from '../src/Router';

describe('RouterContext Config', () => {
    let router: Router;

    beforeAll(() => {
        router = initRouter(
            [
                {
                    path: '/home',
                    component: {
                        tag: 'page-one-outlet-with-user-tag',
                        import: (): Promise<unknown> =>
                            import('./fixtures/Page1withOutletUserTag'),
                    },
                    children: [
                        {
                            outletId: 'page-one-nested-route',
                            path: '/:pageId',
                            component: {
                                tag: 'page-two',
                                import: (): Promise<unknown> =>
                                    import('./fixtures/Page2'),
                            },
                        },
                    ],
                },
            ],
            {
                outletTag: 'app-outlet',
                routerTag: 'app-router',
                routePrefix: '/prefix',
            }
        );
    });

    test('Match route `/prefix/home`', async () => {
        window.location.pathname = '/prefix/home';
        const presenter = new Present().screen(html`<app-router />`);

        await presenter.wait(100);

        expect(HTML(presenter.root())).toMatchSnapshot();

        expect(router.activeRoute).toMatchObject({
            route: '/prefix/home',
            pathname: '/prefix/home',
            params: {},
        });
    });

    test('Match route `/prefix/home/:pageId`', async () => {
        window.location.pathname = '/prefix/home/123456';
        const presenter = new Present().screen(html`<app-router />`);

        await presenter.wait(100);

        expect(HTML(presenter.root())).toMatchSnapshot();

        expect(router.activeRoute).toMatchObject({
            route: '/prefix/home/:pageId',
            pathname: '/prefix/home/123456',
            params: {},
        });
    });
});
