import { Component, html, type Template } from '@brownhounds/wc-micro';
import { component } from '@brownhounds/wc-micro/decorators';

@component({ tag: 'page-one' })
export class PageOne extends Component {
    template = (): Template => {
        return html`<h1>Page 1</h1>
            <p>${window.location.pathname}</p>`;
    };
}
