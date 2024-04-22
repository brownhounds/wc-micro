import { Component, html, type Template } from '@brownhounds/wc-micro';
import { component } from '@brownhounds/wc-micro/decorators';

@component({ tag: 'page-two-outlet' })
export class PageTwoOutlet extends Component {
    template = (): Template => {
        return html`<h1>Page 2 - With Outlet</h1>
            <p>${window.location.pathname}</p>
            <outlet-element id="page-two-nested-route" />`;
    };
}
