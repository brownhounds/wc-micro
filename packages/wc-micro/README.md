## Phase 1 - MVP

-   [x] Template Rendering - uhtml - https://github.com/WebReflection/uhtml
    -   [] Granular control of rendering cycle
        -   [x] render()
        -   [] Component lifecycle methods (onRender, onMount etc)
-   [x] Internal Reactive State - Proxy, Pub Sub
-   [x] External State - As seen in Preact Signals
-   [x] Main Class Decorator 🎨 - ability to subscribe to global signals
-   [x] Local Sate Decorator 🎨
-   [x] Implementation for Reactive Props
-   [x] Ref handling
-   [x] View Model Binding ❤️ - I need it in my Live!! Like now! Vue: https://vuejs.org/guide/components/v-model.html
-   [x] App Config
-   [] Styling - https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/CSSStyleSheet
    -   No css in jss, CSS or SCSS
-   [] Application specific Event Bus - inner app commutation.
-   [] Can I have collections in my reactive state

## HOT - Keep an eye on....

-   [] Proxy Nesting!! 👀

## TODAY

-   [] Batch rendering for the component `render()` methods!

## Phase 2 - Testing

-   Testing Framework - Vitest

### Research notes

Styling:

```js
compose styles only once: this.shadowRoot.adoptedStyleSheets.length == 0
```

```js
if (styles) {
    this.sheet.replaceSync(styles);
    if (this.shadowRoot) this.shadowRoot.adoptedStyleSheets = [this.sheet];
}
```

### Snippets - Shit I can never remember

```js
export const Variable = {
    STUFF: 'something'
} as const;

export type VariableType = (typeof Variable)[keyof typeof Variable];
```
