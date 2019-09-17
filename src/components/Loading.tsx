import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      container: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1000,
        fontSize: 0,
        // supported by IE9 +
        '&:empty': {
          '&:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            border: '3px solid #ebf0f1',
            borderTopColor: '#49597a',
            borderRadius: '50%',
            width: '25px',
            height: '25px',
            animation: '$spin 1s linear infinite'
          }
        }
      },
      '@keyframes spin': {
        from: {
          transform: 'translate(-50%, -50%) rotate(0deg)'
        },
        to: {
          transform: 'translate(-50%, -50%) rotate(720deg)'
        }
      }
    }),
  { name: 'loading' }
)

export default function Loading() {
  const classes = useStyle()
  return <div className={classes.container}></div>
}
