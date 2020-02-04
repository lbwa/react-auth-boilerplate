import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Ability, AbilitiesMap, AbilityName } from '../store/user/model'
import { StoreType } from '../store'
import { isDef } from '../shared/utils'
import { forbiddenRoute } from '../shared/env'

interface BaseAuthRouteProps {
  component: React.ComponentType<any>
  redirect?: string
  has?: AbilityName
  strong?: AbilityName[]
  weak?: AbilityName[]
}

type AuthRouteProps = BaseAuthRouteProps & Omit<RouteProps, 'render'>
type AuthElementProps = Omit<BaseAuthRouteProps, 'component' | 'redirect'> &
  Record<'children', React.ComponentType<any>>

export function serializeAbilities(abilitiesList: Ability[]) {
  return abilitiesList.reduce((map, ability) => {
    if (isDef(map[ability.name])) {
      map[ability.name] = ability
    } else {
      console.warn(`[AB]: Duplicate user ability named ${ability.name}.`)
    }
    return map
  }, {} as AbilitiesMap)
}

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
  { has, strong, weak }: Pick<BaseAuthRouteProps, 'has' | 'strong' | 'weak'>
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
  redirect = forbiddenRoute,
  has,
  strong,
  weak,
  ...routeProps
}: AuthRouteProps) {
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

export function AuthElement({
  children: Component,
  has,
  strong,
  weak
}: AuthElementProps) {
  const hasAuthorized = useSelector<StoreType, boolean>(({ user }) =>
    authorizer(user.abilitiesMap, { has, strong, weak })
  )
  return hasAuthorized ? <Component /> : null
}
