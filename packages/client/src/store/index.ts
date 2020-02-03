import { createStore, combineReducers } from 'redux'

// TODO: automatic importation based on required.context
import userReducer from './user/reducer'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: Function
  }
}

export type StoreType = ReturnType<typeof reducers>

const reducers = combineReducers({
  [userReducer.namespace]: userReducer
})

export default createStore(
  reducers,
  process.env.NODE_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
)
