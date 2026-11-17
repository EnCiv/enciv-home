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
import { breakpoints } from '../theme'
import { getAnimatedHeadingStyles, getRevealTiming, titleRevealKeyframes, useRevealOnView } from './animated-heading'

function Iconify(props) {
  const { iconName, ...otherProps } = props
  const Icon = icons[iconName]
  return <Icon {...otherProps} />
}

function AnimatedMarkdownHeading({ as: Element = 'h2', className, children, ...otherProps }) {
  const { ref: headingRef, isVisible } = useRevealOnView()
  const headingClasses = useAnimatedHeadingStyles({ isVisible, ...getRevealTiming(children) })

  return (
    <Element ref={headingRef} className={cx(className, headingClasses.heading)} {...otherProps}>
      {children}
    </Element>
  )
}

function MarkdownFormLink({ mode = 'button', className, children, ...otherProps }) {
  const classes = useFormLinkStyles()
  const link = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === 'a')
  if (!link?.props.href) {
    return (
      <AnimatedMarkdownHeading as="h3" className={className} {...otherProps}>
        {children}
      </AnimatedMarkdownHeading>
    )
  }

  const label = link.props.children
  if (mode === 'dropdown') {
    return (
      <details className={cx(classes.dropdown, className)} {...otherProps}>
        <summary className={classes.summary}>
          <span>{label}</span>
          <span className={classes.toggleIcon} aria-hidden="true">
            +
          </span>
        </summary>
        <div className={classes.dropdownContent}>
          <a href={link.props.href} target="_blank" rel="noreferrer" className={classes.openLink}>
            Open form PDF
          </a>
        </div>
      </details>
    )
  }

  return (
    <a
      href={link.props.href}
      target="_blank"
      rel="noreferrer"
      className={cx(classes.button, className)}
      {...otherProps}
    >
      <span>{label}</span>
      <span className={classes.openLabel}>Open PDF</span>
    </a>
  )
}

const MarkdownWithImage = props => {
  const {
    mode = 'light',
    children = '',
    lineWidth = 'partial',
    iconName = '',
    imgUrl = '',
    imgSide = 'top',
    styleVariant = 'home',
    formLinkMode,
  } = props
  const classes = useStylesFromThemeFunction({ lineWidth, iconName, imgSide, styleVariant })

  const imageComponent = imgUrl ? (
    <div className={classes.imgFlexWrapper}>
      <div className={classes.imgBorderWrapper}>
        <img className={classes.imageStyle} src={imgUrl} alt="Markdown Block" />
      </div>
    </div>
  ) : iconName && icons[iconName] ? (
    <Iconify className={classes.headerIcon} iconName={iconName} width="25%" />
  ) : null

  const overrides = {
    ActionButton: { component: ActionButton },
    ...(styleVariant === 'home'
      ? {
          h2: {
            component: AnimatedMarkdownHeading,
            props: { style: { fontFamily: 'Newsreader, serif' } },
          },
          h3: formLinkMode
            ? { component: MarkdownFormLink, props: { mode: formLinkMode } }
            : { component: AnimatedMarkdownHeading, props: { as: 'h3' } },
        }
      : {}),
  }
  const textSection = (
    <MarkDown className={classes.mdclasses} options={{ overrides }}>
      {children}
    </MarkDown>
  )
  return (
    <div
      className={cx(
        classes.markdownBlock,
        styleVariant === 'home' ? classes.homepageMarkdown : classes[mode]
      )}
    >
      <div className={classes.wrapperTopImg}>
        {imageComponent}
        {textSection}
      </div>
    </div>
  )
}

const MarkdownBlock = props => {
  const {
    className = '',
    mode = 'light',
    children = '',
    lineWidth = 'partial',
    iconName = '',
    imgUrl = '',
    imgSide = 'top',
    styleVariant = 'home',
    formLinkMode,
    ...otherProps
  } = props
  const classes = useStylesFromThemeFunction({ lineWidth, iconName, imgSide, styleVariant })

  return (
    <Block
      mode={mode}
      className={cx(styleVariant === 'home' && classes.homepageBlock, className)}
      {...otherProps}
    >
      <div
        className={cx(
          classes.markdownBlock,
          styleVariant === 'home' ? classes.homepageMarkdown : classes[mode],
          className
        )}
        {...otherProps}
      >
        <MarkdownWithImage
          mode={mode}
          iconName={iconName}
          imgUrl={imgUrl}
          imgSide={imgSide}
          styleVariant={styleVariant}
          formLinkMode={formLinkMode}
          children={children}
          {...otherProps}
        />
      </div>
    </Block>
  )
}

export default MarkdownBlock

