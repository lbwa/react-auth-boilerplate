import React from 'react'
import classes from './index.module.sass'

export default function BaseLoading() {
  return (
    <div className={classes.container}>
      <p className={classes.spinner}></p>
      <p>Loading</p>
    </div>
  )
}
