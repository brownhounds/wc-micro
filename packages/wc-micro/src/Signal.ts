import { RenderTarget } from './types';
import { Reactive } from './Reactive';

export const signal = <State>(state: State): Reactive<State> =>
    new Reactive(state, RenderTarget.SIGNAL);
