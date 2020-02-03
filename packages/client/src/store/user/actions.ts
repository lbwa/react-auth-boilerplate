import { Ability } from './model'

// The current namespace action names.
export const actionNames = {
  SET_USER: 'SET_USER',
  DEL_USER: 'DEL_USER'
}

/**
 * The following functions are used to create some action to modify redux state.
 *
 * DON'T include any side effect when you create a new function.
 *
 * suggest to create a flux standard action
 * @details https://github.com/redux-utilities/flux-standard-action#flux-standard-action
 */

export function setUser({
  token,
  abilities
}: {
  token: string
  abilities: Ability[]
}) {
  return {
    type: actionNames.SET_USER,
    payload: {
      token,
      abilities
    }
  }
}

export function delUser() {
  return {
    type: actionNames.DEL_USER
  }
}
