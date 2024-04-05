import { RenderTarget } from './types';
import { Reactive } from './Reactive';

export const signal = <State>(
    state: State,
    renderTarget?: string
): Reactive<State> => new Reactive(state, renderTarget || RenderTarget.SIGNAL);
