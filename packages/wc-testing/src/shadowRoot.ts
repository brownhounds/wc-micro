export const queryAll = (
    root: HTMLElement | ShadowRoot,
    selector: string
): HTMLElement[] => {
    const results: HTMLElement[] = Array.from(root.querySelectorAll(selector));

    const pushNestedResults = (root: HTMLElement | ShadowRoot): void => {
        for (const elem of queryAll(root, selector)) {
            if (!results.includes(elem)) {
                results.push(elem);
            }
        }
    };

    if (root instanceof HTMLElement && root.shadowRoot) {
        pushNestedResults(root.shadowRoot);
    }

    for (const elem of root.querySelectorAll('*')) {
        if (elem.shadowRoot) {
            pushNestedResults(elem.shadowRoot);
        }
    }

    return results;
};

export const query = (
    root: HTMLElement | ShadowRoot,
    selector: string
): HTMLElement => {
    return queryAll(root, selector)[0];
};
