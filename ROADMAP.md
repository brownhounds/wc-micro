# Dynamic Roadmap

## CHORES

-   [] Fix an app in perf repo, cleanup requestAnimationFrames in removed components
-   [] Update dependencies from HTML Snapshots

## Must Have

-   [] Introduce Concept of the Changelog
-   [] Lock packages to a specific version something like 0.1.0

## UI

-   Design Theme Context Prt of UI Library

## Phase at some point

-   Visual Testing
    -   Hybrid between component testing and e2e
    -   Storybook interface
    -   Not storybook!!!
        -   https://webdriver.io/
        -   Vitest has browser environment which default to webdriver as a default driver

### Play 🎉

-   Svelte Store pattern - https://www.youtube.com/watch?v=T3XBiCbm97M
-   Custom Elements SSR - In GO!!! 🎉
    -   https://webreflection.medium.com/linkedom-a-jsdom-alternative-53dd8f699311
    -   https://dev.to/steveblue/server-side-rendering-a-blog-with-web-components-3ije
-   Component composition - slots
-   Vitest has browser mode: https://vitest.dev/guide/browser.html
-   There is a thing... HappY-Dom 🎉
-   SQL Magic - https://kysely.dev/
-   https://www.destroyallsoftware.com/talks/wat
-   https://pilfer.github.io/sneaky-javascript/anonymous-functions/
-   Go Websocket - https://github.com/olahol/melody
-   JS Serialization - https://github.com/lxsmnsyc/seroval

### Snippets - Shit I can never remember

```js
export const Variable = {
    STUFF: 'something'
} as const;

export type VariableType = (typeof Variable)[keyof typeof Variable];
```
