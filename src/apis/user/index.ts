export function userLogin(username: string, password: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' && password === 'admin')
        return resolve({
          status: 200,
          token: Math.random()
            .toString(16)
            .slice(2)
        })

      return reject({
        status: 401,
        message: 'Wrong username or password'
      })
    }, 2000)
  })
}
