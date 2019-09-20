import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { storeType } from '../../store'
import authorizer from './authorizer'
import { UserAbilities } from '../../store/models'

interface AuthMetaProps {
  component: (...props: any[]) => JSX.Element | null
  redirect?: string
  has?: UserAbilities
  strong?: UserAbilities[]
  weak?: UserAbilities[]
}

export type AuthProps = AuthMetaProps &
  Omit<RouteProps, 'render'> /* remove 'render' option */

export default function Auth({
  component: Component,
  redirect = '/401',
  has,
  strong = [],
  weak = [],
  ...routeProps
}: AuthProps) {
  const hasAuthorized = useSelector<storeType, boolean>(({ user }) =>
    authorizer(user, { has, strong, weak })
  )
  return (
    <Route
      {...routeProps}
      render={rawRouteProps =>
        hasAuthorized ? (
          <Component {...routeProps} {...rawRouteProps}></Component>
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
    ></Route>
  )
}
