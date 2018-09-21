# Known Bugs

## SSR: Fetching entity events from API occurs twice

We need to have the ssrDispatchHook on TasksScreenContainer to make the SSR wait for the dispatch, but we also
need to dispatch the fetch thunk on componentWillMount to trigger it on the client-side.


## Soft-reload results in propType error

```
checkPropTypes.js:19 Warning: Failed prop type: Invalid prop `tasks[0]` of type `Object` supplied to `TaskList`, expected instance of `Task`.
    in TaskList (created by TaskListContainer)
    in TaskListContainer (created by Connect(TaskListContainer))
    in Connect(TaskListContainer) (created by TasksScreen)
    in div (created by Grid)
    in Grid (created by WithStyles(Grid))
    in WithStyles(Grid) (created by TasksScreen)
    in div (created by Grid)
    in Grid (created by WithStyles(Grid))
    in WithStyles(Grid) (created by TasksScreen)
    in div (created by CardContent)
    in CardContent (created by WithStyles(CardContent))
    in WithStyles(CardContent) (created by TasksScreen)
    in div (created by Paper)
    in Paper (created by WithStyles(Paper))
    in WithStyles(Paper) (created by Card)
    in Card (created by WithStyles(Card))
    in WithStyles(Card) (created by TasksScreen)
    in TasksScreen (created by TasksScreenContainer)
    in TasksScreenContainer (created by Connect(TasksScreenContainer))
    in Connect(TasksScreenContainer) (created by Route)
    in Route (created by App)
    in Switch (created by App)
    in App (created by AppContainer)
    in AppContainer
    in MuiThemeProvider
    in Router (created by BrowserRouter)
    in BrowserRouter
    in Provider
```
