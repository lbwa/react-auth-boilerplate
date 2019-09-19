import { ActionType, userTypes } from '../actions'
import { UserActionPayload, initialState } from '../models'

export default function user(
  state = initialState,
  action: ActionType<typeof userTypes, UserActionPayload>
) {
  switch (action.type) {
    case userTypes.SET_USER:
      return Object.assign({}, state, {
        token: action.token,
        abilities: action.abilities || []
      })

    case userTypes.DEL_USER:
      return Object.assign({}, state, {
        token: '',
        abilities: []
      })

    default:
      return state
  }
}
