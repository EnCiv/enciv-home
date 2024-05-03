//https://github.com/EnCiv/enciv-home/issues/8
import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import { Components } from 'civil-pursuit'
import BrevoJoin from './brevo-join'
const { Button } = Components
const ActionButton = props => {
  const {
    className = '', // may or may not be passed. Should be applied to the outer most tag, after local classNames
    action,
    ...otherProps
  } = props
  const [showForm, setShowForm] = useState(false)
  const classes = useStylesFromThemeFunction()
  if (action) {
    if (typeof action === 'string')
      return (
        <a
          className={cx(classes.actionButton, className)}
          href={action}
          target={action[0] === '/' ? '_self' : '_blank'}
          {...otherProps}
        ></a>
      )
  } else
    return (
      <>
        <Button
          className={cx(classes.actionButton, className)}
          onDone={() => setShowForm(!showForm)}
          {...otherProps}
        ></Button>
        <BrevoJoin active={showForm} forceClose={() => setShowForm(false)} />
      </>
    )
}
export default ActionButton

const useStylesFromThemeFunction = createUseStyles(theme => ({
  actionButton: {
    backgroundColor: theme.colors.encivYellow,
    color: theme.colors.darkModeGray,
    borderRadius: '1.75rem',
    border: 'none',
    fontWeight: 700,
    fontSize: '1.25rem',
    lineHeight: '1.5rem',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    padding: '0.5rem 1.25rem',
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
    '& :focus': {
      outline: theme.focusOutline,
    },
  },
}))
