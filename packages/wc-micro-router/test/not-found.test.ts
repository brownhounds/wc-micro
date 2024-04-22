import { expect, test, describe, beforeAll, afterAll } from 'vitest';
import { Present } from '@brownhounds/wc-testing';
import { HTML } from '@brownhounds/wc-testing/snapshots';
import { html } from '@brownhounds/uhtml';
import { initRouter } from '../src/init';
import type { Router } from '../src/Router';
import { restoreRouterContext } from './mocks/Router';

describe('Not Found - Built In', () => {
    let router: Router;

    beforeAll(() => {
        router = initRouter([
            {
                path: '/home',
                component: {
                    tag: 'home-element',
                    import: (): Promise<unknown> => Promise.resolve(),
                },
            },
        ]);
    });

    afterAll(() => {
        restoreRouterContext();
    });

    test('Not Found on `/` route', async () => {
        window.location.pathname = '/';
        const presenter = new Present().screen(html`<router-element />`);

        await presenter.wait(100);

        expect(HTML(presenter.root())).toMatchSnapshot();

        expect(router.activeRoute).toMatchObject({
            route: '',
            pathname: '',
            params: {},
        });
    });
});

describe('Not Found - UserDefined', () => {
    let router: Router;

    beforeAll(() => {
        router = initRouter(
            [
                {
                    path: '/home',
                    component: {
                        tag: 'home-element',
                        import: (): Promise<unknown> => Promise.resolve(),
                    },
                },
            ],
            {
                notFound: {
                    tag: 'not-found',
                    import: () => import('./fixtures/NotFound'),
                },
            }
        );
    });

    afterAll(() => {
        restoreRouterContext();
    });

    test('Not Found on `/` route', async () => {
        window.location.pathname = '/';
        const presenter = new Present().screen(html`<router-element />`);

        await presenter.wait(100);

        expect(HTML(presenter.root())).toMatchSnapshot();

        expect(router.activeRoute).toMatchObject({
            route: '',
            pathname: '',
            params: {},
        });
    });
});
