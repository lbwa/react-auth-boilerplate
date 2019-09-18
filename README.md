<h1 align="center">React auth boilerplate</h1>

> This project is used to build a front-end authentication boilerplate.

## Route-based code splitting

- [Official route-based code splitting guide](https://reactjs.org/docs/code-splitting.html#route-based-code-splitting)

  > This approach is only works with a browser environment<sup>[DOC](https://reactjs.org/docs/react-api.html#reactsuspense)</sup>, not SSR.
  >
  > SSR approach can be found from [here](https://reacttraining.com/react-router/web/guides/code-splitting), because [loadable-components](https://www.smooth-code.com/open-source/loadable-components/docs/loadable-vs-react-lazy/#comparison-table) has supported SSR environment.

## Route-based authorization

- [authorizer](./src/components/Auth/authorizer.ts)

  Define any logics about authorization.

- [Auth](./src/components/Auth/index.tsx)

  A component combined [authorizer](./src/components/Auth/authorizer.ts) with [the route export](https://reacttraining.com/react-router/core/api/Route) of `react-router`.
