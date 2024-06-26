import { expect, test, describe, beforeEach, vi } from 'vitest';
import { Present } from '@brownhounds/wc-testing';
import { HTML } from '@brownhounds/wc-testing/snapshots';
import { html } from '@brownhounds/uhtml';
import type { StateInProps, StateInPropsChild } from './fixtures/StateInProps';
import { RenderTrigger } from '../src/types';

import './fixtures/StateInProps';

describe('State In Props', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    test('Initial State', async () => {
        const presenter = new Present().screen(html`<state-in-props />`);
        await presenter.wait();
        await presenter.wait();

        expect(HTML(presenter.root<StateInProps>())).toMatchSnapshot();
    });

    test('Change Value State In Props', async () => {
        const presenter = new Present().screen(html`<state-in-props />`);
        const parent = presenter.root<StateInProps>();

        await presenter.wait();

        const child = presenter.getByTag<StateInPropsChild>(
            'state-in-props-child'
        );

        await presenter.wait();

        const onRenderParent = vi.spyOn(parent, 'onRender');
        const onRenderChild = vi.spyOn(child, 'onRender');

        child.props.state.nestedValue = 'Changed Value From Child Level';

        await presenter.wait();
        await presenter.wait();

        expect(onRenderParent).toHaveBeenCalledOnce();
        expect(onRenderParent).toHaveBeenCalledWith([
            RenderTrigger.LOCAL_STATE,
        ]);
        expect(onRenderChild).toHaveBeenCalledOnce();
        expect(onRenderChild).toHaveBeenCalledWith([RenderTrigger.PROPS]);

        expect(HTML(presenter.root<StateInProps>())).toMatchSnapshot();
    });
});
