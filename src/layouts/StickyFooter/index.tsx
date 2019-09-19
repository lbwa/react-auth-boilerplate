import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      progress: {
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 999,
        height: '2px',
        opacity: (props: StickyFooterProps) => (props.loading ? 1 : 0)
      },
      container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      },
      main: {
        display: ({ center }: StickyFooterProps) => (center ? 'flex' : ''),
        flexDirection: ({ center }: StickyFooterProps) =>
          center ? 'column' : 'initial',
        justifyContent: ({ center }: StickyFooterProps) =>
          center ? 'center' : '',
        alignItems: ({ center }: StickyFooterProps) => (center ? 'center' : ''),
        flex: 1,
        width: '100%'
      },
      footer: {
        padding: '20px 0',
        width: '100%',
        textAlign: 'center'
      }
    }),
  { name: 'global' }
)

interface StickyFooterProps {
  children: JSX.Element | string | (JSX.Element | string)[]
  loading?: boolean
  center?: boolean
}

export default function StickyFooter({
  children,
  loading = false,
  center = false
}: StickyFooterProps) {
  const classes = useStyles({ children, loading, center })
  const AUTHOR = {
    name: 'Bowen',
    github: 'https://gitub.com/lbwa'
  }
  const CREATED_YEAR = 2019
  const nowYear = new Date().getFullYear()
  const footerYear =
    CREATED_YEAR === nowYear ? CREATED_YEAR : CREATED_YEAR + ' - ' + nowYear
  return (
    <>
      <LinearProgress className={classes.progress} />
      <div className={classes.container}>
        <main className={classes.main}>{children}</main>
        <footer className={classes.footer}>
          &copy; {footerYear}{' '}
          <a href={AUTHOR.github} target="_blank" rel="noopener noreferrer">
            {AUTHOR.name}
          </a>
        </footer>
      </div>
    </>
  )
}
