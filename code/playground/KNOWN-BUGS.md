# Known Bugs

## SSR: Fetching entity events from API occurs twice

We need to have the ssrDispatchHook on TasksScreenContainer to make the SSR wait for the dispatch, but we also
need to dispatch the fetch thunk on componentWillMount to trigger it on the client-side.


## Webpack dev server no longer working

Seems to be related to sw-prefetch.
