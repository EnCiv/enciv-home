//https://github.com/EnCiv/enciv-home/issues/7
import React from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import ActionButton from './action-button'
import MarkDown from 'react-markdown'

const TextBlock = props => {
  const {
    className = '', // may or may not be passed. Should be applied to the outer most tag, after local classNames
    mode = 'dark', // dark, white, see top-nav-bar for differences
    subject = '',
    description = '',
    subPoints = [],
    actionText = '',
    action, // text for an anchor or a function to put in onClick of a button
    ...otherProps
  } = props
  const classes = useStylesFromThemeFunction()
  return (
    <div className={cx(classes.textBlock, classes[mode], className)} {...otherProps}>
      <div className={classes.wrapper}>
        {subject && <h2 className={classes.subject}>{subject}</h2>}
        {description && <MarkDown className={classes.description}>{description}</MarkDown>}
        {subPoints && (
          <ul className={classes.subPoints}>
            {subPoints.map(text => (
              <li>{text}</li>
            ))}
          </ul>
        )}
        {actionText && (
          <div className={classes.actionButton}>
            <ActionButton>{actionText}</ActionButton>
          </div>
        )}
      </div>
    </div>
  )
}
export default TextBlock

const useStylesFromThemeFunction = createUseStyles(theme => ({
  textBlock: {
    textAlign: 'center',
    paddingTop: '4rem',
    paddingBottom: '4rem',
  },
  wrapper: {
    maxWidth: '72rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    whiteSpace: 'pre-line',
  },
  subject: {
    fontSize: '3rem',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '3.6875rem',
    textAlign: 'center',
    marginLeft: '2rem',
    marginRight: '2rem',
  },
  description: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '1.5rem',
    lineHeight: '2.25rem',
    leadingTrim: 'both',
    textEdge: 'cap',
    textAlign: 'center',
    marginLeft: '2rem',
    marginRight: '2rem',
    '& p': {
      marginBlockStart: 0,
      marginBlockEnd: 0,
    },
  },
  subPoints: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '1.5rem',
    lineHeight: '2.25rem',
    leadingTrim: 'both',
    textEdge: 'cap',
    textAlign: 'center',
    listStylePosition: 'inside',
    marginLeft: '2rem',
    marginRight: '2rem',
    paddingLeft: 0,
    '& li::marker': {
      content: '"\u2022 "',
    },
  },
  actionButton: {
    marginTop: '4rem',
  },
  dark: {
    backgroundColor: theme.colors.darkModeGray,
    color: 'white',
  },
  light: {
    backgroundColor: 'white',
    color: theme.colors.darkModeGray,
  },
}))
