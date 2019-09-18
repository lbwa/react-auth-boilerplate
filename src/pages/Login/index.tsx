import React, { useState, ChangeEvent } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { Central } from '../../layouts'
import { userLogin } from '../../apis'
import { useDispatch } from 'react-redux'
import { setUser as setUserAction } from '../../store/actions'

interface LoginInfo {
  name: string
  password: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loading: {
      position: 'fixed',
      top: '0',
      width: '100%'
    },
    item: {
      margin: theme.spacing(1)
    }
  })
)

function Login() {
  const classes = useStyles()
  const [user, setUser] = useState({
    name: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [snackbarState, setSnackbarState] = useState<{
    open: boolean
    message: string
  }>({
    open: false,
    message: ''
  })
  const onChangeEvt = (key: keyof LoginInfo) => (
    evt: ChangeEvent<HTMLInputElement>
  ) =>
    setUser({
      ...user,
      [key]: evt.target.value
    })

  const ToOverview = withRouter(({ history }) => (
    <Button
      className={classes.item}
      variant="contained"
      color="primary"
      onClick={() => {
        if (!user.name || !user.password) return
        setLoading(true)
        userLogin(user.name, user.password)
          .then(({ token }) => {
            setLoading(false)
            token && dispatch(setUserAction({ token }))
            history.replace('/overview')
          })
          .catch((err: Error) => {
            console.error(err.message || err)
            setSnackbarState({
              ...snackbarState,
              open: true,
              message: 'Incorrect username or password'
            })
            setLoading(false)
          })
      }}
    >
      Login
    </Button>
  ))

  const dispatch = useDispatch()

  return (
    <Central loading={loading}>
      <TextField
        className={classes.item}
        value={user.name}
        onChange={onChangeEvt('name')}
        label="Username"
      ></TextField>
      <TextField
        className={classes.item}
        value={user.password}
        onChange={onChangeEvt('password')}
        label="Password"
        type="password"
      ></TextField>
      <ToOverview />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={snackbarState.open}
        onClose={() =>
          setSnackbarState({
            ...snackbarState,
            message: '',
            open: false
          })
        }
        autoHideDuration={5000}
        message={<div>{snackbarState.message}</div>}
      />
    </Central>
  )
}

export default Login
