// https://github.com/EnCiv/enciv-home/issues/7
// https://github.com/EnCiv/enciv-home/issues/34
import React from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import ActionButton from './action-button'
import MarkDown from 'markdown-to-jsx'

const TextBlock = props => {
  const {
    className = '', // may or may not be passed. Should be applied to the outer most tag, after local classNames
    mode = 'dark', // dark, white, see top-nav-bar for differences
    subject = '',
    description = '',
    subPoints = [],
    actionText = '',
    action, // text for an anchor or a function to put in onClick of a button
    icon = null, // A React Component icon to show aside the text.
    side = 'left', // The side to show the icon, if provided.
    ...otherProps
  } = props
  const classes = useStylesFromThemeFunction()

  // Verify a valid side has been provided
  if (side != 'left' && side != 'right') {
    console.error(`${side} is not a valid argument. Must be either 'left' or 'right'.`)
  }

  // Section for grouping text-based elements
  const textSection = (
    // Shrink width to 75% to fit the icon if provided, else leave as-is
    <div className={icon ? classes.textSectionWithIcon : classes.textSectionNoIcon}>
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
          <ActionButton action={action}>{actionText}</ActionButton>
        </div>
      )}
    </div>
  )

  // Section to contain the icon
  const iconSection = <div className={classes.iconSection}>{icon}</div>

  // Add the icon if it's provided, or display the textblock as-is if not.
  if (icon == null) {
    return (
      <div className={cx(classes.textBlock, classes[mode], className)} {...otherProps}>
        <div className={classes.wrapper}>{textSection}</div>
      </div>
    )
  } else {
    return (
      <div className={cx(classes.textBlock, classes[mode], className)} {...otherProps}>
        <div className={classes.wrapper}>
          {/* Because we checked if side is either 'left' or 'right' already, we can infer 
           it's right if it's not left. */}
          <div className={side == 'left' ? classes.innerWrapperIconLeft : classes.innerWrapperIconRight}>
            {iconSection}
            {textSection}
          </div>
        </div>
      </div>
    )
  }
}
export default TextBlock

const useStylesFromThemeFunction = createUseStyles(theme => ({
  textBlock: {
    textAlign: 'center',
    paddingTop: '3rem',
    paddingBottom: '4rem',
  },
  textSectionNoIcon: {
    width: '100%',
  },
  textSectionWithIcon: {
    width: '75%',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      width: '100%',
    },
  },
  iconSection: {
    width: '25%',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      width: '100%',
    },
  },
  wrapper: {
    maxWidth: theme.maxPanelWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    whiteSpace: 'pre-line',
  },
  innerWrapperIconLeft: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      flexDirection: 'column',
    },
  },
  innerWrapperIconRight: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      flexDirection: 'column',
    },
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
    marginTop: 0,
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
    textAlign: 'left',
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
