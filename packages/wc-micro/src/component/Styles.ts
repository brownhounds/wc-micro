import { App } from '../App';
import type { Component } from './Component';

export class Styles {
    private styles: string[];
    private sheet = new CSSStyleSheet();

    constructor(private component: Component) {
        this.styles = (this.component.constructor as any).$styles;
    }

    public initialize(): void {
        const { styles, sheet } = this;

        if (this.component.shadowRoot) {
            const cssReset = App.config.cssReset
                ? `${App.config.cssReset}\n\n`
                : '';

            const combinedStyles = cssReset + styles.join('\n\n');

            if (combinedStyles.length) {
                sheet.replaceSync(combinedStyles);
                this.component.shadowRoot.adoptedStyleSheets = [sheet];
            }
        }
    }
}
