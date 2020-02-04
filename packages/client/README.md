<h1 align="center">React auth boilerplate</h1>

<p align="center">
  <a href="https://github.com/lbwa/react-auth-boilerplate/actions">
    <img alt="github workflow" src="https://github.com/lbwa/react-auth-boilerplate/workflows/deploy/badge.svg">
  </a>
  <img alt="lerna" src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg"/>
</p>

> This project is used to build a front-end authentication boilerplate.

## Route-based code splitting

- [Official route-based code splitting guide](https://reactjs.org/docs/code-splitting.html#route-based-code-splitting)

  > This approach only works with a browser environment<sup>[DOC](https://reactjs.org/docs/react-api.html#reactsuspense)</sup>, not SSR.
  >
  > SSR approach can be found from [here](https://reacttraining.com/react-router/web/guides/code-splitting), because [loadable-components](https://www.smooth-code.com/open-source/loadable-components/docs/loadable-vs-react-lazy/#comparison-table) has supported SSR environment.

## Route-based authorization

- [authorizer][authorizer]

  Define any logics about authorization.

[authorizer]: ./src/plugins/auth.tsx#L44-L56

- [AuthRoute](./src/plugins/auth.tsx#L58-L92)

  A component combined `authorizer` with [the route export](https://reacttraining.com/react-router/core/api/Route) of `react-router`.

  ```tsx
  <AuthRoute has="mongo.write" path="/overview" component={Overview} />
  ```

## Element-based authorization

- [authorizer][authorizer]

  Define any logics about authorization.

- [AuthElement](./src/plugins/auth.tsx#L94-L104)

  Based on [render props][render props].

  ```tsx
  // The child element only be rendered by access named 'mongo.read'
  <AuthElement has="mongo.read">
    Should be shown by{' '}
    <blockquote>
      <strong>mongo.read</strong>
    </blockquote>
  </AuthElement>
  ```

[render props]: https://reactjs.org/docs/render-props.html

## License

MIT © [Bowen Liu](https://github.com/lbwa)
