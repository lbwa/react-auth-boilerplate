import { Action } from 'react-redux'

/**
 * @details https://github.com/redux-utilities/flux-standard-action
 */
export interface IAction<T> extends Action<string> {
  readonly type: string
  // The optional payload property MAY be any type of value. It represents the
  // payload of the action. Any information about the action that is not the
  // type or status of the action should be part of the payload field.

  // By convention, if error is true, the payload SHOULD be an error object.
  // This is akin to rejecting a promise with an error object.
  readonly payload?: T
  // The optional error property MAY be set to true if the action represents
  // an error.
  readonly error?: boolean
  // The optional meta property MAY be any type of value.
  // It is intended for any extra information that is not part of the payload.
  readonly meta?: any
}
