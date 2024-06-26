import { expect, test, describe, beforeEach, vi } from 'vitest';
import { Present } from '@brownhounds/wc-testing';
import { HTML } from '@brownhounds/wc-testing/snapshots';
import { html } from '@brownhounds/uhtml';
import type { MainApp } from './fixtures/MainApp';
import { restoreSignal, store } from './fixtures/signal';
import { RenderTrigger } from '../src/types';
import type { TestComp } from './fixtures/TestComp';
import type { ListApp } from './fixtures/ListApp';

import './fixtures/ListApp';
import './fixtures/MainApp';

describe('Signal', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        restoreSignal();
    });

    test('Initial State', async () => {
        const presenter = new Present().screen(html`<main-app />`);

        await presenter.wait();
        await presenter.wait();

        expect(HTML(presenter.root<MainApp>())).toMatchSnapshot();
    });

    test('Initial State - Single Component', async () => {
        const presenter = new Present().screen(html`<list-app />`);
        await presenter.wait();
        await presenter.wait();
        expect(HTML(presenter.root<ListApp>())).toMatchSnapshot();
    });

    test('Initial State - Multiple Component', async () => {
        const presenter = new Present().screen(html`<list-app />`);
        const listApp = presenter.root<ListApp>();
        listApp.state.count = 5;

        await presenter.wait();
        await presenter.wait();

        expect(HTML(presenter.root<ListApp>())).toMatchSnapshot();
    });

    test('Modify Signal', async () => {
        const presenter = new Present().screen(html`<main-app />`);
        await presenter.wait();
        await presenter.wait();

        const testComp = presenter.getByTag<TestComp>('test-comp');
        const onRender = vi.spyOn(testComp, 'onRender');

        expect(store.value.value).toBe('Initial Signal Value');
        store.value.value = 'New Value';

        await presenter.wait();

        expect(HTML(presenter.root<MainApp>())).toMatchSnapshot();
        expect(onRender).toHaveBeenCalledOnce();
        expect(onRender).toBeCalledWith([RenderTrigger.SIGNAL]);
    });
});

describe('Signal Cleanup', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        restoreSignal();
    });

    test('Single Component', async () => {
        const presenter = new Present().screen(html`<list-app />`);
        await presenter.wait();
        await presenter.wait();
        expect(store.subscribers.size).toBe(1);

        const listApp = presenter.root<ListApp>();
        listApp.state.count = 0;

        await presenter.wait();
        await presenter.wait();

        expect(store.subscribers.size).toBe(0);
    });

    test('Multiple Component', async () => {
        const presenter = new Present().screen(html`<list-app />`);
        const listApp = presenter.root<ListApp>();
        listApp.state.count = 5;

        await presenter.wait();
        await presenter.wait();
        expect(store.subscribers.size).toBe(5);

        listApp.state.count = 0;

        await presenter.wait();
        await presenter.wait();

        expect(store.subscribers.size).toBe(0);
    });
});
