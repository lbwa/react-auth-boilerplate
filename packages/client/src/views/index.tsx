import React, { lazy, Suspense } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { AuthRoute } from '../plugins/auth'
import BaseLoading from '../components/BaseLoading'
import {
  forbiddenRoute,
  forbiddenCode,
  forbiddenMessage,
  notFoundCode,
  notFoundMessage
} from '../shared/env'
import { withProgress } from '../plugins/progress'

const Home = withProgress(
  lazy(() => import(/* webpackChunkName: 'home' */ './Home'))
)
const User = withProgress(
  lazy(() => import(/* webpackChunkName: 'user' */ './User'))
)
const Err = lazy(() => import(/* webpackChunkName: 'err' */ './Error'))

function App() {
  return (
    <Router>
      <Suspense fallback={<BaseLoading />}>
        <Switch>
          <AuthRoute path="/user" component={User} />
          <Route exact path="/" component={Home} />

          {/* The following handlers are error handlers. */}
          <Route
            path={forbiddenRoute}
            component={withProgress(() => (
              <Err code={forbiddenCode} message={forbiddenMessage} />
            ))}
          />
          <Route
            component={withProgress(() => (
              <Err code={notFoundCode} message={notFoundMessage} />
            ))}
          />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
