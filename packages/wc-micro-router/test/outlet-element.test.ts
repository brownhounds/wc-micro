import { expect, test, describe } from 'vitest';
import { OutletElement } from '../src/HtmlElements/outlet-element';
import { initRouter } from '../src/init';

describe('Route Matching', () => {
    test('Outlet', async () => {
        const OUTLET_ID = 'some-sort-of-id-here';
        initRouter([
            {
                path: '/',
                outletId: OUTLET_ID,
                component: {
                    tag: 'something-else',
                    import: (): Promise<unknown> => Promise.resolve(),
                },
            },
        ]);

        const outlet = new OutletElement();
        outlet.id = OUTLET_ID;
        expect(() => outlet.connectedCallback()).not.toThrow();
    });

    test('Outlet without id', async () => {
        const outlet = new OutletElement();
        expect(() => outlet.connectedCallback()).toThrowErrorMatchingSnapshot();
    });

    test('Outlet with id without a matching route', async () => {
        const outlet = new OutletElement();
        outlet.id = 'some-id';
        expect(() => outlet.connectedCallback()).toThrowErrorMatchingSnapshot();
    });
});
