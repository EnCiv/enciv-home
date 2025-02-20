import React from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'

// renders children within a div that spans the width of the viewport
// the background color of the div is defined by mode
// children will be rendered within a div, that is limited to maxPanwlWidth
// padding and margin will be applied so that there is the appropriate padding/margin on the left and right sides
// at different widths
//
export default function Block(props) {
  const { className, mode = 'dark', children, ...otherProps } = props
  const classes = useStylesFromThemeFunction()
  return (
    <div className={cx(classes.block, classes[mode], className)} {...otherProps}>
      <div className={classes.inner}>{children}</div>
    </div>
  )
}
const useStylesFromThemeFunction = createUseStyles(theme => ({
  block: {
    boxSizing: 'border-box',
    width: '100%',
    padding: '4rem 2rem',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      padding: '2rem 1rem',
    },
  },
  inner: {
    maxWidth: theme.maxPanelWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
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
