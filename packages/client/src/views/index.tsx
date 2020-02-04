import React, { lazy, Suspense } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { AuthRoute } from '../plugins/auth'
import BaseLoading from '../components/BaseLoading'
import { forbiddenRoute, forbiddenCode, forbiddenMessage } from '../shared/env'

const Home = lazy(() => import(/* webpackChunkName: 'home' */ './Home'))
const User = lazy(() => import(/* webpackChunkName: 'user' */ './User'))
const Err = lazy(() => import(/* webpackChunkName: 'err' */ './Error'))

function App() {
  return (
    <Router>
      <Suspense fallback={<BaseLoading />}>
        <Switch>
          <AuthRoute has={'add'} path="/user" component={User} />
          <Route exact path="/" component={Home} />
          <Route
            path={forbiddenRoute}
            render={() => (
              <Err code={forbiddenCode} message={forbiddenMessage} />
            )}
          />
          <Route
            path="/404"
            render={() => (
              <Err code="404" message="Seems nothing could be found." />
            )}
          />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
