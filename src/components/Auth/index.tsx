import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { storeType } from '../../store'
import authorizer from './authorizer'

interface AuthProps {
  component: (...props: any[]) => JSX.Element | null
  redirect?: string
}

export default function Auth(
  {
    component: Component,
    redirect = '/401',
    ...routeProps
  }: AuthProps & Omit<RouteProps, 'render'> /* remove 'render' option */
) {
  const userInfo = useSelector<storeType, storeType['user']>(
    state => state.user
  )
  return (
    <Route
      {...routeProps}
      render={rawRouteProps =>
        authorizer(userInfo) ? (
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
