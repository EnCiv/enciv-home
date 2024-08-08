//https://github.com/EnCiv/enciv-home/issues/41
//https://github.com/EnCiv/enciv-home/issues/42
//https://github.com/EnCiv/enciv-home/issues/43
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
    mode = 'light', // dark, white, see top-nav-bar for differences
    children = '',
    lineWidth = 'full',
    iconName = '', //A string name corresponding to an svgr component.
    ...otherProps
  } = props
  const classes = useStylesFromThemeFunction({ lineWidth, iconName })

  // Checks if the icon exists in svgr that matches iconName
  const iconComponent = iconName && icons[iconName] && <Iconify className={classes.headerIcon} iconName={iconName} width="25%" height="auto" />

  const textSection = (
    <MarkDown className={classes.mdclasses} options={{ overrides: { ActionButton: { component: ActionButton } } }}>{children}</MarkDown>
  )

  if (iconName === ''){
    return (
    <div className={cx(classes.markdownBlock, classes[mode], className)} {...otherProps}>
      <div className={classes.wrapper}>
        {textSection}
      </div>
    </div>
    )
  } else {
    return(
      <div className={cx(classes.markdownBlock, classes[mode], className)} {...otherProps}>
        <div className={`${classes.wrapper}`}>
          {iconComponent}
          {textSection}
        </div>
      </div>
    )
  }
}
export default TextBlock

const useStylesFromThemeFunction = createUseStyles(theme => ({
  markdownBlock: {
    textAlign: 'center',
    paddingTop: '1rem',
    paddingBottom: '4rem',
  },
  wrapper: {
    maxWidth: theme.maxPanelWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    whiteSpace: 'pre-line',
  },
  mdclasses: props => ({
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '1.5rem',
    lineHeight: '2.25rem',
    leadingTrim: 'both',
    textEdge: 'cap',
    textAlign: 'center',
    marginLeft: '2rem',
    marginRight: '2rem',
    '& h2': {
      textAlign: 'left',
      fontSize: '3rem',
      lineHeight: '3.5rem',
      marginBlockEnd: '2rem',
      '&:after':{
        content: '""',
        display: 'block',
        width: props.lineWidth === 'partial' ? '5dvw' : '100%',
        borderBottom: `${theme.colors.encivYellow} 0.25rem solid`,
        paddingBottom: '1.5rem',
      },
    },
    '& h3': {
      textAlign: 'left',
      fontSize: '2rem',
      fontWeight: 600,
      marginBlockEnd: 0,
    },
    '& h4': {
      textAlign: 'left',
      fontSize: '1.75rem',
      fontWeight: 600,
      marginBlockEnd: 0,
    },
    '& h5': {
      textAlign: 'left',
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBlockEnd: 0,
    },
    '& h6': {
      textAlign: 'left',
      fontSize: '1.25rem',
      marginBlockEnd: 0,
    },
    '& p': {
      fontFamily: 'Inter',
      fontSize: '1rem',
      textAlign: 'left',
    },
    '& p:first-of-type':{
      marginTop: props.iconName === '' ? '1rem' : '0px', //removes margin-top from first paragraph as per figma design in issue 43
    },
    '& a': {
      color: '#B1890F',
    },
    '& a:visited': {
      color: '#413207',
    },
    '& hr': {
      display: 'block',
      borderTop: `${theme.colors.encivYellow} 0.125rem solid`,
      left: props.lineWidth === 'partial' ? 0 : 'auto',
      margin: props.lineWidth === 'partial' ? 'auto 0 auto 0' : 'auto',
      width: props.lineWidth === 'partial' ? '5dvw' : '100%',
    },
  }),
  dark: {
    backgroundColor: theme.colors.darkModeGray,
    color: 'white',
  },
  light: {
    backgroundColor: '#F2F2F2',
    color: theme.colors.darkModeGray,
  },
  headerIcon: {
    marginTop: '2rem', //adds margin-top to header icon to match spacing between subject and icon.
  }
}))
