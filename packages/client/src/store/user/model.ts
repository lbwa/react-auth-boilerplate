import { isDef } from '../../shared/utils'

export type Ability = {
  name: 'read' | 'add' | 'delete' | 'modify'
}

type AbilitiesMap = Record<Ability['name'], Ability>

export type ActionPayload = Partial<typeof initialState>

export const initialState = {
  token: '',
  abilities: [] as Ability[],
  abilitiesMap: {} as AbilitiesMap // also can be WeakMap data type
}

export function serializeAbilities(abilitiesList: Ability[]) {
  return abilitiesList.reduce((map, ability) => {
    if (isDef(map[ability.name])) {
      map[ability.name] = ability
    } else {
      console.warn(`[AB]: Duplicate user ability named ${ability.name}.`)
    }
    return map
  }, {} as AbilitiesMap)
}
