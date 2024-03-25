import { Reactive } from './Reactive';

export const makeSignal = <ReactiveState>(
    state: ReactiveState
): Reactive<ReactiveState> => new Reactive(state);

export const useSignal = <ReactiveState>(
    signal: Reactive<ReactiveState>
): ReactiveState => signal.value();
