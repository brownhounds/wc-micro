## SPA Router

-   [x] Initialize router
    -   [x] Array of route objects - route definition
    -   [x] Active route - hydrated state of currently matched route
        -   [x] Route params === hydration
    -   [x] Dynamic Imports for Components - code splitting per route
-   [x] Router Component
    -   [x] Make it Configurable define custom tag for it
        -   [x] Router context
        -   [x] Custom event bus
-   [x] Nested Routes
    -   [x] Route Composition
        -   [x] Some Idea How! Bind to top level route and let the outlet do the rest of the work!!
            -   top level route component, need checking if component is already connected in the dom to avoid swapping of elements
            -   every child route should have a reference to top level route component
            -   so child route component will be fetched and mounted by outlet element
    -   [x] Outlets
        -   [x] ID the routes to match the desired outlet
-   [x] Top Level routes
-   [x] Active Route details exposed to user
    -   [x] Route Pattern
    -   [x] Params
-   [x] Route Matching
-   [x] Param Matching
-   [x] Route matching helper
-   [x] What about 404's
-   [x] Allow configuration of 404 fallback component
-   [x] `navigate` function
    -   [x] Include replace
-   [x] Add configurable route prefix
    -   [x] Duplicated routes
    -   [x] Check that every nested route has outletId
    -   [x] Duplicated route params

## Testing

-   [x] Route Matching order
-   [x] Route Matching
    -   [x] Child Routes
    -   [x] Nested Routes don't work under `/` 🐛
-   [x] Validation
    -   [x] Duplicated Routes
    -   [x] Outlet To Have an ID
    -   [x] Missing route with ID
    -   [x] Unique Route Params
    -   [x] Children Routes to have Outlet IDs
-   [x] Router Config
    -   [x] Route Prefix
    -   [x] Configurable HTMLElements Tags
-   [x] 404
    -   [x] Built In
    -   [x] UserDefined
-   [x] Navigation Function
-   [x] PopState
-   [x] User Helper matchRoute

## Nice To Have

-   [x] Centralized Error Handler
-   [] Type safe params
-   [] Type safe routes

## Discovery

-   [] How hard would it be to do route definition with decorators
    -   [] Is this crazy?? I kind of like it!! 😆 ❤️
    -   [] Vite plugin ??
