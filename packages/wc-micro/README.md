## Phase 1 - MVP

-   [x] Template Rendering - uhtml - https://github.com/WebReflection/uhtml
    -   [] Granular control of rendering cycle
        -   [x] render()
        -   [] Component lifecycle methods (onRender, onMount etc)
-   [x] Internal Reactive State - Proxy, Pub Sub
-   [] External State - Abstraction on top of the reactive state - 2 way pub sub - Signals in Preact
-   [] Props
-   [] Styling - https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/CSSStyleSheet
    -   No css in jss, CSS or SCSS
-   Bundler support - Vite, otherwise go and figure.
-   Application specific Event Bus - inter app commutation

### Ideas

-   Unique Identifiers for classes and objects, instead of using NanoIDs or UUIDs I can use `Symbol(...)`

### Retrospective

-   Build a simple
-   See If I like it
-   Pros and Cons
-   If I don't like - Kill that thing FIRE!!

## Phase 2 - Testing

-   Testing Framework - Vitest
