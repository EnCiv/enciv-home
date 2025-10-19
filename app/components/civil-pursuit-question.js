// https://github.com/EnCiv/enciv-home/issues/79
import React from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'

const CivilPursuitQuestion = props => {
  const {
    className = '', // may or may not be passed. Should be applied to the outer most tag, after local classNames
    subject = '',
    path = '',
    mode = 'dark', // dark or light mode
    ...otherProps
  } = props

  const classes = useStylesFromThemeFunction()

  // Determine if it's an external link
  const isExternal = path && !path.startsWith('/')

  return (
    <a
      className={cx(classes.civilPursuitQuestion, classes[mode], className)}
      href={path}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          e.currentTarget.click()
        }
      }}
      {...otherProps}
    >
      <span className={classes.subject}>{subject}</span>
      <span className={classes.chevron}>›</span>
    </a>
  )
}

export default CivilPursuitQuestion

const useStylesFromThemeFunction = createUseStyles(theme => ({
  civilPursuitQuestion: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.5rem 2rem',
    border: '0.125rem solid #E5E5E5',
    borderRadius: '1rem',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    minHeight: '4.5rem',
    gap: '1.5rem',
    boxShadow: '0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05)',
    '&:hover': {
      borderColor: theme.colors?.encivYellow,
      transform: 'translateX(0.5rem)',
      boxShadow: '0 0.25rem 0.75rem rgba(0, 0, 0, 0.08)',
    },
    '&:focus': {
      outline: theme.focusOutline || '0.1875rem solid #4A90E2',
      outlineOffset: '0.125rem',
    },
    '&:active': {
      transform: 'translateX(0.25rem) scale(0.99)',
    },
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      padding: '1.25rem 1.5rem',
      minHeight: '4rem',
    },
  },
  subject: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '1.375rem',
    fontWeight: 500,
    lineHeight: '1.75rem',
    flex: 1,
    textAlign: 'left',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      fontSize: '1.125rem',
      lineHeight: '1.5rem',
    },
  },
  chevron: {
    fontSize: '2.5rem',
    fontWeight: 200,
    lineHeight: 1,
    transition: 'transform 0.3s ease',
    flexShrink: 0,
    userSelect: 'none',
    '$civilPursuitQuestion:hover &': {
      transform: 'translateX(0.5rem)',
      color: theme.colors?.encivYellow,
    },
  },
  dark: {
    backgroundColor: theme.colors.darkModeGray,
    color: 'white',
    '& $chevron': {
      color: 'white',
    },
    '&:hover': {
      backgroundColor: '#3A3A3A',
    },
  },
  light: {
    backgroundColor: 'white',
    color: theme.colors.darkModeGray,
    '& $chevron': {
      color: theme.colors.darkModeGray,
    },
    '&:hover': {
      backgroundColor: '#FAFAFA',
    },
  },
}))
