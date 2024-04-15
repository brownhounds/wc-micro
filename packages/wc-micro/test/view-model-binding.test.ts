import { expect, test, describe, beforeEach } from 'vitest';
import { Present } from '@brownhounds/wc-testing';
import { html } from '@brownhounds/uhtml';
import type { ViewModelBinding } from './fixtures/ViewModelBinding';

import './fixtures/ViewModelBinding';
import { HTML } from '@brownhounds/wc-testing/snapshots';

describe('View Model Binding', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    test('Initial State', async () => {
        const presenter = new Present().screen(
            html`<view-model-binding-app />`
        );
        const viewModelApp = presenter.root<ViewModelBinding>();
        await presenter.wait();

        expect(HTML(viewModelApp)).toMatchSnapshot();
    });

    test('Update Input Value', async () => {
        const presenter = new Present().screen(
            html`<view-model-binding-app />`
        );
        const viewModelApp = presenter.root<ViewModelBinding>();
        await presenter.wait();

        const input = presenter.getByTag<HTMLInputElement>('input');
        input.value = 'Brown Hounds';

        const event = new Event('input', {
            bubbles: true,
        });
        input.dispatchEvent(event);

        await presenter.wait();

        expect(viewModelApp.state.input.current).toBe('Brown Hounds');
        expect(HTML(viewModelApp)).toMatchSnapshot();
    });

    test('Update View Model', async () => {
        const presenter = new Present().screen(
            html`<view-model-binding-app />`
        );
        const viewModelApp = presenter.root<ViewModelBinding>();
        viewModelApp.state.input.current = 'Brown Hounds';

        await presenter.wait();

        expect(HTML(viewModelApp)).toMatchSnapshot();

        const input = presenter.getByTag<HTMLInputElement>('input');
        expect(input.value).toBe('Brown Hounds');
    });
});
