export type UserAbilities =
  | 'mongo.read'
  | 'mongo.write'
  | 'sql.read'
  | 'sql.write'

export type UserActionPayload = Partial<typeof initialState>

export const initialState = {
  token: '',
  abilities: [] as UserAbilities[]
}
