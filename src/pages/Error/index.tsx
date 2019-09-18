import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

interface ErrorProps {
  code: string | number
  message: string
}

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh'
      }
    }),
  { name: 'error' }
)

export default function Error({ code, message }: ErrorProps) {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <h1>{code || 'Unknown error'}</h1>
      <p>{message}</p>
    </div>
  )
}
