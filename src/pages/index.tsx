import React, { lazy, Suspense } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from '../components/Loading'
import Auth from '../components/Auth'

const Login = lazy(() => import(/* webpackChunkName: 'login' */ './Login'))
const Overview = lazy(() =>
  import(/* webpackChunkName: 'overview' */ './Overview')
)
const ErrorPage = lazy(() => import(/* webpackChunkName: 'error' */ './Error'))

export default function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Auth path="/overview" component={Overview} />
          <Route exact path="/" component={Login}></Route>
          <Route
            path="/401"
            render={() => (
              <ErrorPage code={401} message="You are unauthorized" />
            )}
          ></Route>
          <Route
            render={() => (
              <ErrorPage code={404} message="Seems nothing could be found" />
            )}
          ></Route>
        </Switch>
      </Suspense>
    </Router>
  )
}
