import React from 'react'

interface ErrorProps {
  code: string | number
  message: string
}

export default function Error({ code, message }: ErrorProps) {
  return (
    <>
      <h1>{code || 'Unknown error'}</h1>
      <p>{message}</p>
    </>
  )
}
