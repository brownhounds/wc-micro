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
    -   `setTimeout` - FTW!!
-   [x] Allow passing custom user defined `renderTriggers`
    -   [x] Local State
    -   [x] Signals
-   [x] Prop Diffing
    -   Props are getting always set when parent rerenders, triggering child component to schedule a render
        -   Shallow Diffing:
            -   [x] Primitives - EZ 🎉
            -   [x] `null` you suck so much!
            -   [x] Objects - objects let it render!
            -   [x] Function, callback, handler - set it once forget!
-   [x] Split `Component` in to responsibilities:
    -   [x] Renderer
    -   [x] Local State
    -   [x] Props
-   [x] Styling - https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/CSSStyleSheet
    -   No css in jss, CSS or SCSS
-   [x] Make it supper hot - pre benchmarking 🔥🔥🔥🔥🔥🔥🔥 - It does not brake a sweat 😓 🎉

## HOT - Keep an eye on....

-   [] Proxy Nesting!! Probably Fixed 👀

## CURRENT

-   [] Put it through a benchmarks: https://github.com/krausest/js-framework-benchmark?tab=readme-ov-file

## Phase 2 - Testing

-   [] Testing Framework - Vitest
-   [] Concept of screen
-   [] Shadow DOM Piercing
-   [] Snapshots
    -   [] DOM HTML Snapshots
    -   [] `console.dir`
-   [] Setup Github Actions - Run tests on every push
-   [] Releasing based on tags

## Phase 3 - Routing

-   Build SPA router!

## Nice To Have

-   [] Application specific Event Bus - inner app commutation.
-   [] Can I have collections in my reactive state
-   [] Prop Validation ??
-   [] Prop rendering array dependency ??
-   [] Can I detect dangling custom elements tags ?? missing imports

## Phase at some point

-   Visual Testing
    -   Hybrid between component testing and e2e
    -   Storybook interface
    -   Not storybook!!!

### Play 🎉

-   Component composition - slots

### Snippets - Shit I can never remember

```js
export const Variable = {
    STUFF: 'something'
} as const;

export type VariableType = (typeof Variable)[keyof typeof Variable];
```
