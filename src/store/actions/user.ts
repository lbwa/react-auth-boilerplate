const types = {
  SET_USER: 'SET_USER',
  DEL_USER: 'DEL_USER'
}

export default types

export function setUser({ token }: { token: string }) {
  return {
    type: types.SET_USER,
    token
  }
}

export function delUser() {
  return {
    type: types.DEL_USER
  }
}
