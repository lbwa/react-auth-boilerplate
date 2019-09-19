import React, { useState, ChangeEvent, KeyboardEvent } from 'react'
import { History } from 'history'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { StickyFooter } from '../../layouts'
import { userLogin } from '../../apis'
import { useDispatch } from 'react-redux'
import { setUser as setUserAction } from '../../store/actions'

interface LoginInfo {
  name: string
  password: string
}

interface LoginProps {
  history: History
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loading: {
      position: 'fixed',
      top: '0',
      width: '100%'
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    item: {
      margin: theme.spacing(1)
    }
  })
)

/**
 * All route exports of react-router will be passed 3 props: match, history, location
 * @doc https://reacttraining.com/react-router/core/api/Route/route-props
 */
function Login({ history }: LoginProps) {
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

  const dispatch = useDispatch()

  function useLogin(username: string, password: string, shouldLogin: boolean) {
    if (!shouldLogin) return
    setLoading(true)
    userLogin(username, password)
      .then(({ token, abilities }) => {
        setLoading(false)
        dispatch(setUserAction({ token, abilities }))
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
  }

  const useEnter = (evt: KeyboardEvent) => {
    useLogin(
      user.name,
      user.password,
      !(evt.key !== 'Enter' || !user.name || !user.password)
    )
  }

  const useUserLogin = () => {
    useLogin(user.name, user.password, !(!user.name || !user.password))
  }

  return (
    <StickyFooter center loading={loading}>
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
        onKeyPress={useEnter}
        label="Password"
        type="password"
      ></TextField>
      <Button
        className={classes.item}
        variant="contained"
        color="primary"
        onClick={useUserLogin}
      >
        Login
      </Button>
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
    </StickyFooter>
  )
}

export default Login
