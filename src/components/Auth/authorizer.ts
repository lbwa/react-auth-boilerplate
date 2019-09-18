import { storeType } from '../../store'

export default function authorizer({ token }: storeType['user']) {
  return !!token
}
