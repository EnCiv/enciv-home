// https://github.com/EnCiv/enciv-home/issues/77

import React, { useState, useLayoutEffect, useRef, useEffect, useCallback } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import ActionButton from './action-button'

const DiscussionBlock = props => {
  const { className = '', imgUrl = '', subject = '', discussionUrl = '', ...otherProps } = props

  const classes = useStylesFromThemeFunction(props)
  return (
    <div className={cx(classes.heroBlock, className)} {...otherProps}>
      <div className={cx(classes.wrapper)}>
        <div className={classes.subjectWrapper}>
          <div className={classes.subject}>{subject}</div>
        </div>
        <div className={classes.actionWrapper}>
          <ActionButton action={discussionUrl} className={classes.discussion}>
            Start Discussion
          </ActionButton>
          <ActionButton
            action={'https://enciv.org/our-tools#Civil_Pursuit'}
            className={classes.learnMore}
            mode="transparent"
          >
            Learn More
          </ActionButton>
        </div>
      </div>
    </div>
  )
}
export default DiscussionBlock

const HEIGHT = '59vw'
const useStylesFromThemeFunction = createUseStyles(theme => ({
  heroBlock: props => ({
    backgroundImage: `url(\"${props.imgUrlObj?.highRes || props.imgUrl}\")`,
    width: '100%',
    height: HEIGHT,
    backgroundSize: 'cover',
    position: 'relative',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      backgroundImage: `url(\"${props.imgUrl}\")`,
      display: 'block',
      alignItems: 'center',
      padding: '5rem',
    },
  }),
  wrapper: {
    maxWidth: theme.maxPanelWidth,
    paddingLeft: '6.5rem',
    paddingBottom: '5rem',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      textAlign: 'center',
      paddingLeft: '0rem',
    },
  },
  subjectWrapper: {
    marginBottom: '2.5rem',
  },
  subject: {
    fontFamily: 'Newsreader',
    fontWeight: 600,
    fontStyle: 'SemiBold',
    fontSize: 'clamp(2rem, 5vw, 4.6875rem)',
    lineHeight: 'clamp(2.5rem, 5.5vw, 5rem)',
    color: '#F9DCA4',
  },
  actionWrapper: {
    gap: '1.25rem',
    display: 'flex',
  },
  discussion: {
    backgroundColor: '#FFC315',
    paddingTop: '0.75rem',
    paddingBottom: '0.75rem',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    fontWeight: 600,
  },
  learnMore: {
    backgroundColor: '#B1890F2E',
    paddingTop: '0.75rem',
    paddingBottom: '0.75rem',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    fontWeight: 600,
  },
}))
