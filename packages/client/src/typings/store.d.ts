import { Action } from 'react-redux'

export type ActionType<T, R = {}> = Action<keyof T> & R
