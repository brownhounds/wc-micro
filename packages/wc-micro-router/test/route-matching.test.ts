import { expect, test, describe, beforeAll, afterAll } from 'vitest';
import { Present } from '@brownhounds/wc-testing';
import { HTML } from '@brownhounds/wc-testing/snapshots';
import { html } from '@brownhounds/uhtml';
import { initRouter } from '../src/init';
import type { Router } from '../src/Router';
import { restoreRouterContext } from './mocks/Router';

describe('Route Matching', () => {
    let router: Router;

    beforeAll(() => {
        router = initRouter([
            {
                path: '/home',
                component: {
                    tag: 'page-one',
                    import: (): Promise<unknown> => import('./fixtures/Page1'),
                },
            },
            {
                path: '/:pageId',
                component: {
                    tag: 'page-two',
                    import: (): Promise<unknown> => import('./fixtures/Page2'),
                },
            },
        ]);
    });

    afterAll(() => {
        restoreRouterContext();
    });

    test('Match Route Without Params', async () => {
        window.location.pathname = '/home';
        const presenter = new Present().screen(html`<router-element />`);

        await presenter.wait(100);

        expect(HTML(presenter.root())).toMatchSnapshot();

        expect(router.activeRoute).toMatchObject({
            route: '/home',
            pathname: '/home',
            params: {},
        });
    });

    test('Match Route With Params', async () => {
        window.location.pathname = '/some-sort-of-page-id';
        const presenter = new Present().screen(html`<router-element />`);

        await presenter.wait(100);

        expect(HTML(presenter.root())).toMatchSnapshot();

        expect(router.activeRoute).toMatchObject({
            route: '/:pageId',
            pathname: '/some-sort-of-page-id',
            params: {
                pageId: 'some-sort-of-page-id',
            },
        });
    });

    test('Navigate', async () => {
        window.location.pathname = '/home';

        const presenter = new Present().screen(html`<router-element />`);

        await presenter.wait(100);

        expect(HTML(presenter.root())).toMatchSnapshot();

        expect(router.activeRoute).toMatchObject({
            route: '/home',
            pathname: '/home',
            params: {},
        });

        router.navigate('/some-sort-of-page-id');
        await presenter.wait(100);

        expect(HTML(presenter.root())).toMatchSnapshot();

        expect(router.activeRoute).toMatchObject({
            route: '/:pageId',
            pathname: '/some-sort-of-page-id',
            params: {
                pageId: 'some-sort-of-page-id',
            },
        });

        history.back();

        await presenter.wait(100);

        expect(HTML(presenter.root())).toMatchSnapshot();

        expect(router.activeRoute).toMatchObject({
            route: '/home',
            pathname: '/home',
            params: {},
        });
    });

    test('Navigate with replace', async () => {
        window.location.pathname = '/home';

        const presenter = new Present().screen(html`<router-element />`);

        await presenter.wait(100);

        expect(HTML(presenter.root())).toMatchSnapshot();

        expect(router.activeRoute).toMatchObject({
            route: '/home',
            pathname: '/home',
            params: {},
        });

        router.navigate('/some-sort-of-page-id', { replace: true });

        await presenter.wait(100);

        expect(HTML(presenter.root())).toMatchSnapshot();

        expect(router.activeRoute).toMatchObject({
            route: '/:pageId',
            pathname: '/some-sort-of-page-id',
            params: {
                pageId: 'some-sort-of-page-id',
            },
        });
    });

    test('Router `matchRoute`', () => {
        window.location.pathname = '/home';
        expect(router.matchRoute('/home')).toBe(true);
        expect(router.matchRoute('/something-else')).toBe(false);

        window.location.pathname = '/123456';
        expect(router.matchRoute('/home')).toBe(false);
        expect(router.matchRoute('/:pageId')).toBe(true);
    });
});
