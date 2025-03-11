//https://github.com/EnCiv/enciv-home/issues/41
//https://github.com/EnCiv/enciv-home/issues/42
//https://github.com/EnCiv/enciv-home/issues/43
//https://github.com/EnCiv/enciv-home/issues/45
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

const MarkdownWithImage = props => {
  const { mode = 'light', children = '', lineWidth = 'partial', iconName = '', imgUrl = '', imgSide = 'top' } = props
  const classes = useStylesFromThemeFunction({ lineWidth, iconName, imgSide })

  const imageComponent = imgUrl ? (
    <div className={classes.imgFlexWrapper}>
      <div className={classes.imgBorderWrapper}>
        <img className={classes.imageStyle} src={imgUrl} alt="Markdown Block" />
      </div>
    </div>
  ) : iconName && icons[iconName] ? (
    <Iconify className={classes.headerIcon} iconName={iconName} width="25%" height="auto" />
  ) : null

  const textSection = (
    <MarkDown className={classes.mdclasses} options={{ overrides: { ActionButton: { component: ActionButton } } }}>
      {children}
    </MarkDown>
  )
  return (
    <div className={cx(classes.markdownBlock, classes[mode])}>
      <div className={classes.wrapperTopImg}>
        {imageComponent}
        {textSection}
      </div>
    </div>
  )
}

const MarkdownBlock = props => {
  console.log('props', props)
  const {
    className = '',
    mode = 'light',
    children = '',
    lineWidth = 'partial',
    iconName = '',
    imgUrl = '',
    imgSide = 'top',
    ...otherProps
  } = props
  const classes = useStylesFromThemeFunction({ lineWidth, iconName, imgSide })

  return (
    <Block mode={mode} className={className} {...otherProps}>
      <div className={cx(classes.markdownBlock, classes[mode], className)} {...otherProps}>
        <MarkdownWithImage
          mode={mode}
          iconName={iconName}
          imgUrl={imgUrl}
          imgSide={imgSide}
          children={children}
          {...otherProps}
        />
      </div>
    </Block>
  )
}

export default MarkdownBlock

const useStylesFromThemeFunction = createUseStyles(theme => ({
  markdownBlock: {
    textAlign: 'center',
  },
  imgFlexWrapper: {
    display: 'flex',
    objectFit: 'contain',
    flexBasis: '50%',
  },
  imgBorderWrapper: {
    borderRadius: '1rem',
    marginTop: 'auto',
    marginBottom: 'auto',
    height: 'fit-content',
    overflow: 'hidden',
  },
  markdownBlockTopImg: {
    textAlign: 'center',
    maxWidth: theme.maxPanelWidth,
    marginRight: 'auto',
    paddingBottom: '3rem',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      flexDirection: 'column',
      maxWidth: '100%',
    },
  },
  wrapperTopImg: props => ({
    display: 'flex',
    flexDirection: props.imgSide === 'top' ? 'column' : props.imgSide === 'left' ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
    gap: '2rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  }),

  wrapperWithImage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '2rem',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      flexDirection: 'column',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    maxWidth: theme.maxPanelWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    whiteSpace: 'pre-line',
  },
  imageStyle: {
    objectFit: 'contain',
    maxWidth: '100%',
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
    flex: 1,
    '& h2': {
      textAlign: 'left',
      fontSize: '3rem',
      lineHeight: '3.5rem',
      marginBlockStart: 0,
      marginBlockEnd: '2rem',
      '&:after': {
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
      marginBlockStart: 0,
      marginBlockEnd: 0,
    },
    '& h4': {
      textAlign: 'left',
      fontSize: '1.75rem',
      fontWeight: 600,
      marginBlockStart: 0,
      marginBlockEnd: 0,
    },
    '& h5': {
      textAlign: 'left',
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBlockStart: 0,
      marginBlockEnd: 0,
    },
    '& h6': {
      textAlign: 'left',
      fontSize: '1.25rem',
      marginBlockStart: 0,
      marginBlockEnd: 0,
    },
    '& p': {
      fontFamily: 'Inter',
      fontSize: '1rem',
      textAlign: 'left',
    },
    '& p:first-of-type': {
      marginTop: 0, //removes margin-top from first paragraph as per figma design in issue 43
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
    margin: 'auto',
  },
}))
