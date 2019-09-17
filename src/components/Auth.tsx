import React from 'react'
import { Route, Redirect } from 'react-router-dom'

interface AuthProps {
  component: (...props: any[]) => JSX.Element
  [key: string]: any
}

function authorizer() {
  return true
}

export default function Auth({
  component: Component,
  ...extraProps
}: AuthProps) {
  return (
    <Route
      {...extraProps}
      render={({ location }) =>
        authorizer() ? (
          <Component {...extraProps}></Component>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: location
              }
            }}
          />
        )
      }
    ></Route>
  )
}
