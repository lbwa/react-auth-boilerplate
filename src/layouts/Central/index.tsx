import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    },
    progress: {
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 999,
      height: '2px',
      opacity: (props: CentralProps) => (props.loading ? 1 : 0)
    }
  })
)

interface CentralProps {
  children: JSX.Element | string | (JSX.Element | string)[]
  loading?: boolean
}

export default function Central({ children, loading = false }: CentralProps) {
  const classes = useStyles({ children, loading })
  return (
    <>
      <LinearProgress className={classes.progress} />
      <div className={classes.container}>{children}</div>
    </>
  )
}
