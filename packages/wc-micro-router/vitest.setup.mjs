import { vi } from 'vitest';
import { MockCSSStyleSheet } from '@brownhounds/wc-testing/mocks';

vi.stubGlobal('CSSStyleSheet', MockCSSStyleSheet);

vi.stubGlobal('location', { pathname: '/' }); // TODO: Move this in to the testing library

// Mock The history API
