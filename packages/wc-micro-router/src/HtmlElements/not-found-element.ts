import { NOT_FOUND_TAG } from '../constants';

export class RouterNotFound extends HTMLElement {
    connectedCallback(): void {
        this.innerHTML = '<h1>404</h1><p>Page Not Found</p>';
    }
}

if (customElements.get(NOT_FOUND_TAG) === undefined) {
    customElements.define(NOT_FOUND_TAG, RouterNotFound);
}
