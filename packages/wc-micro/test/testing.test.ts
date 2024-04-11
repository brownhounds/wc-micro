import { expect, test, describe } from 'vitest';
import { Present } from '@brownhounds/wc-testing';
import { HTML } from '@brownhounds/wc-testing/snapshots';
import { html } from '@brownhounds/uhtml';

import './fixtures/MainApp';
import type { MainApp } from './fixtures/MainApp';

describe('test', () => {
    test('true', async () => {
        const presenter = await new Present().screen(html`<main-app />`);
        console.log(presenter.root<MainApp>().tagName);
        const t = HTML(presenter.root());
        expect(t).toMatchSnapshot();
    });
});
