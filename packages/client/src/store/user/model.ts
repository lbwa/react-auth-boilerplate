export type Ability = {
  name: 'read' | 'add' | 'delete' | 'modify'
}

export type AbilityName = Ability['name']

export type AbilitiesMap = Record<Ability['name'], Ability>

export type ActionPayload = Partial<typeof userState>

export const userState = {
  token: '',
  abilities: [] as Ability[],
  abilitiesMap: {} as AbilitiesMap // also can be WeakMap data type
}
