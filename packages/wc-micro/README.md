## Phase 1 - MVP

-   [x] Template Rendering - uhtml - https://github.com/WebReflection/uhtml
    -   [] Granular control of rendering cycle
        -   [x] render()
        -   [] Component lifecycle methods (onRender, onMount etc)
-   [x] Internal Reactive State - Proxy, Pub Sub
-   [x] External State - As seen in Preact Signals
-   [] Props
-   [] Styling - https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/CSSStyleSheet
    -   No css in jss, CSS or SCSS
-   Bundler support - Vite, otherwise go and figure.
-   Application specific Event Bus - inner app commutation.

### Agenda For A Next Stream

-   Decorator for state 🎨 - https://blog.logrocket.com/practical-guide-typescript-decorators/
    -   [x] Main Class Decorator - ability to subscribe to global signals
    -   [x] Local state to be also a decorator 🎨
-   [] Implementation for Reactive Props

### Retrospective

-   Build a simple app
-   See if I like it
-   Pros and Cons
-   If I don't like - Kill that thing with FIRE!!🔥🔥🔥

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
