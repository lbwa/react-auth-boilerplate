import { initialState, ActionPayload } from './model'
import { ActionType } from '../../typings/store'
import { actionNames } from './actions'

function reducer(
  state = initialState,
  action: ActionType<typeof actionNames, ActionPayload>
) {
  switch (action.type) {
    case actionNames.SET_USER:
      return Object.assign({}, state, {
        token: action.token,
        abilities: action.abilities || []
      })

    case actionNames.DEL_USER:
      return initialState

    default:
      return state
  }
}

reducer.namespace = 'user'

export default reducer
