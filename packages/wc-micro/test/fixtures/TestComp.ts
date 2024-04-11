import { Component } from '../../src/component/Component';
import { html, type Template } from '../../src/types';
import { component } from '../../src/decorators/component';
import { state } from '../../src/decorators/state';

@component({ tag: 'test-ono' })
export class TestComp extends Component {
    @state()
    state = {
        string: 'State Value',
    };

    template = (): Template => {
        return html`<div>
            <div>kjfhksfdh</div>
            <h1>Nested Component!! ${this.state.string}</h1>
        </div>`;
    };
}
