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

function authorizer(
  abilitiesMap: AbilitiesMap,
  {
    has,
    strong = [],
    weak = []
  }: Pick<BaseAuthProps, 'has' | 'strong' | 'weak'>
) {
  if (isDef(has)) return Boolean(abilitiesMap[has!])

  if (Array.isArray(strong) && strong.length) {
    return strong.every(name => abilitiesMap[name])
  }

  if (Array.isArray(weak) && weak.length) {
    return weak.some(name => abilitiesMap[name])
  }

  return false
}

export function AuthRoute({
  component: Component,
  redirect = '/401',
  has,
  strong = [],
  weak = [],
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
