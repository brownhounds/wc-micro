import { expect, test, describe, beforeEach } from 'vitest';
import { Present } from '@brownhounds/wc-testing';
import { html } from '@brownhounds/uhtml';
import type { RefApp } from './fixtures/Ref';

import './fixtures/Ref';

describe('Ref', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    test('ref', async () => {
        const presenter = new Present().screen(html`<ref-app />`);
        const refApp = presenter.root<RefApp>();

        await presenter.wait();

        expect(refApp.ref.current instanceof HTMLDivElement).toBe(true);
    });
});
