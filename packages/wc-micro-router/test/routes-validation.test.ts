import { expect, test, describe, afterAll, beforeEach } from 'vitest';
import { initRouter } from '../src/init';
import {
    childrenRoutesWithoutOutletId,
    duplicatedRouteParams,
    duplicatedRoutes,
} from './mocks/routes';
import { restoreRouterContext } from './mocks/Router';

describe('InitRouter - Single Duplicated Route', () => {
    beforeEach(() => {
        restoreRouterContext();
    });

    afterAll(() => {
        restoreRouterContext();
    });

    test.each(duplicatedRoutes)('Duplicated Routes', (routes) => {
        expect(() => initRouter(routes)).toThrowErrorMatchingSnapshot();
    });
});

describe('InitRouter - Multiple Duplicated Route', () => {
    afterAll(() => {
        restoreRouterContext();
    });

    test.each(duplicatedRoutes)('Duplicated Routes', (routes) => {
        expect(() => initRouter(routes)).toThrowErrorMatchingSnapshot();
    });
});

describe('InitRouter - Duplicated Route Params', () => {
    beforeEach(() => {
        restoreRouterContext();
    });

    test.each(duplicatedRouteParams)('Duplicated Route Params', (routes) => {
        expect(() => initRouter(routes)).toThrowErrorMatchingSnapshot();
    });
});

describe('InitRouter - Missing Outlet IDs On Children Route', () => {
    beforeEach(() => {
        restoreRouterContext();
    });

    test.each(childrenRoutesWithoutOutletId)('Missing Outlet ID', (routes) => {
        expect(() => initRouter(routes)).toThrowErrorMatchingSnapshot();
    });
});
