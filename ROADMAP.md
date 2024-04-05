# Dynamic Roadmap

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
-   [x] Single Entry Point
-   [x] UHTML `@` 👀 - inline handlers
-   [x] Refactor PubSub
-   [x] Batch rendering for the component `render()` methods!
    -   `uhtml` dom diffing it is very cheap, 0.1 millisecond
    -   `RequestAnimationFrame`:
        -   simplest solution
        -   binds render call to user refresh rate (device)
        -   no tickers, schedule render on next available frame
        -   worst case scenario 4ms to do stuff on 360Hz screen
-   [] Styling - https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/CSSStyleSheet
    -   No css in jss, CSS or SCSS
-   [] Application specific Event Bus - inner app commutation.
-   [] Can I have collections in my reactive state

## HOT - Keep an eye on....

-   [] Proxy Nesting!! Probably Fixed 👀

## TODAY

-   [] Allow passing custom user defined `renderTriggers`
    -   [] Local State
    -   [] Signals
-   [] Split `Component` in to responsibilities:
    -   [x] Renderer
    -   [] Props
    -   [] Local State
    -   [] Signals
-   [] Prop Validation ??
-   [] Prop Diffing ??
-   [] Prop rendering array dependency ??
-   [] Can I detect dangling custom elements tags ?? missing imports

## Phase 2 - Testing

-   Testing Framework - Vitest
-   [] Concept of screen
-   [] Shadow DOM Piercing
-   [] Snapshots
    -   [] DOM HTML Snapshots
    -   [] `console.dir`

## Phase 3 - Routing

-   Build SPA router!

## Phase at some point

-   Visual Testing
    -   Hybrid between component testing and e2e
    -   Storybook interface
    -   Not storybook!!!

### Play 🎉

-   Component composition - slots

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
