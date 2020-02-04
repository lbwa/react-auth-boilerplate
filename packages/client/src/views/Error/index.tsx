import React from 'react'
import classes from './index.module.sass'
import LWithFooter from '../../layouts/WithFooter'

interface ErrorProps {
  code: number | string
  message: string
}

export default function Error({ code, message }: ErrorProps) {
  return (
    <LWithFooter>
      <div className={classes.container}>
        <h1 className={classes.title}>{code || 'Oops'}</h1>
        <p>{message || 'Internal error occurs'}</p>
      </div>
    </LWithFooter>
  )
}
