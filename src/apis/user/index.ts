import { UserAbilities } from '../../store/models'

interface HttpStatus {
  status: number
}

type HttpResponse<R = {}> = HttpStatus & R
type UserLoginResponse = HttpResponse<{
  token: string
  abilities: UserAbilities[]
}>

/**
 * @description simulate user login action
 * @param username current user name
 * @param password current user password
 */
export function userLogin(
  username: string,
  password: string
): Promise<UserLoginResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const adminLogin = username === 'admin' && password === 'admin'
      const userLogin = username === 'user' && password === 'user'
      const abilities: UserAbilities[] = []
      if (adminLogin) {
        abilities.push(
          ...([
            'mongo.read',
            'mongo.write',
            'sql.read',
            'sql.write'
          ] as UserAbilities[])
        )
      }
      if (userLogin) {
        abilities.push(...(['mongo.read', 'sql.read'] as UserAbilities[]))
      }
      if (adminLogin || userLogin)
        return resolve({
          status: 200,
          abilities,
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
