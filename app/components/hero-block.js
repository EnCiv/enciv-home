//https://github.com/EnCiv/enciv-home/issues/5
import React, { useState, useLayoutEffect, useRef, useEffect, useCallback } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import ActionButton from './action-button'
import { useMediaQuery } from '@react-hook/media-query'
import { theme } from 'civil-pursuit'

const startFontSize = 4
const maxSubjectWidthRatio = 0.9 // maximum width for the subject text as a percent of the screen width

const HeroBlock = props => {
  const {
    className = '', // may or may not be passed. Should be applied to the outer most tag, after local classNames
    alignContent = 'center',
    imgUrl = '',
    imgUrlObj = {},
    subject = '',
    subjectStyle = {},
    actionText,
    action,
    actionStyle = {},
    ...otherProps
  } = props

  const classes = useStylesFromThemeFunction({ ...props, alignContent })
  const [fontSize, setFontSize] = useState(startFontSize)
  const outerRef = useRef(null)
  const innerRef = useRef(null)

  const [resized, setResized] = useState(0)

  // importing theme works as expected on server side, but on browser side getting {Components,theme,__esModule:true}
  const themeFix = theme.theme || theme

  const use2lines = useMediaQuery(`(max-width: ${themeFix.condensedWidthBreakPoint})`)

  const subjectLines = use2lines ? subject.split('-').map(line => line.trim()) : [subject]

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
    <div className={cx(classes.heroBlock, className)} {...otherProps}>
      <div className={classes.subjectWrapper} ref={outerRef}>
        <div className={classes.subject} style={{ ...subjectStyle, fontSize: fontSize + 'rem' }} ref={innerRef}>
          {subjectLines.map(line => (
            <h1 className={classes.subjectText}>{line}</h1>
          ))}
        </div>
      </div>
      {actionText && (
        <div className={classes.actionWrapper}>
          <ActionButton action={action} className={classes.action} style={actionStyle}>
            {actionText}
          </ActionButton>
        </div>
      )}
    </div>
  )
}
export default HeroBlock

const HEIGHT = '30vw' // yes vw becuase its a 16:9 of the width
const useStylesFromThemeFunction = createUseStyles(theme => ({
  heroBlock: props => ({
    backgroundImage: `url(\"${props.imgUrlObj?.highRes || props.imgUrl}\")`,
    width: '100%', // using vw makes the div a tiny bit wider than the viewport causing a scrollbar I suspect roundoff
    height: HEIGHT,
    backgroundSize: 'cover',
    position: 'relative',
    boxSizing: 'border-box',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      backgroundImage: `url(\"${props.imgUrlObj?.lowRes || props.imgUrl}\")`,
      height: '64vw',
    },
  }),

  subjectWrapper: props => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    textAlign: props.alignContent,
    width: props.alignContent === 'center' ? '100%' : 'calc(100% - 4rem)', // subtract left and right padding
    ...(props.alignContent !== 'center' && {
      maxWidth: theme.maxPanelWidth,
      paddingLeft: '2rem',
      paddingRight: '2rem',
      margin: '0 auto',
    }),
  }),

  subject: {
    boxSizing: 'border-box',
    display: 'inline-block',
  },
  subjectText: {
    fontSize: '1em', // override the default H1
    textWrap: 'nowrap',
    display: 'block',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 800,
    lineHeight: '1.2em',
    marginBlockStart: 0,
    marginBlockEnd: 0,
    backgroundColor: 'rgba(255,255,255,0.75)',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    '&:not(:last-child)': {
      marginBottom: '1em',
    },
    borderRadius: '0.5rem',
  },
  actionWrapper: props => ({
    position: 'absolute',
    top: '85%',
    left: props.alignContent === 'center' ? '50%' : '0',
    transform: props.alignContent === 'center' ? 'translate(-50%, -50%)' : 'translateY(-50%)',
    textAlign: props.alignContent,
    width: props.alignContent === 'center' ? 'auto' : '100%',
    maxWidth: theme.maxPanelWidth,
    ...(props.alignContent !== 'center' && {
      paddingLeft: '2rem',
      paddingRight: '2rem',
    }),
  }),

  action: {},
}))
