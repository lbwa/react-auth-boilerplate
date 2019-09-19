import React from 'react'
import { useDispatch } from 'react-redux'
import { History } from 'history'
import { StickyFooter } from '../../layouts'
import Button from '@material-ui/core/Button'
import { delUser } from '../../store/actions'

interface OverviewProps {
  history: History
}

export default function Overview({ history }: OverviewProps) {
  const dispatch = useDispatch()
  return (
    <StickyFooter center>
      <p>Overview</p>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          history.push('/')
          dispatch(delUser())
        }}
      >
        Logout
      </Button>
    </StickyFooter>
  )
}
