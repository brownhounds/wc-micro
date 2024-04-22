import { Component, html, type Template } from '@brownhounds/wc-micro';
import { component } from '@brownhounds/wc-micro/decorators';

@component({ tag: 'page-one-outlet' })
export class PageOneOutlet extends Component {
    template = (): Template => {
        return html`<h1>Page 1 - With Outlet</h1>
            <p>${window.location.pathname}</p>
            <outlet-element id="page-one-nested-route" />`;
    };
}
