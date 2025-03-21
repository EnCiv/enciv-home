//https://github.com/EnCiv/enciv-home/issues/8
//https://github.com/EnCiv/enciv-home/issues/56
//https://github.com/EnCiv/enciv-home/issues/72
//https://github.com/EnCiv/enciv-home/issues/55

import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import { Components } from 'civil-pursuit'
import BrevoJoin from './brevo-join'
import * as icons from '../svgr'

function Iconify(props) {
  const { iconName, ...otherProps } = props
  const Icon = icons[iconName]
  return <Icon {...otherProps} />
}
const { Button } = Components
const ActionButton = props => {
  const {
    className = '', // may or may not be passed. Should be applied to the outer most tag, after local classNames
    action,
    mode = 'default', // transparent mode changes btn background to transparent
    iconName = '',
    children,
    ...otherProps
  } = props
  const [showForm, setShowForm] = useState(false)
  const classes = useStylesFromThemeFunction({ mode })

  const buttonContent = () => (
    <div className={cx(classes.buttonContent)}>
      {children}
      {iconName && <Iconify className={cx(classes.icon)} iconName={iconName} />}
    </div>
  )
  if (action) {
    if (typeof action === 'string')
      return (
        <a
          className={cx(classes.actionButton, className)}
          href={action}
          target={action[0] === '/' ? '_self' : '_blank'}
          tabIndex={0} // Ensure the <a> element is focusable
          onKeyDown={e => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault()
              e.currentTarget.click()
            }
          }}
          {...otherProps}
        >
          {buttonContent()}
        </a>
      )
    if (typeof action === 'function')
      return (
        <Button className={cx(classes.actionButton, className)} onDone={action} {...otherProps}>
          {buttonContent()}
        </Button>
      )
  } else
    return (
      <>
        <Button className={cx(classes.actionButton, className)} onDone={() => setShowForm(!showForm)} {...otherProps}>
          {buttonContent()}
        </Button>
        <BrevoJoin active={showForm} forceClose={() => setShowForm(false)} actionText={props.children} />
      </>
    )
}
export default ActionButton

const useStylesFromThemeFunction = createUseStyles(theme => ({
  actionButton: props => ({
    backgroundColor: props.mode === 'transparent' ? 'transparent' : theme.colors.encivYellow,
    color: props.mode === 'transparent' ? 'white' : theme.colors.darkModeGray,
    borderRadius: '1.75rem',
    border: props.mode === 'transparent' ? '0.1rem solid white' : 'none',
    fontWeight: 700,
    fontSize: '1.25rem',
    lineHeight: '1.5rem',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    padding: '0.5rem 1.25rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
    '& :focus': {
      outline: theme.focusOutline,
    },
  }),
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginLeft: '.5em',
  },
}))
