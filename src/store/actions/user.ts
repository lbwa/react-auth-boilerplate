import { UserActionPayload } from '../models'

const types = {
  SET_USER: 'SET_USER',
  DEL_USER: 'DEL_USER'
}

export default types

export function setUser({ token, abilities }: Required<UserActionPayload>) {
  return {
    type: types.SET_USER,
    token,
    abilities
  }
}

export function delUser() {
  return {
    type: types.DEL_USER
  }
}
