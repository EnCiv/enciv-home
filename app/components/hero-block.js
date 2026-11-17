//https://github.com/EnCiv/enciv-home/issues/5
import React, { useState, useLayoutEffect, useRef, useEffect, useCallback } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import ActionButton from './action-button'
import { useMediaQuery } from '@react-hook/media-query'
import { theme } from 'civil-pursuit'

const startFontSize = 4
const maxSubjectWidthRatio = 0.9 // maximum width for the subject text as a percent of the screen width
const homepageHeroOverlay = 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 45.874%, rgba(0, 0, 0, 0.81) 98.821%)'

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
    secondaryActionText,
    secondaryAction,
    actionStyle = {},
    variant = 'default',
    ...otherProps
  } = props

  const [isSubjectVisible, setIsSubjectVisible] = useState(false)
  const subjectCharacterCount = Math.max(Array.from(subject).length, 1)
  const subjectRevealDuration = Math.min(2.4, Math.max(0.9, subjectCharacterCount * 0.03))
  const classes = useStylesFromThemeFunction({
    ...props,
    alignContent,
    isSubjectVisible,
    subjectCharacterCount,
    subjectRevealDuration,
  })
  const baseFontSize = variant === 'homepage' ? 4.6875 : startFontSize
  const [fontSize, setFontSize] = useState(baseFontSize)
  const outerRef = useRef(null)
  const innerRef = useRef(null)

  const [resized, setResized] = useState(0)

  // importing theme works as expected on server side, but on browser side getting {Components,theme,__esModule:true}
  const themeFix = theme.theme || theme

  const use2lines = useMediaQuery(`(max-width: ${themeFix.condensedWidthBreakPoint})`)

  const subjectLines = subject
    .split(/\r?\n/)
    .flatMap(line => (use2lines ? line.split('-') : [line]))
    .map(line => line.trim())
  const heroImage = imgUrlObj?.highRes || imgUrl
  const mobileHeroImage = imgUrlObj?.lowRes || heroImage

  useEffect(() => {
    if (variant !== 'homepage' || !outerRef.current) return
    if (!('IntersectionObserver' in window)) {
      setIsSubjectVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSubjectVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(outerRef.current)
    return () => observer.disconnect()
  }, [variant])

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
    if (innerRect.width < outerRect.width * maxSubjectWidthRatio && fontSize < baseFontSize) {
      const newFontSize = Math.min(calcFontSize(), baseFontSize)
      if (Math.abs(newFontSize - fontSize) > 0.02) {
        setFontSize(newFontSize)
      }
    }
  }, [resized])

  return (
    <div className={cx(classes.heroBlock, className)} {...otherProps}>
      {variant === 'homepage' && heroImage && (
        <picture className={classes.heroPicture}>
          <source media={`(max-width: ${themeFix.condensedWidthBreakPoint})`} srcSet={mobileHeroImage} />
          <img
            className={classes.heroImage}
            src={heroImage}
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      )}
      <div className={classes.subjectWrapper} ref={outerRef}>
        <div className={classes.subject} style={{ ...subjectStyle, fontSize: fontSize + 'rem' }} ref={innerRef}>
          {subjectLines.map((line, index) => (
            <h1 className={classes.subjectText} key={`${line}-${index}`}>
              {line}
            </h1>
          ))}
        </div>
      </div>
      {(actionText || secondaryActionText) && (
        <div className={classes.actionWrapper}>
          {actionText && (
            <ActionButton action={action} className={classes.action} style={actionStyle}>
              {actionText}
            </ActionButton>
          )}
          {secondaryActionText && (
            <ActionButton action={secondaryAction} mode="transparent" className={classes.secondaryAction}>
              {secondaryActionText}
            </ActionButton>
          )}
        </div>
      )}
    </div>
  )
}
export default HeroBlock

