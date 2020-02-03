## store workflow

1. `Views` dispatches an `Action`.
1. `Action` calls an `Effect`.
1. `Effect` handles API calls and sanitizes incoming data or return an error.
1. `Action` receives sanitized models or an error from the `Effect` and dispatches it.
1. `Reducer` receives the models or an error from the `Action` and adds them to the store.
1. `Selector` takes the `Reducers` data and create specific data for the `Views`.
1. `View` gets data straight from the store or a `Selector` and just displays it. (The rest is internal communication and state management)
