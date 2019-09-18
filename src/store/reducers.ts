import { combineReducers, Action } from 'redux'
import { userTypes } from './actions'

type ActionType<T, P = {}> = Action<keyof T> & P

const userInitialState = {
  token: ''
}

function user(
  state = userInitialState,
  action: ActionType<typeof userTypes, Record<'token', string>>
) {
  switch (action.type) {
    case userTypes.SET_USER:
      return Object.assign({}, state, {
        token: action.token
      })

    case userTypes.DEL_USER:
      return Object.assign({}, state, {
        token: ''
      })

    default:
      return state
  }
}

export default combineReducers({
  user
})