const useStylesFromThemeFunction = createUseStyles(theme => ({
  heroBlock: props => ({
    width: '100%', // using vw makes the div a tiny bit wider than the viewport causing a scrollbar I suspect roundoff
    aspectRatio: props.variant === 'homepage' ? '1446 / 922' : '1.56 / 1',
    backgroundColor: '#171717',
    position: 'relative',
    boxSizing: 'border-box',
    overflow: 'hidden',
    isolation: 'isolate',
    ...(props.variant === 'homepage'
      ? {
          '&:hover $heroImage': {
            transform: 'scale(1.04)',
          },
          '&:hover $heroPicture::after': {
            boxShadow: 'inset 0 0 1.75rem rgba(0, 0, 0, 0.34)',
          },
        }
      : {}),
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: '-0.25rem',
      backgroundImage:
        props.variant === 'homepage'
          ? homepageHeroOverlay
          : `url(\"${props.imgUrlObj?.highRes || props.imgUrl}\")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transform: props.variant === 'homepage' ? 'none' : 'scale(1.02)',
      boxShadow: 'inset 0 0 0 rgba(255, 255, 255, 0)',
      transition: 'box-shadow 450ms ease, transform 450ms ease',
      zIndex: props.variant === 'homepage' ? 1 : 0,
      pointerEvents: 'none',
    },
    ...(props.variant === 'homepage'
      ? {}
      : {
          '&:hover::before': {
            transform: 'scale(1.04)',
            boxShadow: 'inset 0 0 3rem rgba(255, 255, 255, 0.14)',
          },
        }),
    '& > *': {
      zIndex: 2,
    },
    '& > picture': {
      zIndex: 0,
    },
    '@media (prefers-reduced-motion: reduce)': {
      '&::before': {
        transition: 'none',
      },
      ...(props.variant === 'homepage'
        ? {
            '& $heroImage': {
              transition: 'none',
              transform: 'none',
            },
            '& $heroPicture::after': {
              transition: 'none',
            },
          }
        : {}),
    },
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      '&::before': {
        backgroundImage:
          props.variant === 'homepage'
            ? homepageHeroOverlay
            : `url(\"${props.imgUrlObj?.lowRes || props.imgUrl}\")`,
      },
    },
    ...(props.variant === 'homepage'
      ? {
          '@media (max-width: 42rem)': {
            aspectRatio: '1.05 / 1',
          },
        }
      : {}),
  }),

  heroPicture: {
    position: 'absolute',
    inset: 0,
    display: 'block',
    pointerEvents: 'none',
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      boxShadow: 'inset 0 0 0.75rem rgba(0, 0, 0, 0.2)',
      transition: 'box-shadow 350ms ease',
    },
  },
  heroImage: {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    transform: 'scale(1)',
    transition: 'transform 650ms cubic-bezier(0.2, 0.7, 0.2, 1)',
  },

  subjectWrapper: props => ({
    position: 'absolute',
    left: props.variant === 'homepage' ? '7.19%' : 0,
    right: props.variant === 'homepage' ? '36.45%' : 0,
    bottom:
      props.variant === 'homepage'
        ? '19.52%'
        : props.actionText || props.secondaryActionText
          ? '6rem'
          : '2rem',
    boxSizing: 'border-box',
    width: props.variant === 'homepage' ? 'auto' : '100%',
    maxWidth: props.variant === 'homepage' ? 'none' : theme.maxPanelWidth,
    paddingLeft: props.variant === 'homepage' ? 0 : '2rem',
    paddingRight: props.variant === 'homepage' ? 0 : '2rem',
    margin: props.variant === 'homepage' ? 0 : '0 auto',
    textAlign: 'left',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      bottom:
        props.variant === 'homepage'
          ? '19.52%'
          : props.actionText || props.secondaryActionText
            ? '5.5rem'
            : '1.25rem',
      width: props.variant === 'homepage' ? 'auto' : '100%',
      paddingLeft: props.variant === 'homepage' ? 0 : '1rem',
      paddingRight: props.variant === 'homepage' ? 0 : '1rem',
    },
  }),

  subject: props => ({
    boxSizing: 'border-box',
    display: 'inline-block',
    opacity: props.variant === 'homepage' && !props.isSubjectVisible ? 0 : 1,
    clipPath: props.variant === 'homepage' && props.isSubjectVisible ? 'inset(0)' : 'none',
    animation:
      props.variant === 'homepage' && props.isSubjectVisible
        ? `$heroTitleFade 600ms ease-out both, $heroTitleType ${props.subjectRevealDuration}s steps(${props.subjectCharacterCount}, end) both`
        : 'none',
    '@media (prefers-reduced-motion: reduce)': {
      opacity: 1,
      clipPath: 'none',
      animation: 'none',
    },
  }),
  subjectText: {
    fontSize: '1em', // override the default H1
    textWrap: 'nowrap',
    display: 'block',
    fontFamily: 'Newsreader, serif',
    fontStyle: 'normal',
    fontWeight: props => (props.variant === 'homepage' ? 600 : 800),
    lineHeight: props => (props.variant === 'homepage' ? '1.0667em' : '1.2em'),
    color: props => (props.variant === 'homepage' ? '#FBBC0D' : '#FFC315'),
    textShadow: props =>
      props.variant === 'homepage'
        ? '0 0.125rem 0.25rem rgba(0, 0, 0, 0.55)'
        : '0 0.125rem 0.25rem rgba(0, 0, 0, 0.9), 0 0.25rem 1rem rgba(0, 0, 0, 0.55)',
    marginBlockStart: 0,
    marginBlockEnd: 0,
    '&:not(:last-child)': {
      marginBottom: '0.2em',
    },
  },
  actionWrapper: props => ({
    position: 'absolute',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: props.variant === 'homepage' ? '1.25rem' : '0.75rem',
    left: props.variant === 'homepage' ? '7.61%' : 0,
    right: props.variant === 'homepage' ? 'auto' : 0,
    bottom: props.variant === 'homepage' ? '9.44%' : '2rem',
    textAlign: 'left',
    width: props.variant === 'homepage' ? 'auto' : 'calc(100% - 4rem)',
    maxWidth: props.variant === 'homepage' ? 'none' : theme.maxPanelWidth,
    margin: props.variant === 'homepage' ? 0 : '0 auto',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      width: props.variant === 'homepage' ? 'auto' : 'calc(100% - 2rem)',
      bottom: props.variant === 'homepage' ? '9.44%' : '1.25rem',
      gap: props.variant === 'homepage' ? '0.75rem' : '0.5rem',
    },
    ...(props.variant === 'homepage'
      ? {
          '@media (max-width: 42rem)': {
            width: 'calc(100% - 2rem)',
            left: '1rem',
            flexWrap: 'wrap',
            bottom: '1rem',
          },
        }
      : {}),
  }),

  action: props =>
    props.variant === 'homepage'
      ? {
          padding: '1.125rem 1.5625rem',
          fontWeight: 600,
          borderRadius: '1.75rem',
          boxShadow: '0 0.25rem 0.125rem rgba(0, 0, 0, 0.25)',
        }
      : {},
  secondaryAction: props =>
    props.variant === 'homepage'
      ? {
          padding: '1.125rem 1.5625rem',
          fontWeight: 600,
          border: '1px solid #FFE8BE',
          borderRadius: '1.75rem',
          backgroundColor: 'rgba(177, 137, 15, 0.18)',
          boxShadow: '0 0.25rem 0.25rem rgba(0, 0, 0, 0.25)',
        }
      : {},
  '@keyframes heroTitleFade': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  '@keyframes heroTitleType': {
    from: { clipPath: 'inset(0 100% 0 0)' },
    to: { clipPath: 'inset(0)' },
  },
}))
