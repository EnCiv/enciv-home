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
  const heroRef = useRef(null)
  const heroImageRef = useRef(null)
  const outerRef = useRef(null)
  const innerRef = useRef(null)

  const [resized, setResized] = useState(0)

  // importing theme works as expected on server side, but on browser side getting {Components,theme,__esModule:true}
  const themeFix = theme.theme || theme

  const use2lines = useMediaQuery(`(max-width: ${themeFix.condensedWidthBreakPoint})`)
  const isMobileHero = useMediaQuery('(max-width: 42rem)')
  const baseFontSize = variant === 'homepage' ? (isMobileHero ? 3.5 : 4.6875) : startFontSize
  const [fontSize, setFontSize] = useState(baseFontSize)

  const subjectLines = subject
    .split(/\r?\n/)
    .flatMap(line => (use2lines ? line.split('-') : [line]))
    .map(line => line.trim())
  const heroImage = imgUrlObj?.highRes || imgUrl
  const mobileHeroImage = imgUrlObj?.lowRes || heroImage

  const scrollToSubject = () => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    innerRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' })
  }

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
    if (variant !== 'homepage' || isSubjectVisible || !heroRef.current || !heroImageRef.current) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    let frameId = 0
    const updateParallax = () => {
      frameId = 0
      const heroRect = heroRef.current?.getBoundingClientRect()
      const subjectRect = outerRef.current?.getBoundingClientRect()
      if (!heroRect || !subjectRect || !heroImageRef.current) return
      const scrollEnd = window.scrollY + subjectRect.top - window.innerHeight * 0.75
      const scrollStart = scrollEnd - Math.min(heroRect.height * 0.4, 360)
      const progress = Math.min(1, Math.max(0, (window.scrollY - scrollStart) / (scrollEnd - scrollStart)))
      heroImageRef.current.style.setProperty('--hero-parallax-y', `${(progress * 40).toFixed(2)}px`)
    }
    const onScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateParallax)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    updateParallax()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frameId) window.cancelAnimationFrame(frameId)
    }
  }, [isSubjectVisible, variant])

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
    if (fontSize > baseFontSize) {
      setFontSize(baseFontSize)
      return
    }
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
  }, [resized, baseFontSize, fontSize])

  return (
    <div ref={heroRef} className={cx(classes.heroBlock, className)} {...otherProps}>
      {variant === 'homepage' && heroImage && (
        <picture className={classes.heroPicture}>
          <source media={`(max-width: ${themeFix.condensedWidthBreakPoint})`} srcSet={mobileHeroImage} />
          <img
            ref={heroImageRef}
            className={classes.heroImage}
            src={heroImage}
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      )}
      {variant === 'homepage' && !isSubjectVisible && (
        <button
          className={classes.scrollCue}
          type="button"
          aria-label="Scroll to see the headline"
          title="Scroll to see the headline"
          onClick={scrollToSubject}
        >
          <span aria-hidden="true">↓</span>
        </button>
      )}
      <div className={classes.heroContent}>
        <div className={classes.subjectWrapper} ref={outerRef}>
          <div className={classes.subject} style={{ ...subjectStyle, fontSize: fontSize + 'rem' }} ref={innerRef}>
            {subjectLines.map((line, index) => (
              <h1
                className={cx(classes.subjectText, variant === 'homepage' && index === 1 && classes.subjectTextSecondLine)}
                key={`${line}-${index}`}
              >
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
    </div>
  )
}
export default HeroBlock

const useStylesFromThemeFunction = createUseStyles(theme => ({
  heroBlock: props => ({
    width: '100%', // using vw makes the div a tiny bit wider than the viewport causing a scrollbar I suspect roundoff
    aspectRatio: props.variant === 'homepage' ? '1446 / 1160' : '1.56 / 1',
    maxHeight: '100rem',
    backgroundColor: props.variant === 'homepage' ? '#f2f0ed' : '#171717',
    position: 'relative',
    display: props.variant === 'homepage' ? 'flex' : 'block',
    flexDirection: 'column',
    boxSizing: 'border-box',
    overflow: props.variant === 'homepage' ? 'clip' : 'hidden',
    isolation: 'isolate',
    ...(props.variant === 'homepage'
      ? {
          '& $scrollCue': {
            animation: '$scrollCueBlink 1.4s steps(2, start) infinite',
          },
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
      ? {
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '14%',
            background: 'linear-gradient(to bottom, rgba(242, 240, 237, 0) 0%, #f2f0ed 100%)',
            zIndex: 1,
            pointerEvents: 'none',
          },
        }
      : {}),
    ...(props.variant === 'homepage'
      ? {}
      : {
          marginBottom: '4rem',
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
            '& $scrollCue': {
              animation: 'none',
            },
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
            aspectRatio: '0.82 / 1',
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
  scrollCue: {
    position: 'absolute',
    zIndex: 3,
    top: '43%',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'grid',
    placeItems: 'center',
    width: '3rem',
    height: '3rem',
    padding: 0,
    border: 0,
    background: 'transparent',
    color: '#fff',
    fontSize: '2.5rem',
    lineHeight: 1,
    cursor: 'pointer',
    textShadow: '0 0.125rem 0.5rem rgba(0, 0, 0, 0.65)',
    '&:focus-visible': {
      outline: '0.125rem solid #fff',
      outlineOffset: '0.25rem',
    },
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      top: '40%',
      fontSize: '2rem',
    },
  },
  heroImage: {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center top',
    filter: 'brightness(50%)',
    transform: 'translate3d(0, var(--hero-parallax-y, 0px), 0) scale(1.06)',
    willChange: 'transform',
    transition: 'transform 650ms cubic-bezier(0.2, 0.7, 0.2, 1)',
  },

  heroContent: props => ({
    position: props.variant === 'homepage' ? 'sticky' : 'static',
    bottom: props.variant === 'homepage' ? '3rem' : 'auto',
    width: '100%',
    boxSizing: 'border-box',
    zIndex: props.variant === 'homepage' ? 2 : 'auto',
    ...(props.variant === 'homepage'
      ? {
          marginTop: 'auto',
          padding: '0 36.45% 2rem 7.19%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginBottom: '8rem',
          [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
            padding: '0 1.5rem 2rem',
          },
        }
      : {}),
  }),

  subjectWrapper: props => ({
    position: props.variant === 'homepage' ? 'relative' : 'absolute',
    left: props.variant === 'homepage' ? 0 : 0,
    right: props.variant === 'homepage' ? 0 : 0,
    bottom: props.variant === 'homepage' ? 'auto' : (props.actionText || props.secondaryActionText ? '6rem' : '2rem'),
    top: props.variant === 'homepage' ? 'auto' : 'auto',
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: props.variant === 'homepage' ? 'none' : theme.maxPanelWidth,
    paddingLeft: props.variant === 'homepage' ? 0 : '2rem',
    paddingRight: props.variant === 'homepage' ? 0 : '2rem',
    paddingBottom: props.variant === 'homepage' ? '1.25rem' : 0,
    margin: props.variant === 'homepage' ? 0 : '0 auto',
    textAlign: 'left',
    zIndex: props.variant === 'homepage' ? 'auto' : 'auto',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      bottom: props.variant === 'homepage' ? 'auto' : (props.actionText || props.secondaryActionText ? '5.5rem' : '1.25rem'),
      width: '100%',
      paddingLeft: props.variant === 'homepage' ? 0 : '1rem',
      paddingRight: props.variant === 'homepage' ? 0 : '1rem',
      paddingBottom: props.variant === 'homepage' ? '1rem' : 0,
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
  subjectText: props => ({
    fontSize: '1em', // override the default H1
    textWrap: 'nowrap',
    display: 'block',
    fontFamily: 'Newsreader, serif',
    fontStyle: 'normal',
    fontWeight: props.variant === 'homepage' ? 600 : 800,
    lineHeight: props.variant === 'homepage' ? '1.0667em' : '1.2em',
    color: props.variant === 'homepage' ? '#FBBC0D' : '#FFC315',
    backgroundImage:
      props.variant === 'homepage'
        ? 'linear-gradient(180deg, #fff4c2 0%, #ffe27d 18%, #f6b900 47%, #c47a00 76%, #ffedaa 100%)'
        : 'none',
    backgroundClip: props.variant === 'homepage' ? 'text' : 'border-box',
    WebkitBackgroundClip: props.variant === 'homepage' ? 'text' : 'border-box',
    WebkitTextFillColor: props.variant === 'homepage' ? 'transparent' : 'currentColor',
    filter: props.variant === 'homepage' ? 'drop-shadow(0 0.25rem 0.5rem rgba(0, 0, 0, 0.7))' : 'none',
    textShadow:
      props.variant === 'homepage'
        ? '0 1px 0 rgba(255, 246, 198, 0.8), 0 2px 0 rgba(145, 88, 0, 0.72), 0 0.25rem 0.5rem rgba(0, 0, 0, 0.62)'
        : '0 0.125rem 0.25rem rgba(0, 0, 0, 0.9), 0 0.25rem 1rem rgba(0, 0, 0, 0.55)',
    marginBlockStart: 0,
    marginBlockEnd: 0,
    '&:not(:last-child)': {
      marginBottom: '0.2em',
    },
  }),
  subjectTextSecondLine: {
    fontSize: '0.92em',
  },
  actionWrapper: props => ({
    position: props.variant === 'homepage' ? 'relative' : 'absolute',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: props.variant === 'homepage' ? '1.25rem' : '0.75rem',
    left: 0,
    right: props.variant === 'homepage' ? 'auto' : 0,
    bottom: props.variant === 'homepage' ? 'auto' : '2rem',
    top: props.variant === 'homepage' ? 'auto' : 'auto',
    textAlign: 'left',
    width: props.variant === 'homepage' ? 'auto' : 'calc(100% - 4rem)',
    maxWidth: props.variant === 'homepage' ? 'none' : theme.maxPanelWidth,
    margin: props.variant === 'homepage' ? 0 : '0 auto',
    paddingBottom: 0,
    zIndex: props.variant === 'homepage' ? 'auto' : 'auto',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      width: props.variant === 'homepage' ? 'auto' : 'calc(100% - 2rem)',
      bottom: props.variant === 'homepage' ? 'auto' : '1.25rem',
      gap: props.variant === 'homepage' ? '0.75rem' : '0.5rem',
      paddingBottom: 0,
    },
    ...(props.variant === 'homepage'
      ? {
          '@media (max-width: 42rem)': {
            width: '100%',
            left: 0,
            flexDirection: 'column',
            alignItems: 'stretch',
            flexWrap: 'nowrap',
            bottom: 'auto',
            paddingBottom: 0,
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
          '@media (max-width: 42rem)': {
            width: '100%',
            boxSizing: 'border-box',
          },
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
          '@media (max-width: 42rem)': {
            width: '100%',
            boxSizing: 'border-box',
          },
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
  '@keyframes scrollCueBlink': {
    '0%, 49%': { opacity: 1 },
    '50%, 100%': { opacity: 0.35 },
  },
}))
