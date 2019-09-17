import React, { useState, ChangeEvent } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { Central } from '../../layouts'
import { userLogin } from '../../apis'

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

export default function Login() {
  const classes = useStyles()
  const [user, setUser] = useState({
    name: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
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
        setLoading(true)
        userLogin(user.name, user.password)
          .then(() => {
            setLoading(false)
            history.push('/overview')
          })
          .catch(() => setLoading(false))
      }}
    >
      Login
    </Button>
  ))

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
    </Central>
  )
}