const useStylesFromThemeFunction = createUseStyles(theme => ({
  markdownBlock: props => ({ textAlign: props.styleVariant === 'home' ? 'left' : 'center' }),
  homepageBlock: {
    '&&': {
      backgroundColor: '#fafaf9',
      color: '#80664a',
      borderTop: '1px solid #e6e1d9',
      padding: '5.25rem 2rem 8rem',
      [`@media (max-width: ${breakpoints.tablet})`]: {
        padding: '4rem 1.5rem 5rem',
      },
    },
  },
  homepageMarkdown: {
    backgroundColor: 'transparent',
    color: '#80664a',
    textAlign: 'left',
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
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '1.5rem',
    lineHeight: '2.25rem',
    leadingTrim: 'both',
    textEdge: 'cap',
    textAlign: 'center',
    flex: 1,
    '& h1': {
      fontFamily: 'Newsreader, serif',
    },
    '& h2': {
      fontFamily: 'Newsreader, serif',
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
      fontFamily: 'Newsreader, serif',
      textAlign: 'left',
      fontSize: '2rem',
      fontWeight: 600,
      marginBlockStart: 0,
      marginBlockEnd: 0,
    },
    '& h4': {
      fontFamily: 'Newsreader, serif',
      textAlign: 'left',
      fontSize: '1.75rem',
      fontWeight: 600,
      marginBlockStart: 0,
      marginBlockEnd: 0,
    },
    '& h5': {
      fontFamily: 'Newsreader, serif',
      textAlign: 'left',
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBlockStart: 0,
      marginBlockEnd: 0,
    },
    '& h6': {
      fontFamily: 'Newsreader, serif',
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
    ...(props.styleVariant === 'home'
      ? {
          color: '#80664a',
          fontSize: '1.375rem',
          lineHeight: 1.6,
          textAlign: 'left',
          '& h2': {
            color: '#80664a',
            fontSize: '3.4375rem',
            fontWeight: 400,
            lineHeight: 1.1,
            textAlign: 'center',
            margin: '0 auto 3rem',
            '&::after': {
              content: '""',
              display: 'block',
              width: '1.25rem',
              height: '0.125rem',
              backgroundColor: '#FF9114',
              margin: '2rem auto 0',
            },
          },
          '& h3': {
            color: '#80664a',
            fontSize: '2.625rem',
            fontWeight: 400,
            lineHeight: 1.15,
            textAlign: 'left',
            margin: '4rem 0 1.5rem',
            paddingTop: '3rem',
            borderTop: '1px solid #e6e1d9',
          },
          '& p': {
            fontSize: '1.375rem',
            lineHeight: 1.6,
            textAlign: 'left',
          },
          '& a': {
            color: '#9b5b13',
            fontWeight: 600,
          },
          [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
            '& h2': {
              fontSize: '2.5rem',
              marginBottom: '2rem',
            },
            '& h3': {
              fontSize: '2.125rem',
              marginTop: '3rem',
              paddingTop: '2.5rem',
            },
          },
        }
      : {}),
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

const useFormLinkStyles = createUseStyles(theme => ({
  button: {
    display: 'flex',
    width: '100%',
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    padding: '1.375rem 1.5rem',
    marginBottom: '0.875rem',
    border: '1px solid rgba(64, 54, 46, 0.12)',
    borderRadius: '0.5rem',
    backgroundColor: '#fff',
    boxShadow: '0 0.25rem 1rem rgba(42, 34, 27, 0.06)',
    color: theme.colors.textBrown,
    fontFamily: 'Newsreader, serif',
    fontSize: '1.5rem',
    fontWeight: 500,
    lineHeight: 1.3,
    textAlign: 'left',
    textDecoration: 'none',
    transition: 'box-shadow 250ms ease, border-color 250ms ease, color 200ms ease',
    '&:hover': {
      borderColor: 'rgba(190, 132, 28, 0.42)',
      boxShadow: '0 0.75rem 1.75rem rgba(42, 34, 27, 0.12)',
      color: '#9a6412',
    },
    '&:focus-visible': {
      outline: `0.125rem solid ${theme.colors.encivYellow}`,
      outlineOffset: '-0.25rem',
    },
    [`@media (max-width: ${breakpoints.tablet})`]: {
      padding: '1.125rem 1rem',
      fontSize: '1.25rem',
    },
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
  openLabel: {
    flex: '0 0 auto',
    color: '#80664a',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.875rem',
    fontWeight: 600,
  },
  dropdown: {
    marginBottom: '0.875rem',
    overflow: 'hidden',
    border: '1px solid rgba(64, 54, 46, 0.12)',
    borderRadius: '0.5rem',
    backgroundColor: '#fff',
    boxShadow: '0 0.25rem 1rem rgba(42, 34, 27, 0.06)',
    '&[open]': {
      borderColor: 'rgba(190, 132, 28, 0.42)',
      boxShadow: '0 0.75rem 1.75rem rgba(42, 34, 27, 0.12)',
    },
  },
  summary: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    padding: '1.375rem 1.5rem',
    color: theme.colors.textBrown,
    fontFamily: 'Newsreader, serif',
    fontSize: '1.5rem',
    fontWeight: 500,
    lineHeight: 1.3,
    listStyle: 'none',
    cursor: 'pointer',
    '&::-webkit-details-marker': {
      display: 'none',
    },
    '&:focus-visible': {
      outline: `0.125rem solid ${theme.colors.encivYellow}`,
      outlineOffset: '-0.25rem',
    },
    [`@media (max-width: ${breakpoints.tablet})`]: {
      padding: '1.125rem 1rem',
      fontSize: '1.25rem',
    },
  },
  toggleIcon: {
    display: 'grid',
    placeItems: 'center',
    flex: '0 0 2.25rem',
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: '50%',
    backgroundColor: theme.colors.encivYellow,
    color: theme.colors.darkModeGray,
    fontFamily: 'Inter, sans-serif',
    fontSize: '1.5rem',
    fontWeight: 400,
    lineHeight: 1,
  },
  dropdownContent: {
    padding: '0 1.5rem 1.5rem',
  },
  openLink: {
    color: '#9b5b13',
    fontFamily: 'Inter, sans-serif',
    fontSize: '1rem',
    fontWeight: 600,
  },
}))

const useAnimatedHeadingStyles = createUseStyles({
  heading: props => getAnimatedHeadingStyles(props),
  ...titleRevealKeyframes,
})
