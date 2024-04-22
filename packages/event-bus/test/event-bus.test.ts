import { expect, test, describe, vi } from 'vitest';
import { EventBus } from '../src/EventBus';

export const Events = {
    TEST1: 'test1',
    TEST2: 'test2',
} as const;

export type EventsType = (typeof Events)[keyof typeof Events];

type Payload = { value: string };

const bus = new EventBus<EventsType, Payload>();
const listener1 = vi.fn();
const listener2 = vi.fn();

describe('Event Bus', () => {
    test('Add Listeners', () => {
        bus.addListener(Events.TEST1, listener1);
        bus.addListener(Events.TEST1, listener2);
        bus.addListener(Events.TEST2, listener1);
        bus.addListener(Events.TEST2, listener2);

        expect(bus.listeners.get(Events.TEST1)?.size).toBe(2);
        expect(bus.listeners.get(Events.TEST2)?.size).toBe(2);
    });

    test('Dispatch Events', () => {
        bus.dispatch(Events.TEST1, { value: 'aaron' });
        expect(listener1.mock.calls.length).toBe(1);
        expect(listener2.mock.calls.length).toBe(1);
        expect(listener1.mock.calls[0]).toMatchObject([{ value: 'aaron' }]);
        expect(listener2.mock.calls[0]).toMatchObject([{ value: 'aaron' }]);
    });

    test('Remove Listeners', () => {
        bus.removeListener(Events.TEST1, listener1);
        expect(bus.listeners.get(Events.TEST1)?.size).toBe(1);
        bus.removeListener(Events.TEST1, listener2);
        expect(bus.listeners.get(Events.TEST1)).toBeUndefined();

        bus.removeListener(Events.TEST2, listener1);
        expect(bus.listeners.get(Events.TEST2)?.size).toBe(1);
        bus.removeListener(Events.TEST2, listener2);
        expect(bus.listeners.get(Events.TEST2)?.size).toBeUndefined();
    });
});
