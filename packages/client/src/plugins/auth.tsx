import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

import { Ability, AbilitiesMap, AbilityName } from '../store/user/model'
import { useSelector } from 'react-redux'
import { StoreType } from '../store'
import { isDef } from '../shared/utils'

interface BaseAuthRouteProps {
  component: (...props: any[]) => JSX.Element | null
  redirect?: string
  has?: AbilityName
  strong?: AbilityName[]
  weak?: AbilityName[]
}

type AuthRouteProps = BaseAuthRouteProps & Omit<RouteProps, 'render'>
type AuthElementProps = Omit<BaseAuthRouteProps, 'component' | 'redirect'> &
  Record<'children', (...props: any[]) => JSX.Element | null>

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
  redirect = '/401',
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
