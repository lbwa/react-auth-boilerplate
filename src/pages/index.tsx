import React, { lazy, Suspense } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from '../components/Loading'

const Login = lazy(() => import('./Login'))
const Overview = lazy(() => import('./Overview'))
const ErrorPage = lazy(() => import('./Error'))

export default function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/overview" component={Overview}></Route>
          <Route path="/" component={Login}></Route>
          <Route component={ErrorPage}></Route>
        </Switch>
      </Suspense>
    </Router>
  )
}
