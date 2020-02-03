import React, { lazy, Suspense } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import BaseLoading from '../components/BaseLoading'

const Home = lazy(() => import(/* webpackChunkName: 'home' */ './Home'))

function App() {
  return (
    <Router>
      <Suspense fallback={<BaseLoading />}>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
