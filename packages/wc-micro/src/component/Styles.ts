import { App } from '../App';
import type { Component } from './Component';

export class Styles {
    public styles: string[];
    public sheet?: CSSStyleSheet;

    constructor(private component: Component) {
        this.styles = (this.component.constructor as any).$styles;
    }

    public initialize(): void {
        const { styles } = this;

        if (this.component.shadowRoot) {
            if (App.config.cssReset && App.config.cssReset.length)
                styles.unshift(App.config.cssReset);

            const combinedStyles = styles.join(' ');

            if (combinedStyles.length) {
                this.sheet = new CSSStyleSheet();
                this.sheet.replaceSync(combinedStyles);
                this.component.shadowRoot.adoptedStyleSheets = [this.sheet];
            }
        }
    }
}
