import { ActionType, userTypes } from '../actions'
import {
  UserActionPayload,
  initialState,
  createAbilitiesMap,
  UserAbilitiesMap
} from '../models'

export default function user(
  state = initialState,
  action: ActionType<typeof userTypes, UserActionPayload>
): typeof initialState {
  switch (action.type) {
    case userTypes.SET_USER:
      return Object.assign({}, state, {
        token: action.token,
        abilities: action.abilities || [],
        abilitiesMap: action.abilities
          ? createAbilitiesMap(action.abilities)
          : {}
      })

    case userTypes.DEL_USER:
      return {
        token: '',
        abilities: [],
        abilitiesMap: {} as UserAbilitiesMap
      }

    default:
      return state
  }
}
