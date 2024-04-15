import { vi } from 'vitest';
import { MockCSSStyleSheet } from '@brownhounds/wc-testing/mocks';

vi.stubGlobal('CSSStyleSheet', MockCSSStyleSheet);
