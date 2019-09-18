import { createStore } from 'redux'
import reducer from './reducers'
import { __DEV__ } from '../shared/env'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: Function
  }
}

export default createStore(
  reducer,
  __DEV__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
)

export type storeType = ReturnType<typeof reducer>
