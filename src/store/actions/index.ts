import { Action } from 'redux'

export type ActionType<T, P = {}> = Action<keyof T> & P
export * from './user'
export { default as userTypes } from './user'
