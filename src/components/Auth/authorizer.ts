import { storeType } from '../../store'
import { AuthProps } from './index'

type AuthPayload = Pick<AuthProps, 'has' | 'strong' | 'weak'>

export default function authorizer(
  { abilitiesMap }: storeType['user'],
  { has, strong, weak }: AuthPayload
) {
  if (has && typeof has === 'string') {
    return !!abilitiesMap[has]
  }
  if (Array.isArray(strong) && strong.length) {
    return strong.every(ability => !!abilitiesMap[ability])
  }
  if (Array.isArray(weak) && weak.length) {
    return weak.some(ability => !!abilitiesMap[ability])
  }
  // If no any has, strong, weak set, return true by default
  return true
}
