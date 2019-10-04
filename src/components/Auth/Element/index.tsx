import React from 'react'
import authorizer from '../authorizer'
import { useSelector } from 'react-redux'
import { UserAbilities } from '../../../store/models'
import { storeType } from '../../../store'

interface AuthMetaProps {
  children: (...props: any[]) => JSX.Element
  has?: UserAbilities
  strong?: UserAbilities[]
  weak?: UserAbilities[]
}

export default function AuthElement({
  children: Component,
  has,
  strong,
  weak
}: AuthMetaProps) {
  const hasAuthorized = useSelector<storeType, boolean>(({ user }) =>
    authorizer(user, { has, strong, weak })
  )
  return hasAuthorized ? <Component /> : null
}
