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
    variant = mode === 'transparent' ? 'secondary' : 'primary',
    size = 'default',
    bevel = false,
    iconName = '',
    children,
    ...otherProps
  } = props
  const [showForm, setShowForm] = useState(false)
  const classes = useStylesFromThemeFunction({ mode, variant })
  const actionButtonClass = cx(
    classes.actionButton,
    bevel && classes.beveledActionButton,
    className
  )

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
          className={actionButtonClass}
          data-size={size}
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
        <Button className={actionButtonClass} data-size={size} onDone={action} {...otherProps}>
          {buttonContent()}
        </Button>
      )
  } else
    return (
      <>
        <Button className={actionButtonClass} data-size={size} onDone={() => setShowForm(!showForm)} {...otherProps}>
          {buttonContent()}
        </Button>
        <BrevoJoin active={showForm} forceClose={() => setShowForm(false)} actionText={props.children} />
      </>
    )
}
export default ActionButton

const useStylesFromThemeFunction = createUseStyles(theme => ({
  actionButton: props => ({
    backgroundColor:
      props.variant === 'secondary'
        ? 'rgba(177, 137, 15, 0.18)'
        : props.mode === 'transparent'
          ? 'transparent'
          : theme.colors.encivYellow,
    color: props.variant === 'secondary' || props.mode === 'transparent' ? 'white' : theme.colors.darkModeGray,
    borderRadius: '0.5rem',
    border: props.variant === 'secondary' ? '1px solid #FFE8BE' : props.mode === 'transparent' ? '0.1rem solid white' : 'none',
    fontWeight: 700,
    fontSize: '1.25rem',
    lineHeight: '1.5rem',
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    padding: '0.75rem 1.5rem',
    boxShadow: '0 0.2rem 0 rgba(0,0,0,.42), 0 0.45rem 0.8rem rgba(0,0,0,.24), inset 0 0.0625rem 0 rgba(255,255,255,.55)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    transition: 'transform 120ms ease, box-shadow 120ms ease',
    '&:hover': {
      cursor: 'pointer',
      transform: 'translateY(-0.1rem)',
    },
    '&:active:not(:disabled)': {
      transform: 'translateY(0.125rem)',
      boxShadow: '0 0.0625rem 0 rgba(0,0,0,.42), 0 0.125rem 0.3rem rgba(0,0,0,.2), inset 0 0.0625rem 0 rgba(255,255,255,.45)',
    },
    '& :focus': {
      outline: theme.focusOutline,
    },
    '&[data-size="large"]': {
      fontSize: '1.5rem',
      lineHeight: '1.8rem',
      padding: '0.9rem 3rem',
      borderRadius: '0.625rem',
      boxSizing: 'border-box',
    },
    '@media (max-width: 38rem)': {
      '&[data-size="large"]': {
        fontSize: '1.5rem',
        lineHeight: '1.8rem',
        padding: '0.9rem 1.5rem',
        borderRadius: '0.625rem',
      },
    },
  }),
  beveledActionButton: {
    borderTop: '0.125rem solid rgba(255,255,255,.55)',
    borderLeft: '0.125rem solid rgba(255,255,255,.4)',
    borderRight: '0.125rem solid rgba(102,68,0,.24)',
    borderBottom: '0.1875rem solid rgba(102,68,0,.42)',
    boxShadow: '0 0.2rem 0 rgba(0,0,0,.42), 0 0.45rem 0.8rem rgba(0,0,0,.24), inset 0 0.0625rem 0 rgba(255,255,255,.55)',
    boxSizing: 'border-box',
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginLeft: '.5em',
  },
}))
