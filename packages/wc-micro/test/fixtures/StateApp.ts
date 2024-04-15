import { Component } from '../../src/component/Component';
import { html, type Template } from '../../src/types';
import { component } from '../../src/decorators/component';
import { state } from '../../src/decorators/state';

@component({ tag: 'state-app' })
export class StateApp extends Component {
    @state()
    state = {
        string: 'Initial Value',
        number: 0,
        // eslint-disable-next-line no-null/no-null
        null: null,
        undefined: undefined,
        list: ['apple', 'orange'],
        any: undefined as any,
        object: {
            nested: {
                value: 'Initial Value',
            },
        },
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onRender = (_renderTrigger?: string[]): void => {};

    onDispose = (): void => {};

    template = (): Template => {
        return html`
            <h1>StateApp</h1>
            <p>${this.state.string}</p>
            <p>${this.state.number}</p>
            <p>${String(this.state.null)}</p>
            <p>${String(this.state.undefined)}</p>
            <p>${this.state.object.nested.value}</p>
            <ul>
                ${this.state.list.map((value) => html`<li>${value}</li>`)}
            </ul>
        `;
    };
}
