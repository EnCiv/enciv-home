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
  const {
    className = '',
    subject = '',
    mode = 'light',
    children = '',
    lineWidth = 'partial',
    iconName = '',
    imgUrl = '',
    imgSide = 'left',
    ...otherProps
  } = props
  const classes = useStylesFromThemeFunction({ lineWidth, iconName, imgSide })
  const isSideImage = imgSide === 'left' || imgSide === 'right'
  const isTopImage = imgSide === 'top'
  const iconComponent = iconName && icons[iconName] && (
    <Iconify className={classes.headerIcon} iconName={iconName} width="25%" height="auto" />
  )

  const imageComponent = imgUrl && (
    <img className={isSideImage ? classes.imageStyleSide : classes.imageStyleTop} src={imgUrl} alt="Markdown Block" />
  )

  const textSection = (
    <MarkDown className={classes.mdclasses} options={{ overrides: { ActionButton: { component: ActionButton } } }}>
      {children}
    </MarkDown>
  )
  if (imgUrl && imgSide) {
    return (
      <div
        className={cx(isSideImage ? classes.markdownBlock : classes.markdownBlockTopImg, classes[mode], className)}
        {...otherProps}
      >
        {imgUrl && isTopImage && (
          <div className={cx(classes.wrapperTopImg, classes.topLayout)}>
            {imageComponent}
            {textSection}
          </div>
        )}
        <div className={isSideImage ? classes.sideWrapper : classes.fullWrapper}>
          {imgUrl && isSideImage && (
            <div className={classes.wrapperWithImage}>
              {imgSide === 'left' && imageComponent}
              {textSection}
              {imgSide === 'right' && imageComponent}
            </div>
          )}
        </div>
      </div>
    )
  }
  return (
    <div className={cx(classes.markdownBlock, classes[mode], className)} {...otherProps}>
      <div className={classes.wrapperWithImage}>{textSection}</div>
    </div>
  )
}

const MarkdownBlock = props => {
  console.log('props', props)
  const {
    className = '',
    subject = '',
    mode = 'light',
    children = '',
    lineWidth = 'partial',
    iconName = '',
    imgUrl = '',
    imgSide = 'left',
    ...otherProps
  } = props
  const classes = useStylesFromThemeFunction({ lineWidth, iconName, imgSide })

  return (
    <Block mode={mode} className={className} {...otherProps}>
      <div className={cx(classes.markdownBlock, classes[mode], className)} {...otherProps}>
        {subject && <h2 className={classes.subject}>{subject}</h2>}
        <MarkdownWithImage mode={mode} imgUrl={imgUrl} imgSide={imgSide} children={children} {...otherProps} />
      </div>
    </Block>
  )
}

export default MarkdownBlock

const useStylesFromThemeFunction = createUseStyles(theme => ({
  markdownBlock: {
    textAlign: 'center',
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
  sideWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fullWrapper: {
    display: 'block',
  },
  wrapperTopImg: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 'auto',
    marginRight: 'auto',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      flexDirection: 'column',
      justifyContent: 'center',
      //maxWidth: '80%',
    },
  },

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
  subject: {
    fontSize: '2rem',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 700,
    textAlign: 'left',
    maxWidth: theme.maxPanelWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 0,
  },
  imageStyleSide: {
    aspectRatio: 2 / 2,
    width: '50%',
    objectFit: 'unset',
    borderRadius: '1rem',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      width: '100%',
    },
  },
  imageStyleTop: {
    aspectRatio: 2 / 2,
    objectFit: 'cover',
    borderRadius: '1rem',
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
      lineHeight: '3.5rem',
      fontWeight: 600,
      marginBlockStart: 0,
      marginBlockEnd: 0,
      '&:after': {
        content: '""',
        display: 'block',
        width: props.lineWidth === 'partial' ? '5dvw' : '100%',
        borderBottom: `${theme.colors.encivYellow} 0.25rem solid`,
        paddingBottom: '1.5rem',
      },
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
  headerIcon: {
    marginTop: '2rem', //adds margin-top to header icon to match spacing between subject and icon.
  },
  dark: {
    backgroundColor: theme.colors.darkModeGray,
    color: 'white',
  },
  light: {
    backgroundColor: '#F2F2F2',
    color: theme.colors.darkModeGray,
  },
}))
