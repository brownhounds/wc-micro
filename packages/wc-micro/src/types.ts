import { type Hole, html as uhtml, svg as usvg } from '@brownhounds/uhtml';

export type Template = Hole;
export const html = uhtml;
export const svg = usvg;

export const RenderTarget = {
    UNKNOWN: 'UNKNOWN',
    PROPS: 'PROPS',
    SIGNAL: 'SIGNAL',
    LOCAL_STATE: 'LOCAL_STATE',
    CONNECTED_CALLBACK: 'CONNECTED_CALLBACK',
} as const;

export type RenderTargetType = (typeof RenderTarget)[keyof typeof RenderTarget];
