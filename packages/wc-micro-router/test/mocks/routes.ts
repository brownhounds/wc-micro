import type { RouteObject } from '../../src/types';

export const duplicatedRoutes: RouteObject[][][] = [
    [
        [
            {
                path: '/home',
                component: {
                    tag: 'something-else',
                    import: (): Promise<unknown> => Promise.resolve(),
                },
            },
            {
                path: '/home',
                component: {
                    tag: 'something-else-2',
                    import: (): Promise<unknown> => Promise.resolve(),
                },
            },
        ],
    ],
    [
        [
            {
                path: '/',
                component: {
                    tag: 'something-else',
                    import: (): Promise<unknown> => Promise.resolve(),
                },
            },
            {
                path: '/',
                component: {
                    tag: 'something-else-2',
                    import: (): Promise<unknown> => Promise.resolve(),
                },
            },
        ],
    ],
    [
        [
            {
                path: '/page/:pageId',
                component: {
                    tag: 'something-else',
                    import: (): Promise<unknown> => Promise.resolve(),
                },
            },
            {
                path: '/page/:pageId',
                component: {
                    tag: 'something-else-2',
                    import: (): Promise<unknown> => Promise.resolve(),
                },
            },
        ],
    ],
    [
        [
            {
                path: '/',
                component: {
                    tag: 'something-else',
                    import: (): Promise<unknown> => Promise.resolve(),
                },
                children: [
                    {
                        outletId: 'outlet-id',
                        path: '/page/:pageId',
                        component: {
                            tag: 'something-else-2',
                            import: (): Promise<unknown> => Promise.resolve(),
                        },
                    },
                    {
                        outletId: 'outlet-id-2',
                        path: '/page/:pageId',
                        component: {
                            tag: 'something-else-2',
                            import: (): Promise<unknown> => Promise.resolve(),
                        },
                    },
                ],
            },
        ],
    ],
    [
        [
            {
                path: '/some-route-here',
                component: {
                    tag: 'something-else',
                    import: (): Promise<unknown> => Promise.resolve(),
                },
                children: [
                    {
                        outletId: 'outlet-id',
                        path: '/page/:pageId',
                        component: {
                            tag: 'something-else-2',
                            import: (): Promise<unknown> => Promise.resolve(),
                        },
                    },
                    {
                        outletId: 'outlet-id-2',
                        path: '/page/:pageId',
                        component: {
                            tag: 'something-else-2',
                            import: (): Promise<unknown> => Promise.resolve(),
                        },
                    },
                ],
            },
        ],
    ],
];

export const duplicatedRouteParams: RouteObject[][][] = [
    [
        [
            {
                path: '/home/:pageId/something/:pageId',
                component: {
                    tag: 'something-else',
                    import: (): Promise<unknown> => Promise.resolve(),
                },
            },
        ],
    ],
    [
        [
            {
                path: '/',
                component: {
                    tag: 'something-else',
                    import: (): Promise<unknown> => Promise.resolve(),
                },
                children: [
                    {
                        outletId: 'aaron',
                        path: '/home/:categoryId/something/:categoryId/page/:pageId',
                        component: {
                            tag: 'something-else',
                            import: (): Promise<unknown> => Promise.resolve(),
                        },
                    },
                ],
            },
        ],
    ],
];

export const childrenRoutesWithoutOutletId: RouteObject[][][] = [
    [
        [
            {
                path: '/',
                component: {
                    tag: 'something-else',
                    import: (): Promise<unknown> => Promise.resolve(),
                },
                children: [
                    {
                        path: '/home/category/:categoryId/page/:pageId',
                        component: {
                            tag: 'something-else',
                            import: (): Promise<unknown> => Promise.resolve(),
                        },
                    },
                ],
            },
        ],
    ],
    [
        [
            {
                path: '/',
                component: {
                    tag: 'something-else',
                    import: (): Promise<unknown> => Promise.resolve(),
                },
                children: [
                    {
                        outletId: 'aaron',
                        path: '/home/category/:categoryId/page/:pageId',
                        component: {
                            tag: 'something-else',
                            import: (): Promise<unknown> => Promise.resolve(),
                        },
                        children: [
                            {
                                path: '/another-level-of-nesting',
                                component: {
                                    tag: 'something-else',
                                    import: (): Promise<unknown> =>
                                        Promise.resolve(),
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    ],
];
