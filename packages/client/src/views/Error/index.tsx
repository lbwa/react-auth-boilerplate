import React from 'react'
import classes from './index.module.sass'

interface ErrorProps {
  code: number | string
  message: string
}

export default function Error({ code, message }: ErrorProps) {
  return (
    <div className={classes.container}>
      <h1>{code || 'Oops'}</h1>
      <p>{message || 'Internal error occurs'}</p>
    </div>
  )
}
