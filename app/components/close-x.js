import React from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'

export default function CloseX(props) {
  const { title = 'close this', className, tabIndex = 0, ...otherProps } = props
  const classes = useStylesFromThemeFunction()
  return (
    <button className={cx(classes.closeX, className)} title={'close message'} tabIndex={tabIndex} {...otherProps}>
      {'\u2715'}
    </button>
  )
}

const useStylesFromThemeFunction = createUseStyles(theme => ({
  closeX: {
    background: 'transparent',
    color: 'inherit',
    border: 'none',
    position: 'absolute',
    paddingRight: '.75rem',
    paddingTop: '.25rem',
    cursor: 'pointer',
    top: 0,
    right: 0,
    '&:hover': {
      fontWeight: '900',
    },
    '&:focus': {
      outline: theme.focusOutline,
    },
  },
}))
