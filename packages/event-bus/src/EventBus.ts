export type ListenerCallback<Payload> = (payload?: Payload) => void;

export class EventBus<EventType, Payload> {
    #listeners = new Map<EventType, Set<ListenerCallback<Payload>>>();

    public get listeners(): Map<EventType, Set<ListenerCallback<Payload>>> {
        return this.#listeners;
    }

    public addListener(
        eventType: EventType,
        listenerCallback: ListenerCallback<Payload>
    ): void {
        if (!this.#listeners.get(eventType)) {
            this.#listeners.set(eventType, new Set([listenerCallback]));
            return;
        }

        this.#listeners.get(eventType)?.add(listenerCallback);
    }

    public removeListener(
        eventType: EventType,
        listenerCallback: ListenerCallback<Payload>
    ): void {
        const listeners = this.#listeners.get(eventType);
        if (listeners && listeners.size > 1) {
            listeners?.delete(listenerCallback);
            return;
        }

        this.#listeners.delete(eventType);
    }

    public dispatch(eventType: EventType, payload?: Payload): void {
        const listeners = this.#listeners.get(eventType);
        if (listeners) {
            for (const listener of listeners) {
                listener(payload);
            }
        }
    }
}
