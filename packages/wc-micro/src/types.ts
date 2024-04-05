import { type Hole, html as uhtml, svg as usvg } from '@brownhounds/uhtml';

export type Template = Hole;
export const html = uhtml;
export const svg = usvg;

export const RenderTarget = {
    UNKNOWN: 'UNKNOWN',
    PROPS: 'PROPS',
    SIGNAL: 'SIGNAL',
    LOCAL_STATE: 'LOCAL_STATE',
    ON_MOUNT: 'ON_MOUNT',
} as const;

export type RenderTargetType =
    | (typeof RenderTarget)[keyof typeof RenderTarget]
    | string;
