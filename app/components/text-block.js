// https://github.com/EnCiv/enciv-home/issues/7
// https://github.com/EnCiv/enciv-home/issues/34
// https://github.com/EnCiv/enciv-home/issues/44
import React from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import ActionButton from './action-button'
import MarkDown from 'markdown-to-jsx'
import * as icons from '../svgr'
import Block from './block'

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
  const classes = useStylesFromThemeFunction({ side })

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
      <Block mode={mode} className={className} {...otherProps}>
        <div className={cx(classes.textBlock, className)}>
          <div className={classes.wrapper}>{textSection}</div>
        </div>
      </Block>
    )
  }
  if (imgUrl) {
    return (
      <Block mode={mode} className={className} {...otherProps}>
        <div className={cx(classes.textBlock, className)}>
          <div className={classes.wrapper}>
            <div className={classes.innerWrapperImage}>
              <div className={side == 'left' ? classes.innerWrapperIconLeft : classes.innerWrapperIconRight}>
                {textSection}
                <div className={cx(classes.textBlockImage)}>
                  <img className={cx(classes.imageUrl)} src={imgUrl} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Block>
    )
  } else {
    return (
      <Block mode={mode} className={className} {...otherProps}>
        <div className={cx(classes.textBlock)}>
          <div className={classes.wrapper}>
            {/* Because we checked if side is either 'left' or 'right' already, we can infer 
           it's right if it's not left. */}
            <div className={side == 'left' ? classes.innerWrapperIconLeft : classes.innerWrapperIconRight}>
              {iconSection}
              {textSection}
            </div>
          </div>
        </div>
      </Block>
    )
  }
}
export default TextBlock

const useStylesFromThemeFunction = createUseStyles(theme => ({
  textBlock: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      flexDirection: 'column',
      marginLeft: '2rem',
      marginRight: '2rem',
    },
    [`@media (min-width: ${theme.condensedWidthBreakPoint}) and (max-width: ${theme.maxPanelWidth})`]: {
      marginLeft: '2rem',
      marginRight: '2rem',
    },
    [`@media (min-width: ${theme.maxPanelWidth})`]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: theme.maxPanelWidth,
    },
    '& p:first-child': {
      marginBlockStart: 0,
    },
    '& p:last-child': {
      marginBlockEnd: 0,
    },
  },
  textBlockImage: {
    flex: '1',
    textAlign: 'left',
    paddingRight: '2rem',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      marginTop: '2rem',
      paddingLeft: '2rem',
      paddingRight: '2rem',
      marginRight: 0,
    },
  },
  innerWrapperImage: {
    display: 'flex',
    alignItems: 'center',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      flexDirection: 'column',
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
    textAlign: 'left',
    flex: 1,
  },
  textSectionWithIcon: {
    width: '75%',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      width: '100%',
    },
  },
  iconSection: props => ({
    width: '25%',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      width: '100%',
      margin: 0,
      marginTop: '2.25rem',
    },
    marginRight: props.side === 'left' ? '2rem' : null,
    marginLeft: props.side === 'right' ? '2rem' : null,
  }),
  wrapper: {
    whiteSpace: 'pre-line',
    flex: '1',
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
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      textAlign: 'center',
    },
  },
  description: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '1.5rem',
    lineHeight: '2.25rem',
    leadingTrim: 'both',
    textEdge: 'cap',
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
    marginTop: '3rem',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      marginTop: 0,
      textAlign: 'center',
    },
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
