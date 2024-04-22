import { Component, html, type Template } from '@brownhounds/wc-micro';
import { component } from '@brownhounds/wc-micro/decorators';

@component({ tag: 'page-two' })
export class PageTwo extends Component {
    template = (): Template => {
        return html`<h1>Page 2</h1>
            <p>${window.location.pathname}</p>`;
    };
}
