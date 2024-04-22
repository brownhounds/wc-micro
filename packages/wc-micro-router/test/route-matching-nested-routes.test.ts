import { expect, test, describe, beforeAll, afterAll } from 'vitest';
import { Present } from '@brownhounds/wc-testing';
import { HTML } from '@brownhounds/wc-testing/snapshots';
import { html } from '@brownhounds/uhtml';
import { initRouter } from '../src/init';
import type { Router } from '../src/Router';
import { restoreRouterContext } from './mocks/Router';

describe('Route Matching - Nested Routes', () => {
    let router: Router;

    beforeAll(() => {
        router = initRouter([
            {
                path: '/',
                component: {
                    tag: 'page-one-outlet',
                    import: (): Promise<unknown> =>
                        import('./fixtures/Page1withOutlet'),
                },
                children: [
                    {
                        outletId: 'page-one-nested-route',
                        path: '/page/:pageId',
                        component: {
                            tag: 'page-two-outlet',
                            import: (): Promise<unknown> =>
                                import('./fixtures/Page2withOutlet'),
                        },
                        children: [
                            {
                                outletId: 'page-two-nested-route',
                                path: '/category/:categoryId',
                                component: {
                                    tag: 'page-one',
                                    import: (): Promise<unknown> =>
                                        import('./fixtures/Page1'),
                                },
                            },
                        ],
                    },
                ],
            },
        ]);
    });

    afterAll(() => {
        restoreRouterContext();
    });

    test('Match Route: `/`', async () => {
        window.location.pathname = '/';
        const presenter = new Present().screen(html`<router-element />`);

        await presenter.wait(100);

        expect(HTML(presenter.root())).toMatchSnapshot();

        expect(router.activeRoute).toMatchObject({
            route: '/',
            pathname: '/',
            params: {},
        });
    });

    test('Match Route: `/page/:pageId`', async () => {
        window.location.pathname = '/page/123456';
        const presenter = new Present().screen(html`<router-element />`);

        await presenter.wait(100);

        expect(HTML(presenter.root())).toMatchSnapshot();

        expect(router.activeRoute).toMatchObject({
            route: '/page/:pageId',
            pathname: '/page/123456',
            params: {
                pageId: '123456',
            },
        });
    });

    test('Match Route: `/page/:pageId/category/:categoryId`', async () => {
        window.location.pathname = '/page/123456/category/56987';
        const presenter = new Present().screen(html`<router-element />`);

        await presenter.wait(100);

        expect(HTML(presenter.root())).toMatchSnapshot();

        expect(router.activeRoute).toMatchObject({
            route: '/page/:pageId/category/:categoryId',
            pathname: '/page/123456/category/56987',
            params: {
                pageId: '123456',
                categoryId: '56987',
            },
        });
    });

    test('Navigate', async () => {
        window.location.pathname = '/';
        const presenter = new Present().screen(html`<router-element />`);

        await presenter.wait(100);

        expect(HTML(presenter.root())).toMatchSnapshot();

        expect(router.activeRoute).toMatchObject({
            route: '/',
            pathname: '/',
            params: {},
        });

        router.navigate('/page/123456');

        await presenter.wait(100);

        expect(HTML(presenter.root())).toMatchSnapshot();

        expect(router.activeRoute).toMatchObject({
            route: '/page/:pageId',
            pathname: '/page/123456',
            params: {
                pageId: '123456',
            },
        });

        router.navigate('/page/123456/category/56987');
        await presenter.wait(100);

        expect(HTML(presenter.root())).toMatchSnapshot();

        expect(router.activeRoute).toMatchObject({
            route: '/page/:pageId/category/:categoryId',
            pathname: '/page/123456/category/56987',
            params: {
                pageId: '123456',
                categoryId: '56987',
            },
        });

        history.back();

        await presenter.wait(100);

        expect(HTML(presenter.root())).toMatchSnapshot();

        expect(router.activeRoute).toMatchObject({
            route: '/page/:pageId',
            pathname: '/page/123456',
            params: {
                pageId: '123456',
            },
        });
    });
});
