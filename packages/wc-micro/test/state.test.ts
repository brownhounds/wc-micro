import { expect, test, describe, beforeEach, vi } from 'vitest';
import { Present } from '@brownhounds/wc-testing';
import { HTML } from '@brownhounds/wc-testing/snapshots';
import { html } from '@brownhounds/uhtml';

import './fixtures/StateApp';
import type { StateApp } from './fixtures/StateApp';
import { RenderTrigger } from '../src/types';

describe('State', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    test('Initial State', async () => {
        const presenter = new Present().screen(html`<state-app />`);
        await presenter.wait();
        expect(HTML(presenter.root<StateApp>())).toMatchSnapshot();
    });

    test('Modify State', async () => {
        const presenter = new Present().screen(html`<state-app />`);
        await presenter.wait();

        const mainApp = presenter.root<StateApp>();
        const onRender = vi.spyOn(mainApp, 'onRender');

        mainApp.state.string = 'New Value';
        mainApp.state.number = 10;
        mainApp.state.object.nested.value = 'New Value';
        mainApp.state.list.push('banana');

        await presenter.wait();

        expect(HTML(presenter.root<StateApp>())).toMatchSnapshot();
        expect(onRender).toHaveBeenCalledOnce();
        expect(onRender).toBeCalledWith([RenderTrigger.LOCAL_STATE]);
    });
});
