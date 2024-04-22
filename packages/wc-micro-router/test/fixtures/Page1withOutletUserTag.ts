import { Component, html, type Template } from '@brownhounds/wc-micro';
import { component } from '@brownhounds/wc-micro/decorators';

@component({ tag: 'page-one-outlet-with-user-tag' })
export class PageOneOutlet extends Component {
    template = (): Template => {
        return html`<h1>Page 1 - With Outlet</h1>
            <p>${window.location.pathname}</p>
            <app-outlet id="page-one-nested-route" />`;
    };
}
