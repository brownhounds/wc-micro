import { Component, html, type Template } from '@brownhounds/wc-micro';
import { component } from '@brownhounds/wc-micro/decorators';

@component({ tag: 'not-found' })
export class NotFound extends Component {
    template = (): Template => {
        return html`<h1>User Defined 404</h1>`;
    };
}
