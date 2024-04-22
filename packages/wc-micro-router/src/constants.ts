import type { ComponentDefinition } from './types';

export const NOT_FOUND_TAG = 'router-not-found';

export const builtInNotFound: ComponentDefinition = {
    tag: NOT_FOUND_TAG,
    import: () => import('./HtmlElements/not-found-element'),
};
