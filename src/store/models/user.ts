export type UserAbilities =
  | 'mongo.read'
  | 'mongo.write'
  | 'sql.read'
  | 'sql.write'

export type UserActionPayload = Partial<typeof initialState>

export type UserAbilitiesMap = Record<UserAbilities, boolean>

export const initialState = {
  token: '',
  abilities: [] as UserAbilities[],
  abilitiesMap: {} as UserAbilitiesMap
}

export function createAbilitiesMap(abilities: UserAbilities[]) {
  return abilities.reduce(
    (map, ability) => {
      if (map[ability]) {
        console.warn('[Abilities]: Duplicate abilities !')
      } else {
        map[ability] = true
      }
      return map
    },
    {} as UserAbilitiesMap
  )
}
