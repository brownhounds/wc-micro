import { Component } from '../../src/component/Component';
import { component } from '../../src/decorators/component';

@component({ tag: 'life-cycle-no-template' })
export class LifeCycleNoTemplate extends Component {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onRender = (_renderTrigger?: string[]): void => {};
    onMount = (): void => {};
}
