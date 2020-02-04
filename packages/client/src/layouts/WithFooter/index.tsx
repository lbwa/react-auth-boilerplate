import React from 'react'
import classes from './index.module.sass'

const WithFooter: React.FC = ({ children }) => {
  return (
    <>
      <div className={classes.container}>{children}</div>
      <footer className={classes.footer}>
        <p className={classes['footer-item']}>
          Copyright &copy; {new Date().getFullYear()}{' '}
          <a
            href="http://github.com/lbwa"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bowen
          </a>
        </p>
      </footer>
    </>
  )
}

export default WithFooter
