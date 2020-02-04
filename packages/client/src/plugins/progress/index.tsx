import React from 'react'
import NProgress from 'nprogress'
// import 'nprogress/nprogress.css' // default nprogress style

import './index.sass' // customize nprogress style

NProgress.configure({ showSpinner: false })

/**
 * @inspire
 * https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/Prompt.js
 * https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/Lifecycle.js
 */
export function withProgress(Component: React.ComponentType<any>) {
  return class Progress extends React.Component {
    componentDidMount() {
      NProgress.done(true)
    }

    componentWillUnmount() {
      NProgress.start()
    }

    render() {
      return <Component {...this.props} />
    }
  }
}
