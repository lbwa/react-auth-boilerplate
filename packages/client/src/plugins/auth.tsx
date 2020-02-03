import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

import { AbilitiesMap, AbilityName } from '../store/user/model'
import { useSelector } from 'react-redux'
import { StoreType } from '../store'
import { isDef } from '../shared/utils'

interface BaseAuthProps {
  component: (...props: any[]) => JSX.Element | null
  redirect?: string
  has?: AbilityName
  strong?: AbilityName[]
  weak?: AbilityName[]
}

type AuthProps = BaseAuthProps & Omit<RouteProps, 'render'>

function verifyStrongOrWeak(
  pendingList: AbilityName[] | undefined,
  map: AbilitiesMap,
  type: 'every' | 'some'
) {
  if (Array.isArray(pendingList) && pendingList.length) {
    return pendingList[type](name => map[name])
  }
  return false
}

function authorizer(
  abilitiesMap: AbilitiesMap,
  { has, strong, weak }: Pick<BaseAuthProps, 'has' | 'strong' | 'weak'>
) {
  if (isDef(has)) return Boolean(abilitiesMap[has])

  const isStrong = Array.isArray(strong)
  return verifyStrongOrWeak(
    isStrong ? strong : weak,
    abilitiesMap,
    isStrong ? 'every' : 'some'
  )
}

export function AuthRoute({
  component: Component,
  redirect = '/401',
  has,
  strong,
  weak,
  ...routeProps
}: AuthProps) {
  const hasAuthorized = useSelector<StoreType, boolean>(({ user }) =>
    authorizer(user.abilitiesMap, {
      has,
      strong,
      weak
    })
  )
  return (
    <Route
      {...routeProps}
      render={rawRouteProps =>
        hasAuthorized ? (
          <Component {...rawRouteProps} />
        ) : (
          <Redirect
            to={{
              pathname: redirect,
              state: {
                from: routeProps.location
              }
            }}
          />
        )
      }
    />
  )
}
