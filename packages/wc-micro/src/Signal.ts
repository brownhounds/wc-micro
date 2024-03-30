import { Reactive } from './Reactive';

export const makeSignal = <State>(state: State): Reactive<State> =>
    new Reactive(state);

export const useSignal = <State>(signal: Reactive<State>): State =>
    signal.value;
