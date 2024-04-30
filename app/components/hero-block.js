//https://github.com/EnCiv/enciv-home/issues/5
import React, { useState, useLayoutEffect, useRef, useEffect, useCallback } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import ActionButton from './action-button'

const startFontSize = 4
const maxSubjectWidthRatio = 0.9 // maximum width for the subject text as a percent of the screen width

const HeroBlock = props => {
  const {
    className = '', // may or may not be passed. Should be applied to the outer most tag, after local classNames
    imgUrl = '',
    subject = '',
    subjectStyle = {},
    actionText = 'Join the community',
    action = '',
    actionStyle = {},
    ...otherProps
  } = props
  const classes = useStylesFromThemeFunction()
  const [fontSize, setFontSize] = useState(startFontSize)
  const outerRef = useRef(null)
  const innerRef = useRef(null)

  const [resized, setResized] = useState(0)

  useEffect(() => {
    // trick is that onResize will only get created once, and will only see the value of resized once
    // but count becomes a static variable that onResize can keepp incrementing so setResize can force a rerender
    var count = resized
    function onResize() {
      setResized(++count)
    }
    window.addEventListener('resize', onResize)
    document.fonts.addEventListener('loadingdone', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      document.fonts.removeEventListener('loadingdone', onResize)
    }
  }, [])

  useLayoutEffect(() => {
    const outerRect = outerRef.current.getBoundingClientRect()
    const innerRect = innerRef.current.getBoundingClientRect()
    const calcFontSize = () => {
      return Math.floor(fontSize * ((outerRect.width * maxSubjectWidthRatio) / innerRect.width) * 100) / 100
    }
    if (innerRect.width > outerRect.width * maxSubjectWidthRatio) {
      const newFontSize = calcFontSize()
      if (Math.abs(newFontSize - fontSize) > 0.02) {
        setFontSize(newFontSize)
      }
    }
    if (innerRect.width < outerRect.width * maxSubjectWidthRatio && fontSize < startFontSize) {
      const newFontSize = Math.min(calcFontSize(), startFontSize)
      if (Math.abs(newFontSize - fontSize) > 0.02) {
        setFontSize(newFontSize)
      }
    }
  }, [resized])

  return (
    <div className={cx(classes.heroBlock, className)} style={{ backgroundImage: `url(\"${imgUrl}\")` }} {...otherProps}>
      <div className={classes.subjectWrapper} ref={outerRef}>
        <div className={classes.subject} style={{ ...subjectStyle, fontSize: fontSize + 'rem' }} ref={innerRef}>
          <h1 className={classes.subjectText}>{subject}</h1>
        </div>
      </div>
      {actionText && (
        <div className={classes.actionWrapper}>
          <ActionButton className={classes.action} style={actionStyle}>
            {actionText}
          </ActionButton>
        </div>
      )}
    </div>
  )
}
export default HeroBlock

const HEIGHT = '30vw'
const useStylesFromThemeFunction = createUseStyles(theme => ({
  heroBlock: {
    width: '100%', // using vw makes the div a tiny bit wider than the viewport causing a scrollbar I suspect roundoff
    height: HEIGHT, // yes vw becuase its a 16:9 of the width
    backgroundSize: 'cover',
    position: 'relative',
    boxSizing: 'border-box',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      height: '100vw',
    },
  },
  subjectWrapper: {
    position: 'absolute',
    top: '50%',
    trnasform: 'translateY(-50%)',
    textAlign: 'center',
    width: '100%',
  },
  subject: {
    backgroundColor: 'rgba(255,255,255,0.75)',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    boxSizing: 'border-box',
    display: 'inline-block',
  },
  subjectText: {
    fontSize: '1em', // override the default H1
    textWrap: 'nowrap',
    display: 'inline',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 800,
    lineHeight: '1.2em',
  },
  actionWrapper: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    top: '85%',
    transform: 'translateY(-50%)',
  },
  action: {},
}))
