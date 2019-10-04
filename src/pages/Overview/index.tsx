import React from 'react'
import { useDispatch } from 'react-redux'
import { History } from 'history'
import { StickyFooter } from '../../layouts'
import Button from '@material-ui/core/Button'
import { delUser } from '../../store/actions'
import AuthElement from '../../components/Auth/Element'

interface OverviewProps {
  history: History
}

export default function Overview({ history }: OverviewProps) {
  const dispatch = useDispatch()
  return (
    <StickyFooter center>
      <h2>Overview</h2>
      <AuthElement has="mongo.read">
        {() => (
          <>
            Should be shown by{' '}
            <blockquote>
              <strong>mongo.read</strong>
            </blockquote>
          </>
        )}
      </AuthElement>
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
