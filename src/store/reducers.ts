import { combineReducers, Action } from 'redux'
import { userTypes } from './actions'

const userInitialState = {
  token: ''
}

type ActionType<T, P = {}> = Action<keyof T> & P

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
