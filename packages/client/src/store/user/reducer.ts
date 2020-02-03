import { userState, ActionPayload } from './model'
import { ActionType } from '../../typings/store'
import { actionNames } from './actions'

function reducer(
  state = userState,
  action: ActionType<typeof actionNames, ActionPayload>
) {
  switch (action.type) {
    case actionNames.SET_USER:
      return {
        ...state,
        ...{
          token: action.token,
          abilities: action.abilities || []
        }
      }

    case actionNames.DEL_USER:
      return userState

    default:
      return state
  }
}

reducer.namespace = 'user'

export default reducer
