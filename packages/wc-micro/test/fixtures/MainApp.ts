import { Component } from '../../src/component/Component';
import { html, type Template } from '../../src/types';
import { component } from '../../src/decorators/component';
import { state } from '../../src/decorators/state';

import './TestComp';

@component({ tag: 'main-app' })
export class MainApp extends Component {
    @state()
    state = {
        string: 'State Value',
    };

    template = (): Template => {
        return html`
            <h1>Hello There from MainApp!! ${this.state.string}</h1>
            <test-ono />
        `;
    };
}
