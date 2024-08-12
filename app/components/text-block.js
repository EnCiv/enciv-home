// https://github.com/EnCiv/enciv-home/issues/7
// https://github.com/EnCiv/enciv-home/issues/34
// https://github.com/EnCiv/enciv-home/issues/44
import React from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import ActionButton from './action-button'
import MarkDown from 'markdown-to-jsx'
import * as icons from '../svgr'

function Iconify(props) {
  const { iconName, ...otherProps } = props
  const Icon = icons[iconName]
  return <Icon {...otherProps} />
}

const TextBlock = props => {
  const {
    className = '', // may or may not be passed. Should be applied to the outer most tag, after local classNames
    mode = 'dark', // dark, white, see top-nav-bar for differences
    subject = '',
    description = '',
    subPoints = [],
    actionText = '',
    action, // text for an anchor or a function to put in onClick of a button
    iconName, // A string name corresponding to an svgr component
    side = 'left', // The side to show the icon, if provided.
    imgUrl = '',
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
    <div
      className={
        (iconName ? classes.textSectionWithIcon : classes.textSectionNoIcon,
        imgUrl ? classes.textSectionWithImage : classes.textSectionNoIcon)
      }
    >
      {subject && (
        <h2 className={(imgUrl ? classes.subjectWithImage : classes.subjectNoImage, classes.subject)}>{subject}</h2>
      )}
      {description && <MarkDown className={classes.description}>{description}</MarkDown>}
      {subPoints && (
        <ul className={imgUrl ? classes.subPointsWithImage : classes.subPoints}>
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

  // Check if the icon with name exists in svgr
  const iconComponent = iconName && icons[iconName] && <Iconify iconName={iconName} width="10rem" height="auto" />

  // Section to contain the icon
  const iconSection = <div className={classes.iconSection}>{iconComponent}</div>

  // Add the icon if it's provided, or display the textblock as-is if not.
  if (!iconName && !imgUrl) {
    return (
      <div className={cx(classes.textBlock, classes[mode], className)} {...otherProps}>
        <div className={classes.wrapper}>{textSection}</div>
      </div>
    )
  }
  if (imgUrl) {
    return (
      <div className={cx(classes.textBlock, classes[mode], className)} {...otherProps}>
        <div className={classes.wrapper}>{textSection}</div>
        <div className={cx(classes.textBlockImage, className)}>
          <img className={cx(classes.imageUrl, className)} src={imgUrl} />
        </div>
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
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: '3rem',
    paddingBottom: '4rem',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      flexDirection: 'column',
    },
  },
  textBlockImage: {
    flex: '1',
    textAlign: 'left',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      marginTop: '2rem',
      paddingLeft: '2rem',
      paddingRight: '2rem',
      marginRight: 0,
    },
  },
  imageUrl: {
    width: '100%',
    maxHeight: '100%',
    aspectRatio: '1 auto',
  },
  textSectionNoIcon: {
    width: '100%',
  },
  textSectionWithImage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    textAlign: 'left',
    width: '90%',
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
      marginTop: '2.25rem',
    },
  },
  wrapper: {
    maxWidth: theme.maxPanelWidth,
    marginLeft: '1rem',
    marginRight: 'auto',
    whiteSpace: 'pre-line',
    flex: '1',
    margin: 'auto',
  },
  innerWrapperIconLeft: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      flexDirection: 'column-reverse',
    },
  },
  innerWrapperIconRight: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      flexDirection: 'column-reverse',
    },
  },
  subject: {
    fontSize: '3rem',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '3.6875rem',
    marginTop: 0,
  },
  subjectNoImage: {
    textAlign: 'center',
    marginLeft: '2rem',
    marginRight: '2rem',
  },
  subjectWithImage: {
    textAlign: 'left',
    marginLeft: 0,
    marginRight: 0,
    width: '90%',
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
