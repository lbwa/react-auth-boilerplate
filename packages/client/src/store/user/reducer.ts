import { userState, ActionPayload } from './model'
import { IAction } from '../../typings/store'
import { actionNames } from './actions'

function reducer(state = userState, action: IAction<ActionPayload>) {
  switch (action.type) {
    case actionNames.SET_USER:
      return {
        ...state,
        ...action.payload
      }

    case actionNames.DEL_USER:
      return userState

    default:
      return state
  }
}

reducer.namespace = 'user'

export default reducer
